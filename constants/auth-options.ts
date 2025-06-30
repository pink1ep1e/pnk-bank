import { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { prisma } from "@/prisma/prisma-client";
import { USER_ROLE } from "@prisma/client";
import { redirect } from "next/navigation";

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
        async signIn({user, account}) {
          try {
            if (account?.provider == 'credentials') {
              return true;
            }

            if (!user.name) {
              return false;
            }
            
            const findUser = await prisma.user.findFirst({
              where: {
                OR: [
                  { discordId: account?.providerAccountId },
                  ...(user.name ? [{ userName: user.name }] : [])
                ]
              }
            })

            if (!findUser) {
              return false;
            }

            return true;
            
          } catch (error) { 
            console.log('Error [SIGN IN]', error);
            redirect('/login')
          }
        },
        async jwt({ token, user}) {
            if (user) {
                token.id = user.id;
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
            }
            return session;
        },
      }
}
