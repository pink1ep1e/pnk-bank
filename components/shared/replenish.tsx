'use client';

import React, { useState, useEffect } from "react"
import { Title } from "./title";
import Image from 'next/image';
import { Button } from "../ui/button";
import { ReplenishForm } from "./replenish-form";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Smile } from "lucide-react";
import { Courier } from "@prisma/client";

interface Props {
    className?: string;
    couriers: Courier[];
}

interface Application {
    status: 'PENDING' | 'WAITING';
    courier?: string;
    runTime?: string;
}

export const Replenish: React.FC<Props> = ({ className, couriers }) => {
    const router = useRouter()
    const [showForm, setShowForm] = useState(false);
    const [application, setApplication] = useState<Application | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const response = await fetch('/api/see');

                const data = await response.json();
                if (data) {
                    setApplication(data);
                } 
                if (data === null) {
                    if (showForm == true) {
                        setShowForm(false);
                    }
                }
            } catch (error) {
                console.error('Ошибка при получении данных о заявке:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const interval = setInterval(fetchApplication, 20000);
        fetchApplication();

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{overflow: 'hidden'}} className={cn("pb-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16", className)}>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_2fr] gap-4 mt-5">
                <div>
                <div className="relative">
                    <div className="flex justify-center items-center absolute inset-0 bg-black/10 blur-2xl rounded-full"></div>
                    <Image 
                        src={`/landing/banknotes.svg`}
                        alt="AVATAR ICON"
                        width={450}
                        height={450}
                        className="relative m-auto bottom-24"
                    />
                    <div className="absolute top-[172px] shadow-md border-primary bg-white rounded-[20px] border border-slate-200 h-fit pt-[20px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[30px] lg:pb-[30px] lg:pr-[45px] lg:pl-[45px] overflow-hidden">
                        <Title className="font-extrabold" text="Пополнение и снятие" size='md'/>
                        <p className="text-gray-600 text-[16px]">
                            Пополнение и снятие средств доступно для всех пользователей банка. 
                            Вы можете пополнить счет или снять средства в любое время через 
                            удобные и безопасные каналы. Все операции защищены современными 
                            технологиями шифрования.
                        </p>
                        {isLoading ? (
                            <p className="mt-4 text-gray-600 text-[16px]">
                                Загрузка<span className="loading-dots"></span>
                            </p>
                        ) : application ? (
                            application.status === 'PENDING' ? (
                                <div className="flex flex-col justify-start items-start w-full">
                                    <p className="mt-4 text-[20px] font-semibold">Подождите совсем немного!</p>
                                    <p className="mt-1 text-gray-600 text-[17px]">
                                        Ваша заявка ожидает назначения сотрудника<span className="loading-dots"></span>
                                    </p>
                                </div>
                            ) : application.status === 'WAITING' ? (
                                <div className="flex flex-col justify-start items-start w-full mt-4">
                                    <p className="text-[22px] font-semibold">Вашу заявку выполняет: </p>
                                    <div className="flex justify-start items-center w-full gap-4 mt-2">
                                        <Image
                                            src={`https://minotar.net/avatar/${application.courier}`}
                                            alt="AVATAR ICON"
                                            width={65}
                                            height={65}
                                            className="rounded-[12px]"
                                        />
                                        <div className="flex justify-start items-start w-full">
                                            <div className="flex flex-col justify-start items-start leading-normal">
                                                <p className="text-[22px]">
                                                    {application.courier}
                                                </p>
                                                <p className="text-[16px] text-gray-600">Сотрудник уже спешит к вам!</p>
                                            </div>
                                            <p className="ml-auto text-[20px]">
                                                ~{application.runTime} минут
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) :  application.status === 'SUCCESS' ? (
                                <div className="flex flex-col justify-start items-start w-full mt-4">
                                    <div className="flex justify-center items-center gap-4">
                                        <Smile className="" size={50}/>
                                        <div className="flex flex-col justify-center items-start leading-normal">
                                            <p className="text-[20px] font-semibold">Ваша заявка была выполнена!</p>
                                            <p className=" text-gray-600 text-[17px]">
                                                Cпасибо что пользуетесь нашим банком
                                            </p>
                                        </div>
                                    </div>
                                    <Button 
                                        className="w-full mt-4 h-[50px]" 
                                        size={"lg"}
                                        variant={'outline'}
                                        onClick={() => router.push("/cabinet")}
                                    >
                                        Вернуться назад
                                    </Button>
                                </div>
                            ) : ""
                        ) : showForm ? (
                            <>
                                <div className="mt-4">
                                    <ReplenishForm />
                                </div>
                                <Button 
                                    className="w-full mt-4 h-[50px]" 
                                    size={"lg"}
                                    variant={'outline'}
                                    onClick={() => setShowForm(false)}
                                >
                                    Отменить заявку
                                </Button>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center mt-12">
                                <Button 
                                    className="w-full h-[50px]" 
                                    size={"lg"}
                                    onClick={() => setShowForm(true)}
                                >
                                    Заказать операцию
                                </Button>
                                <Button 
                                    className="w-full mt-2 h-[50px]" 
                                    size={"lg"}
                                    variant={'outline'}
                                    onClick={() => router.push("/cabinet")}
                                >
                                    Вернуться назад
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                </div>
                <div className="flex flex-col">
                    <div className="shadow-md border-primary bg-white rounded-[20px] border border-slate-200 w-full h-fit pt-[20px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[30px] lg:pb-[30px] lg:pr-[45px] lg:pl-[45px]">
                        <Title className="font-extrabold" text="Онлайн-карта сервера" size='md'/>
                        <p className="text-gray-600 text-[16px]">
                            Используйте онлайн-карта для поиска ближайшего офиса банка. 
                            На карте отображаются все отделения с актуальной информацией 
                            о режиме работы и доступных услугах. Выберите удобное для вас 
                            место и получите подробные инструкции по маршруту.
                        </p>
                        <div className="mt-4 bg-slate-100 p-4 rounded-[30px]">
                            <iframe 
                                src="https://map.starsmp.fun/#minecraft_overworld;flat;0,64,0;3" 
                                width="100%" 
                                height="500" 
                                style={{ border: 0, borderRadius: '22px' }} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                    <div className="mt-5 shadow-md border-primary bg-white rounded-[20px] border border-slate-200 w-full h-fit pt-[20px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[30px] lg:pb-[30px] lg:pr-[45px] lg:pl-[45px]">
                        <Title className="font-extrabold" text="Курьеры нашего банка" size='md'/>
                        <p className="text-gray-600 text-[16px]">
                            Наши курьеры готовы оперативно доставить наличные или забрать средства 
                            для пополнения вашего счета. Выберите удобное время и место, а также 
                            укажите сумму операции. Все курьеры проходят строгую проверку и 
                            обеспечивают безопасность ваших средств.
                        </p>
                        <div className="flex justify-start items-center gap-12 mt-4">
                            {couriers.map((courier) => (
                                <div key={courier.id} className="flex rounded-[20px] gap-4">
                                    <Image
                                        src={`https://minotar.net/avatar/${courier.courierName}`}
                                        alt="AVATAR ICON"
                                        width={80}
                                        height={80}
                                        className="rounded-[16px]"
                                    />
                                    <div className="flex flex-col justify-center items-start">
                                        <p className="text-[28px]">{courier.courierName}</p>
                                        <p className="text-[17px]">Выполнил: {courier.score}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}