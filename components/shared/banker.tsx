'use client';

import React, { useEffect, useState, useRef } from "react";
import { Title } from "./title";
import { AreaChartComponent } from '../ui/area-chart';
import { RequestItem } from "./request-item";
import { AdminLogs } from "./admin-dashboard/admin-logs";
import { Courier, Logs, OPERATION_METHOD, OPERATION_TYPE, Replenish, REPLENISH_STATUS, User } from "@prisma/client";
import { BankerProfile } from "./banker-profile";

interface Props {
    className?: string;
    logs: Logs[];
    user: User;
    banker: Courier;
    statistic: Replenish[];
}

interface ReplenishRequest {
    id: number;
    recipient: string;
    courier?: string;
    operationType: OPERATION_TYPE; // Используем тип OPERATION_TYPE
    operationMethod: OPERATION_METHOD; // Используем тип OPERATION_METHOD
    coordinates: string;
    amount: number;
    сomment?: string;
    waitingTime?: Date;
    createdAt: Date;
    runTime?: number;
    status: REPLENISH_STATUS; // Используем тип REPLENISH_STATUS
}

export const Banker: React.FC<Props> = ({ logs, user, banker, statistic }) => {
    const [requests, setRequests] = useState<ReplenishRequest[]>([]); // Указываем тип для requests
    const [isSoundEnabled, setIsSoundEnabled] = useState(false); // Состояние для звука
    const prevRequestsCount = useRef(requests.length); // Храним предыдущее количество заявок

    const fetchRequests = async () => {
        const response = await fetch('/api/replenish-status');
        const data = await response.json();
        setRequests(data);
    };

    // При загрузке компонента проверяем настройку звука в localStorage
    useEffect(() => {
        const soundSetting = localStorage.getItem('isSoundEnabled');
        if (soundSetting === 'true') {
            setIsSoundEnabled(true);
        }
    }, []);

    // Воспроизведение звука при появлении новой заявки
    useEffect(() => {
        if (requests.length > prevRequestsCount.current && isSoundEnabled) {
            const audio = new Audio('/sounds/notification.mp3'); // Путь к звуковому файлу
            audio.play();
        }
        prevRequestsCount.current = requests.length; // Обновляем количество заявок
    }, [requests, isSoundEnabled]);

    useEffect(() => {
        fetchRequests();
        const interval = setInterval(fetchRequests, 10000);
        return () => clearInterval(interval);
    }, []);

    const filteredRequests = requests.filter(request => 
        (request.status === "WAITING" || request.status === "PENDING") && 
        (request.status !== "WAITING" || request.courier === user.userName)
    );

    const monthlyStatistic = statistic.reduce((acc, item) => {
        const date = new Date(item.createdAt).toISOString().split('T')[0]; 
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date]++;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.keys(monthlyStatistic).map(date => ({
        date: date,
        value: monthlyStatistic[date],
    }));

    return (
        <>  
            <div className="w-full mt-0 pb-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <div className="grid grid-cols-[1.2fr_2fr] gap-4 pt-4">
                    <div className="flex flex-col">
                        <BankerProfile user={user} banker={banker}/>
                        <div className="shadow-md border-primary mt-4 bg-white rounded-[20px] border border-slate-200 w-full h-fit pt-[20px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[30px] lg:pb-[30px] lg:pr-[45px] lg:pl-[45px]">
                            <Title className="font-extrabold" text="Статистика по заявкам" size='md'/>
                            <div className="mt-4">
                                <AreaChartComponent data={chartData} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <AdminLogs logs={logs} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="shadow-md border-primary bg-white rounded-[20px] border border-slate-200 w-full h-fit pt-[20px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[30px] lg:pb-[30px] lg:pr-[45px] lg:pl-[45px]">
                            <Title className="font-extrabold" text="Заявки на пополнение/снятие" size='md'/>
                            <p className="text-gray-600 text-[16px]">
                                Если вы взялись за выполнение заявки, отменить её можно только в том случае, если клиент сам отказался от пополнения или снятия средств.
                            </p>
                            <div className="flex flex-col justify-start items-start gap-8 mt-4">
                                {filteredRequests.map((request: ReplenishRequest) => (
                                    <RequestItem 
                                        key={request.id}
                                        id={request.id} 
                                        recipient={request.recipient} 
                                        courier={request.courier} 
                                        operationType={request.operationType} 
                                        operationMethod={request.operationMethod} 
                                        coordinates={request.coordinates}
                                        amount={request.amount}
                                        сomment={request.сomment}
                                        waitingTime={request.waitingTime}
                                        createdAt={request.createdAt}
                                        runTime={request.runTime}
                                        status={request.status}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="shadow-md border-primary mt-4 bg-white rounded-[20px] border border-slate-200 w-full h-fit pt-[20px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[30px] lg:pb-[30px] lg:pr-[45px] lg:pl-[45px]">
                            <Title className="font-extrabold" text="Онлайн-карта сервера" size='md'/>
                            <p className="text-gray-600 text-[16px]">
                                Ориентируйтесь по карте для удобного определения времени встречи с клиентами банка по заявкам. Это поможет вам оптимизировать маршрут и сократить время на перемещения.
                            </p>
                            <div className="mt-4 bg-slate-100 p-4 rounded-[30px]">
                                <iframe 
                                    src="https://map.starsmp.fun/#minecraft_the_nether;flat;1,64,9;5" 
                                    width="100%" 
                                    height="500" 
                                    style={{ border: 0, borderRadius: '22px' }} 
                                    allowFullScreen 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}