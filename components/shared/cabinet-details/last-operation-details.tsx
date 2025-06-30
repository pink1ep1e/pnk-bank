'use client';

import { User, Transactions } from "@prisma/client";
import React, { useEffect, useState } from "react"
import { AlertTriangle } from "lucide-react";
import { Title } from "../title";
import { LastOperation } from "../last-operation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import { fetchLastOperations } from "@/hooks/fetch-last-operation";

interface Props {
    data: User;
    transaction: Transactions[];
}

export const LastOperationDetails: React.FC<Props> = ({ transaction, data }) => {
    const [ updatedTransactions, setUpdatedTransactions ] = useState(transaction);
    const { data: session } = useSession()

    useEffect(() => {
        if (!session?.user.id) return;

        const interval = setInterval(async () => {
            try {
                const data = await fetchLastOperations(Number(session?.user.id));
                setUpdatedTransactions(data);
            } catch (error) {
                console.error('Ошибка при обновлении операций:', error);
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [session]);

    return (
        <div className="shadow-md border-primary bg-white rounded-[20px] border border-slate-200 w-full h-[633px] pt-[20px] pb-[20px] pr-[25px] pl-[25px] lg:pt-[30px] lg:pb-[30px] lg:pr-[45px] lg:pl-[45px]">        
            <Title className="font-extrabold" text="Последние операции" size='md'/>
            <ScrollArea className="h-[530px] pr-3">
                {
                    updatedTransactions.length === 0 ? (
                        <div className="flex justify-center items-center mt-4">
                            <div className="justify-center items-center text-center">
                                <p className="text-[#434C55] text-[16px] font-medium">
                                    К сожалению, вы не совершили ни одной операции по карте, оплачивайте в магазинах и переводите деньги друзьям!
                                </p>
                                <AlertTriangle className="m-auto" color="#434C55" size={128}/>
                            </div>
                        </div>
                    ) : (
                        Object.entries(updatedTransactions
                            .reduce((acc, item) => {
                                const itemDate = new Date(item.createdAt);
                                const dateKey = itemDate.toLocaleDateString();
                                if (!acc[dateKey]) {
                                    acc[dateKey] = [];
                                }
                                acc[dateKey].push(item);
                                return acc;
                            }, {} as Record<string, typeof updatedTransactions>))
                            .map(([dateKey, items]) => (
                                <div key={dateKey}>
                                    <p className="text-[#434C55] text-[20px] font-medium">
                                        {new Date(items[0].createdAt).toLocaleDateString('ru-RU', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long'
                                        })}
                                    </p>
                                    {items.map((item) => (
                                        <LastOperation 
                                            key={item.id}
                                            id={item.id}
                                            sender={item.sender}
                                            recipient={item.recipient}
                                            amount={item.amount}
                                            commission={item.commission}
                                            message={item.message}
                                            type={item.type}
                                            transactionSenderId={item.transactionSenderId}
                                            transactionRecipientId={item.transactionRecipientId}
                                            createdAt={item.createdAt}
                                            data={data}
                                        />
                                    ))}
                                </div>
                            ))
                    )
                }
            </ScrollArea>
        </div>
    )
}