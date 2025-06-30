'use client';

import { User, Transactions, Application } from "@prisma/client";
import React, { useState } from "react"
import { UsersDashboard } from "./admin-dashboard/users-dashboard";
import { Title } from "./title";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { RegisterUsersDashboard } from "./admin-dashboard/register-user-dashboard";
import { BankInfoDashboard } from "./admin-dashboard/bank-info-dashboard";
import { ApplicationDashboard } from "./admin-dashboard/application-dashboard";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
    users: User[];
    transactions: Transactions[];
    applications: Application[]
}

export const AdminPanel: React.FC<Props> = ({ users, transactions, applications}) => {
    const [ searchUser, setSearchUser] = useState('');

    return (
        <>  
            <div className="w-full mt-8 pb-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <div className="border border-primary bg-white rounded-[20px] border-black w-full pt-[25px] pb-[25px] pr-[35px] pl-[35px]">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    <RegisterUsersDashboard />
                    <BankInfoDashboard transactions={transactions}/>
                </div>
                <div className="grid gap-4">
                    <ApplicationDashboard applications={applications}/>
                </div>
            </div>
        </>
    )
}