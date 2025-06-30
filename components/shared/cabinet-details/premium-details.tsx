'use client';

import React from "react"
import { Title } from "../title";   
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Crown, HandHeart } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Props {
    username: string;
    className?: string;
}

export const PremiumDetails: React.FC<Props> = ({ username, className }) => {


    return (
        <div className={cn("shadow-md border-primary bg-white rounded-[20px] border border-slate-200 w-full h-fit pt-[20px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[30px] lg:pb-[30px] lg:pr-[45px] lg:pl-[45px]", className)}>
            <div className="flex items-center gap-1.5">
                {/* <div className="w-[120px] bg-gradient-to-r from-red-500 to-orange-500 animate-gradient bg-[length:200%_200%] flex justify-center pt-0.5 pb-0 pr-6 pl-6 rounded-[12px] text-white text-[23px] font-semibold">
                    <p>Premium</p>
                </div> */}
                <Title className="font-extrabold" text="Подписка Premium" size='md'/>
            </div>
            <div>
                <p className="mt-2 text-[16px]">Ваша поддержка помогает нам оплачивать хостинг, улучшать функционал банка 
                    и создавать уникальные сервисы для всех пользователей.</p>
            </div>
            <div className="m-auto w-[200px]">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="p-2.5 w-full rounded-[12px] mt-2 text-[18px]">Подробнее<HandHeart size={24}/></Button>
                    </DialogTrigger>
                    <DialogContent >
                        <DialogHeader>
                            <DialogTitle className="text-[25px] pl-2 font-semibold">Информация о Premium</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                            <div className="pr-5 pl-5">
                                <div className="text-[16px] text-black">
                                    <div className="flex items-center gap-1.5 mb-3">
                                        <div className="w-[120px] bg-gradient-to-r from-red-500 to-orange-500 animate-gradient bg-[length:200%_200%] flex justify-center pt-2 pb-1 pr-6 pl-6 rounded-[12px] text-white text-[20px] font-semibold">
                                            <p>Premium</p>
                                        </div>
                                        <p className="text-[22px]">{username}</p>
                                    </div>
                                    <div className="flex gap-2 mb-3">
                                        <p className="text-[20px] font-semibold">Стоимость:</p>
                                        <p className="text-[18px]">100₽/месяц</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[18px] mb-1">Возможности:</p>
                                        <ul className="list-disc pl-4">
                                            <li>Бесплатные переводы без комиссии до 10 000</li>
                                            <li>В последних операциях будет значок, указывающий на ваш Premium-статус</li>
                                            <li>Доступ к эксклюзивным банковским услугам</li>
                                            <li>Приоритетная поддержка</li>
                                            <li>Участие в закрытых мероприятиях и акциях</li>
                                            <li>Возможность влиять на развитие проекта</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="text-black text-[16px] mt-4">
                                    <p className="font-semibold text-[18px] mb-1">Слова команды:</p>
                                    <p className="text-[16px]">Ваша поддержка помогает нам оплачивать хостинг, улучшать функционал банка 
                                        и создавать уникальные сервисы для всех пользователей. 
                                        <br/><br/>Это также мотивирует команду на новые свершения, 
                                        позволяет нам развивать проект и доказывает, что наш банк нужен сообществу. 
                                        <br/>Спасибо, что вы с нами!
                                    </p>
                                </div>
                                <div className="flex justify-center items-center mt-3">
                                    <Button className="pt-4 pb-3.5 pr-10 pl-10 rounded-[12px] mt-2 text-[18px]">
                                        Перейти к оплате<Crown className="mb-1" size={42}/>
                                    </Button>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}