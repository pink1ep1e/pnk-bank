'use server';

import { AddXp } from "@/lib/add-xp";
import { checkPremium } from "@/lib/check-premium";
import { CreateLog } from "@/lib/create-log";
import { generateRandomPassword } from "@/lib/generate-random-password";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { APPLICATION_STATUS, NOTIFICATION_TYPE, OPERATION_METHOD, OPERATION_TYPE, REPLENISH_STATUS } from "@prisma/client";
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

export async function createNewReplenish(
    action: "replenish" | "withdraw" | null,
    method: string | null,
    coordinates: string,
    amount: number,
    сomment: string
) {
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
            throw new Error("Ваша учетная запись заблокирована, вы не можете заказать услугу.");
        }

        let operType
        if (action === "replenish") {
            operType = OPERATION_TYPE.REPLENISHMENT;
        } else if (action === "withdraw") {
            operType = OPERATION_TYPE.WITHDRAWAL;
        }

        let operMethod
        if (method === "meet") {
            operMethod = OPERATION_METHOD.MEET;
        } else if (method === "chest") {
            operMethod = OPERATION_METHOD.CHEST;
        }

        await prisma.replenish.create({
            data: {
                recipient: findUser.userName,
                operationType: operType,
                operationMethod: operMethod,
                coordinates: coordinates,
                amount: amount,
                сomment: сomment,
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

        const banUser = await prisma.user.update({
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

        const findAdmin = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            }
        })

        if (!findAdmin) {
            throw new Error("Администратор не найден, перезайдите в аккаунт!")
        }

        await CreateLog(findAdmin.userName, `Заблокировал пользователя ${banUser.userName}`)
        
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

        const unBanUser = await prisma.user.update({
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

        const findAdmin = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            }
        })

        if (!findAdmin) {
            throw new Error("Администратор не найден, перезайдите в аккаунт!")
        }

        await CreateLog(findAdmin.userName, `Разблокировал пользователя ${unBanUser.userName}`)
        
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

        const updatePassword = await prisma.user.update({
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

        const findAdmin = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            }
        })

        if (!findAdmin) {
            throw new Error("Администратор не найден, перезайдите в аккаунт!")
        }

        await CreateLog(findAdmin.userName, `Изменил пароль для пользователя ${updatePassword.userName}`)
        
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

        const findAdmin = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            }
        })

        if (!findAdmin) {
            throw new Error("Администратор не найден, перезайдите в аккаунт!")
        }

        await CreateLog(findAdmin.userName, `Добавил нового пользователя ${createUser.userName}`)

        return { createUser, generatePassword} ;
        
    } catch (error) {
        console.log('Error [UPD_CREATEUSER]', error);
        throw error;
    }
}

export async function createAdminTransaction({ recipientName, amount }: { recipientName: string, amount: number}) {
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
                userName: 'bank',
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
        

        if (Number(currentUser.id) === findRecipient.id) {
            throw new Error("Нельзя отправить самому себе, укажите другого получателя!")
        }

        if (findSender.userStatus == "BLOCKED") {
            throw new Error("Ваш аккаунт заблокирован, обратитесь в поддержку.")
        }

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
                amount: amount,
                commission: 0,
                message: `Пополнение от ${findSender.userName} в ${new Date().toLocaleString()}`,
                transactionSenderId: findSender.id,
                transactionRecipientId: findRecipient.id,
            }
        })

        const findAdmin = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            }
        })

        if (!findAdmin) {
            throw new Error("Администратор не найден, перезайдите в аккаунт!")
        }

        await CreateLog(findAdmin.userName, `Выполнил пополнение на сумму ${amount} для пользователя ${findRecipient.userName}`)
        
    } catch (error) {
        console.log('Error [CREATE_ADMIN_TRANSACTION]', error)
        throw error;
    }
}

export async function TakeRequest(id: number, runTime: number) {
    try {

        const currentUser = await getUserSession()
        
        if (!currentUser) {
            throw new Error("Пользователь не найден, перезайдите в аккаунт!")
        }

        const User = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            }
        })

        if (!User) {
            throw new Error("Пользователь не найден, перезайдите в аккаунт!")
        }



        const findRequest = await prisma.replenish.findFirst({
            where: {
                id: id
            }
        })

        if (!findRequest) {
            throw new Error("Заявка не найдена!")
        }

        await prisma.replenish.update({
            where: {
                id: id,
            },
            data: {
                courier: User.userName,
                waitingTime: new Date(), 
                runTime: runTime,
                status: REPLENISH_STATUS.WAITING
            }
        })
        
    } catch (error) {
        console.log('Error [TAKE_REQUEST]', error)
        throw error;
    }
}

export async function CancelRequest(id: number) {
    try {

        const currentUser = await getUserSession()
        
        if (!currentUser) {
            throw new Error("Пользователь не найден, перезайдите в аккаунт!")
        }

        const User = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            }
        })

        if (!User) {
            throw new Error("Пользователь не найден, перезайдите в аккаунт!")
        }



        const findRequest = await prisma.replenish.findFirst({
            where: {
                id: id
            }
        })

        if (!findRequest) {
            throw new Error("Заявка не найдена!")
        }

        await prisma.replenish.update({
            where: {
                id: id,
            },
            data: {
                status: REPLENISH_STATUS.REJECTED
            }
        })

        await CreateLog(User.userName, `Отклонил задание #${id}`)
        
    } catch (error) {
        console.log('Error [CANCEL_REQUEST]', error)
        throw error;
    }
}

export async function SuccessRequest(id: number) {
    try {

        const currentUser = await getUserSession()
        
        if (!currentUser) {
            throw new Error("Пользователь не найден, перезайдите в аккаунт!")
        }

        const User = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            }
        })

        if (!User) {
            throw new Error("Пользователь не найден, перезайдите в аккаунт!")
        }



        const findRequest = await prisma.replenish.findFirst({
            where: {
                id: id
            }
        })

        if (!findRequest) {
            throw new Error("Заявка не найдена!")
        }

        await prisma.replenish.update({
            where: {
                id: id,
            },
            data: {
                status: REPLENISH_STATUS.SUCCESS
            }
        })

        const RequestUser = await prisma.user.findFirst({
            where: {
                userName: findRequest.recipient
            }
        })

        if (!RequestUser) {
            throw new Error("Пользователь не найден!")
        }


        const RequestUserCard = await prisma.card.findFirst({
            where: {
                ownerId: Number(RequestUser.id)
            }
        });

        if (!RequestUserCard) {
            throw new Error("Карта не найдена!");
        }

        if (findRequest.operationType == OPERATION_TYPE.REPLENISHMENT) {
            await prisma.card.update({
                where: {
                    id: RequestUserCard.id
                },
                data: {
                    balance: {
                        increment: findRequest.amount 
                    }
                }
            });

            await prisma.transactions.create({
                data: {
                    sender: "bank",
                    recipient: RequestUser.userName,
                    amount: findRequest.amount,
                    commission: 0,
                    message: `Пополнение от BANK в ${new Date().toLocaleString()}`,
                    transactionSenderId: 6,
                    transactionRecipientId: RequestUser.id,
                }
            })



        } else if (findRequest.operationType == OPERATION_TYPE.WITHDRAWAL) {
            await prisma.card.update({
                where: {
                    id: RequestUserCard.id
                },
                data: {
                    balance: {
                        decrement: findRequest.amount 
                    }
                }
            });

            await prisma.transactions.create({
                data: {
                    sender: "bank",
                    recipient: RequestUser.userName,
                    amount: findRequest.amount,
                    commission: 0,
                    message: `Снятие для ${RequestUser.userName} в ${new Date().toLocaleString()}`,
                    transactionSenderId: RequestUser.id,
                    transactionRecipientId: 6,
                }
            })
        }

        const courier = await prisma.courier.findFirst({
            where: {
                courierName: User.userName
            }
        });

        if (!courier) {
            throw new Error("Курьер не найден!");
        }

        await prisma.courier.update({
            where: {
                id: courier.id
            },
            data: {
                score: {
                    increment: 1
                }
            }
        });

        await CreateLog(User.userName, `Выполнил задание #${id}`)

        
    } catch (error) {
        console.log('Error [SUCCESS_REQUEST]', error)
        throw error;
    }
}