'use client';

import { User, Transactions, Application, Logs } from "@prisma/client";
import React, { useState } from "react"
import { UsersDashboard } from "./users-dashboard";
import { Title } from "../title";
import { Search } from "lucide-react";
import { Input } from "../../ui/input";
import { RegisterUsersDashboard } from "./register-user-dashboard";
import { BankInfoDashboard } from "./bank-info-dashboard";
import { ApplicationDashboard } from "./application-dashboard";
import { ScrollArea } from "../../ui/scroll-area";
import { AdminHeader } from "./admin-header";
import { AdminTransaction } from "./admin-transaction";
import { AdminLogs } from "./admin-logs";
import { AdminWarring } from "./admin-warring";

interface Props {
    users: User[];
    sessionUser: User;
    transactions: Transactions[];
    applications: Application[];
    logs: Logs[];
}

export const AdminPanel: React.FC<Props> = ({ users, transactions, applications, sessionUser, logs}) => {
    const [ searchUser, setSearchUser] = useState('');

    return (
        <>  
            <div className="w-full mt-0 pb-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <AdminHeader user={sessionUser}/>
                <div className="shadow-md border-primary bg-white rounded-[20px] border border-slate-200 w-full h-fit pt-[20px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[30px] lg:pb-[30px] lg:pr-[45px] lg:pl-[45px]">
                    <Title className="font-extrabold" text="Управление пользователями банка" size='md'/>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <p className="font-regular text-sm sm:text-base lg:text-lg">Всего пользователей банка: {users.length}</p>
                        <p className="font-regular text-sm sm:text-base lg:text-lg">Пользователей модераторов: {users.filter(user => user.role === 'MODER').length}</p>
                        <p className="font-regular text-sm sm:text-base lg:text-lg">Заблокированные пользователи: {users.filter(user => user.userStatus === 'BLOCKED').length}</p>
                    </div>
                    <div className="flex justify-center items-center w-full mt-2">
                        <Input 
                            placeholder="Введите никнейм игрока"
                            value={searchUser ?? ""} 
                            onChange={(e) => setSearchUser(e.target.value)} 
                        />
                        <div className="cursor-pointer p-4 border border-black ml-2 rounded-[16px] hover:bg-gray-200">
                            <Search />
                        </div>
                    </div>
                    <ScrollArea className="h-[500px] pr-3">
                        {users
                            .filter(user => 
                                user.userName.toLowerCase().includes(searchUser.toLowerCase())
                            )
                            .map((user) => (
                                <UsersDashboard 
                                    key={user.id}
                                    id={user.id}
                                    userName={user.userName}
                                    email={user.email ?? ''}
                                    imageUrl={user.imageUrl}
                                    discordId={user.discordId ?? ''}
                                    discordUser={user.discordUser ?? ''}
                                    userStatus={user.userStatus}
                                    codeWord={user.codeWord ?? 'Пусто'}
                                    role={user.role}
                                    isGov={user.isGov ?? false}
                                    createdAt={user.createdAt}
                                />
                            ))}
                        </ScrollArea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col">
                        <RegisterUsersDashboard />
                        <AdminWarring />
                    </div>
                    <BankInfoDashboard transactions={transactions}/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
                    <AdminTransaction />
                    <AdminLogs logs={logs} />
                </div>
                <div className="grid gap-4 mt-4">
                    <ApplicationDashboard initialApplications={applications}/>
                </div>
            </div>
        </>
    )
}