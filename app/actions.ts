'use server';

import { AddXp } from "@/lib/add-xp";
import { checkPremium } from "@/lib/check-premium";
import { generateRandomPassword } from "@/lib/generate-random-password";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { APPLICATION_STATUS, NOTIFICATION_TYPE } from "@prisma/client";
import { compare, hashSync } from "bcrypt";

export async function createTransaction({ recipientName, amount, message }: { recipientName: string, amount: number, message: string }) {
    try {

        const currentUser = await getUserSession()
        
        if (!currentUser) {
            throw new Error("Пользователь не найден, перезайдите в аккаунт!")
        }


        const findRecipient = await prisma.user.findFirst({
            where: {
                userName: recipientName,
            }
        })

        if (!findRecipient) {
            throw new Error("Получатель не найден, введите верного получателя!")
        }


        const findSender = await prisma.user.findFirst({
            where: {
                id: Number(currentUser?.id),
            }
        })

        if (!findSender) {
            throw new Error("Отправитель не найден, перезайдите в аккаунт!")
        }


        const cardRecipient = await prisma.card.findFirst({
            where: {
                ownerId: findRecipient.id,
            }
        })

        if (!cardRecipient) {
            throw new Error("Карта отправителя не найдена, обратитесь в тех.поддержку.")
        }


        const cardSender = await prisma.card.findFirst({
            where: {
                ownerId: findSender.id,
            }
        })

        if (!cardSender) {
            throw new Error("Карта отправителя не найдена, обратитесь в тех.поддержку.")
        }
        

        if (findSender.id === findRecipient.id) {
            throw new Error("Нельзя отправить самому себе, укажите другого получателя!")
        }

        if (findSender.userStatus == "BLOCKED") {
            throw new Error("Ваш аккаунт заблокирован, обратитесь в поддержку.")
        }

        let calcAmount = amount;    
        let calcCommission = 0;
        if (calcAmount > 100) {

            calcAmount = amount + amount * 0.02;
            calcCommission = calcAmount - amount;

            if (findSender.isGov == true) {
                calcAmount = amount;
                calcCommission = 0
            }

            if (await checkPremium(findSender.id)) {
                calcAmount = amount;
                calcCommission = 0
            }
        }

        if (cardSender.balance < calcAmount) {
            throw new Error("Недостаточно средств, пополните карту!")
        }

        if (findSender.isGov == false) {
            if (calcAmount > 10200) {
                throw new Error("Максимальная сумма перевода - 10 000 ALM")
            }
        }

        await prisma.card.update({
            where: {
                id: cardSender.id,
            },
            data: {
                balance: cardSender.balance - calcAmount,
            }
        })

        await prisma.card.update({
            where: {
                id: cardRecipient.id,
            },
            data: {
                balance: cardRecipient.balance + amount,
            }
        })
        await prisma.transactions.create({
            data: {
                sender: findSender.userName,
                recipient: findRecipient.userName,
                amount: calcAmount,
                commission: calcCommission,
                message: message,
                transactionSenderId: findSender.id,
                transactionRecipientId: findRecipient.id,
            }
        })

        AddXp(findSender.id, 25);
        
    } catch (error) {
        console.log('Error [CREATE_TRANSACTION]', error)
        throw error;
    }
}

export async function createApplication({ userName, telegram, discord }: { userName: string, telegram: string, discord: string }) {
    try {

        const findApplication = await prisma.application.findFirst({
            where: {
                OR: [
                    { userName: userName },
                    { telegram: telegram },
                    { discord: discord }
                ]
            }
        })

        if (findApplication) {
            throw new Error("Вы уже подавали заявку. Повторная отправка заявки невозможна!")
        }

        if (!findApplication) {
            await prisma.application.create({
                data: {
                    userName: userName,
                    telegram: telegram,
                    discord: discord,
                }
            })
        }
        
    } catch (error) {
        console.log('Error [CREATE_APPLICATON]', error)
        throw error;
    }
}

export async function ApplicationStatusSuccess(id: number) {
    try {

        const findApplication = await prisma.application.findFirst({
            where: {
                id: id
            }
        })

        if (!findApplication) {
            throw new Error("Заявка не найдена!")
        }

        await prisma.application.update({
            where: {
                id: id,
            },
            data: {
                STATUS: APPLICATION_STATUS.ACTIVE
            }
        })
        
    } catch (error) {
        console.log('Error [CREATE_APPLICATON]', error)
        throw error;
    }
}
export async function ApplicationStatusReject(id: number) {
    try {

        const findApplication = await prisma.application.findFirst({
            where: {
                id: id
            }
        })

        if (!findApplication) {
            throw new Error("Заявка не найдена!")
        }

        await prisma.application.update({
            where: {
                id: id,
            },
            data: {
                STATUS: APPLICATION_STATUS.REJECTED
            }
        })
        
    } catch (error) {
        console.log('Error [CREATE_APPLICATON]', error)
        throw error;
    }
}

export async function updateCodeWord(value: string) {
    try {

        const currentUser = await getUserSession()
        
        if (!currentUser) {
            throw new Error("Пользователь не найден, перезайдите в аккаунт!")
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id)
            }
        });

        if (!findUser) {
            throw new Error("Пользователь не найден в базе данных.");
        }

        if (findUser.userStatus === 'BLOCKED') {
            throw new Error("Ваша учетная запись заблокирована, вы не можете изменить код-слово.");
        }

        if (findUser.codeWord === null) {
            AddXp(findUser.id, 75);
        }

        await prisma.user.update({
            where: {
                id: findUser.id,
            },
            data: {
                codeWord: value,
            },
        });

        await prisma.notification.create({
            data: {
                sender: 'Изменение код-слова',
                recipientId: findUser.id,
                message: 'Вы успешно изменили кодовое слово. Для обращения в поддержку вам понадобится назвать кодовое слово.',
                type: NOTIFICATION_TYPE.CODEWORD
            }
        })

        return true;

    } catch (error) {
        console.log('Error [UPD_CODEWORD]', error);
        throw error;
    }
}

export async function updatePassword(newPassword: string, currentPassword: string) {
    try {

        const currentUser = await getUserSession()
        
        if (!currentUser) {
            throw new Error("Пользователь не найден, перезайдите в аккаунт!")
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id)
            }
        });

        if (!findUser) {
            throw new Error("Пользователь не найден в базе данных.");
        }

        if (findUser.userStatus === 'BLOCKED') {
            throw new Error("Ваша учетная запись заблокирована, вы не можете изменить пароль.");
        }

        const isPasswordCorrect = await compare(currentPassword, findUser.password);

        if (!isPasswordCorrect) {
            throw new Error("Вы указали неверный пароль, если вы его забыли, обратитесь в поддержку.");
        }

        await prisma.user.update({
            where: {
                id: findUser.id,
            },
            data: {
                password: hashSync(newPassword, 10),
            },
        });

        await prisma.notification.create({
            data: {
                sender: 'Изменение пароля',
                recipientId: findUser.id,
                message: 'Вы успешно изменили свой пароль. Мы рекомендуем менять его каждые 3 месяца для вашей безопасности.',
                type: NOTIFICATION_TYPE.PASSWORD
            }
        })
        
    } catch (error) {
        console.log('Error [UPD_PASSWORD]', error);
        throw error;
    }
}

export async function banUser_Admin(id: number) {
    try {

        const currentUser = await getUserSession()
        
        if (!currentUser) {
            throw new Error("Пользователь не найден, перезайдите в аккаунт!")
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id)
            }
        });

        if (!findUser) {
            throw new Error("Пользователь не найден в базе данных.");
        }

        await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                userStatus: 'BLOCKED',
            },
        });

        await prisma.notification.create({
            data: {
                sender: 'Блокировка аккаунта',
                recipientId: id,
                message: 'Ваш аккаунт был заблокирован. Обратитесь в поддержку для уточнения причины.',
                type: NOTIFICATION_TYPE.ADMIN
            }
        })
        
    } catch (error) {
        console.log('Error [UPD_BAN]', error);
        throw error;
    }
}

export async function unBanUser_Admin(id: number) {
    try {

        const currentUser = await getUserSession()
        
        if (!currentUser) {
            throw new Error("Пользователь не найден, перезайдите в аккаунт!")
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id)
            }
        });

        if (!findUser) {
            throw new Error("Пользователь не найден в базе данных.");
        }

        await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                userStatus: 'ACTIVE',
            },
        });

        await prisma.notification.create({
            data: {
                sender: 'Разблокировка аккаунта',
                recipientId: id,
                message: 'Ваш аккаунт был разблокирован. Приносим извинения за доставленные неудобства.',
                type: NOTIFICATION_TYPE.ADMIN
            }
        })
        
    } catch (error) {
        console.log('Error [UPD_UNBAN]', error);
        throw error;
    }
}

export async function changePassword_Admin(id: number, password: string) {
    try {

        const currentUser = await getUserSession()
        
        if (!currentUser) {
            throw new Error("Пользователь не найден, перезайдите в аккаунт!")
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id)
            }
        });

        if (!findUser) {
            throw new Error("Пользователь не найден в базе данных.");
        }

        await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                password: hashSync(password, 10),
            },
        });

        await prisma.notification.create({
            data: {
                sender: 'Оповещение',
                recipientId: id,
                message: 'Ваш пароль был изменен администратором. Если вы не запрашивали изменение пароля, обратитесь в поддержку.',
                type: NOTIFICATION_TYPE.SYSTEM
            }
        })
        
    } catch (error) {
        console.log('Error [UPD_CHANGE_PASSWORD]', error);
        throw error;
    }
}

export async function createUser(data: string) {
    try {

        const currentUser = await getUserSession()
        
        if (!currentUser) {
            throw new Error("Пользователь не найден, перезайдите в аккаунт!")
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id)
            }
        });

        if (!findUser) {
            throw new Error("Пользователь не найден в базе данных.");
        }

        const generatePassword = generateRandomPassword()

        const checkUser = await prisma.user.findFirst({
            where: {
                userName: data
            }
        })

        if (checkUser) {
            throw new Error('Такой пользователь уже есть!')
        }

        const createUser = await prisma.user.create({
            data: {
                userName: data,
                password: hashSync(generatePassword, 10),
                imageUrl: '',
            },
        });

        if (!createUser) {
            throw new Error('Пользователь не был создан, обратитесь к разработчику.');
        }

        const maxCard = await prisma.card.findFirst({
            orderBy: {
                cardNumber: 'desc',
            },
        });

        console.log(maxCard)

        const nextCardNumber = maxCard && maxCard.cardNumber ? maxCard.cardNumber + 1 : 20001000;

        const createCard = await prisma.card.create({
            data: {
                name: 'Diammond Card',
                cardNumber: nextCardNumber,
                imageUrl: '',
                balance: 0,
                ownerId: createUser.id
            },
        })

        if (!createCard) {
            throw new Error('Карта не была создана, обратитесь к администратору.')
        }

        const createPremium = await prisma.premium.create({
            data: {
                userId: createUser.id,
            }
        })

        if (!createPremium) {
            throw new Error('Таблица Premium не была созданна, обратитесь к администратору.')
        }

        AddXp(createUser.id, 50);

        await prisma.notification.create({
            data: {
                sender: 'Новый клиент!',
                recipientId: createUser.id,
                message: 'Ваша учетная запись теперь активна. Спасибо, что стали клиентом нашего банка.',
                type: NOTIFICATION_TYPE.INFO
            }
        })


        return { createUser, generatePassword} ;
        
    } catch (error) {
        console.log('Error [UPD_CREATEUSER]', error);
        throw error;
    }
}