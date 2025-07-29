import { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { prisma } from "@/prisma/prisma-client";
import { USER_ROLE, NOTIFICATION_TYPE } from "@prisma/client";
import { AddXp } from "@/lib/add-xp";
import { generateRandomPassword } from "@/lib/generate-random-password";
import { hash } from 'bcrypt'; // Импортируем функцию hash из bcrypt

export const authOptions: AuthOptions = {
    session: {
      strategy: 'jwt',
    },
    providers: [
        DiscordProvider({
          clientId: process.env.DISCORD_CLIENT_ID || '',
          clientSecret: process.env.DISCORD_CLIENT_SECRET || '',

          profile(profile) {
            return {
              id: profile.id,
              name: profile.username,
              email: profile.email,
              image: profile.image_url,
              role: 'USER' as USER_ROLE,
            }
          }
        }),
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            userName: { label: 'username', type: 'text'},
            password: { label: 'password', type: 'password'}
          },
          async authorize(credentials) {
            if (!credentials) {
              return null;
            }

            const values = {
              userName: credentials.userName,
            };

            const findUser = await prisma.user.findFirst({
              where: values,
            });
            
            if (!findUser) {
              return null;
            };

            const isPasswordValid = await compare(credentials.password, findUser.password);

            if (!isPasswordValid) {
              return null;
            };

            return {
              id: String(findUser.id),
              userName: findUser.userName,
              role: findUser.role,
              name: findUser.userName
            };
          }
        })
      ],
      secret: process.env.NEXTAUTH_SECRET,
      callbacks: {
        async signIn({ user, account }) {
          try {
            if (account?.provider === 'credentials') {
              return true;
            }

            if (!user.name) {
              return false;
            }

            // Проверяем, существует ли пользователь с таким discordId
            const findUser = await prisma.user.findFirst({
              where: {
                discordId: String(account?.providerAccountId),
              },
            });

            if (findUser) {
              // Присваиваем id найденного пользователя в user
              user.id = String(findUser.id);
              
              return true;
            }

            // Если пользователь не найден, создаем нового
            const discordId = account?.providerAccountId;
            const response = await fetch(`https://api.starsmp.fun/users/discord/${discordId}`);

            if (!response.ok) {
              if (response.status === 500) {
                return '/login/discord-error';
              }
              return false;
            }

            const { nick } = await response.json();

            // Создаем нового пользователя
            const randomPassword = generateRandomPassword(); // Генерируем случайный пароль
            const hashedPassword = await hash(randomPassword, 10); // Хэшируем пароль
            const createUser = await prisma.user.create({
              data: {
                userName: nick,
                discordId: String(discordId),
                password: hashedPassword, // Используем хэшированный пароль
                imageUrl: user.image || '',
                role: 'USER' as USER_ROLE,
              },
            });

            if (!createUser) {
              throw new Error('Пользователь не был создан, обратитесь к разработчику.');
            }

            // Создаем карту для пользователя
            const maxCard = await prisma.card.findFirst({
              orderBy: {
                cardNumber: 'desc',
              },
            });

            const nextCardNumber = maxCard && maxCard.cardNumber ? maxCard.cardNumber + 1 : 20001000;

            const createCard = await prisma.card.create({
              data: {
                name: 'Diammond Card',
                cardNumber: nextCardNumber,
                imageUrl: '',
                balance: 0,
                ownerId: createUser.id,
              },
            });

            if (!createCard) {
              throw new Error('Карта не была создана, обратитесь к администратору.');
            }

            // Создаем премиум-аккаунт для пользователя
            const createPremium = await prisma.premium.create({
              data: {
                userId: createUser.id,
              },
            });

            if (!createPremium) {
              throw new Error('Таблица Premium не была создана, обратитесь к администратору.');
            }

            // Добавляем опыт пользователю
            AddXp(createUser.id, 50);

            // Создаем уведомление для пользователя
            await prisma.notification.create({
              data: {
                sender: 'Новый клиент!',
                recipientId: createUser.id,
                message: 'Ваша учетная запись теперь активна. Спасибо, что стали клиентом нашего банка.',
                type: NOTIFICATION_TYPE.INFO,
              },
            });
            
            user.id = String(createUser.id);
            return true;
          } catch (error) {
            console.log('Error [SIGN IN]', error);
            throw new Error('Ваш аккаунт не привязан к Star SMP.')
          }
        },
        async jwt({ token, user}) {
            if (user) {
                token.id = user.id; // Присваиваем id пользователя в токен
                token.role = user.role; // Добавляем роль пользователя в токен
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id; // Присваиваем id пользователя в сессию
                session.user.role = token.role; // Добавляем роль пользователя в сессию
            }
            return session;
        },
      }
}
