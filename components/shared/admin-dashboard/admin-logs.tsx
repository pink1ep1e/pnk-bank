'use client';

import { Logs } from "@prisma/client";
import React, { useState } from "react"
import { Title } from "../title";
import { Search } from "lucide-react";
import { Input } from "../../ui/input";
import { ScrollArea } from "../../ui/scroll-area";
import { LogItem } from "../log-item";

interface Props {
    logs: Logs[];
}

export const AdminLogs: React.FC<Props> = ({ logs }) => {
    const [searchUser, setSearchUser] = useState<string>("");

    // Получаем текущую дату
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    // Фильтруем логи за сегодня
    const logsToday = logs.filter(log => {
        const logDate = new Date(log.createdAt);
        return logDate >= todayStart && logDate < todayEnd;
    });

    return (
        <div className="shadow-md border-primary bg-white rounded-[20px] border border-slate-200 w-full h-fit pt-[20px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[30px] lg:pb-[30px] lg:pr-[45px] lg:pl-[45px]">
            <Title className="font-extrabold" text="Действия всех администраторов" size='md'/>
            <div className="flex flex-col sm:flex-row gap-4">
                <p className="font-regular text-sm sm:text-base lg:text-lg">Кол-во операций за день: {logsToday.length}</p>
            </div>
            <div className="flex justify-center items-center w-full mt-2">
                <Input 
                    placeholder="Введите никнейм администратора"
                    value={searchUser} 
                    onChange={(e) => setSearchUser(e.target.value)} 
                />
                <div className="cursor-pointer p-4 border border-black ml-2 rounded-[16px] hover:bg-gray-200">
                    <Search />
                </div>
            </div>
            <ScrollArea className="h-[225px] pr-3">
                {logs
                    .filter(log => 
                        log.admin.toLowerCase().includes(searchUser.toLowerCase()) &&
                        new Date(log.createdAt) > new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
                    )
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((log) => (
                        <LogItem 
                            key={log.id}
                            id={log.id}
                            admin={log.admin}
                            description={log.description}
                            createdAt={log.createdAt}
                        />
                    ))}
                </ScrollArea>
        </div>
    )
}