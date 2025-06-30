'use client';

import { TRANSACTION_TYPE, User } from "@prisma/client";
import React, { useState } from 'react'
import { cn } from "@/lib/utils";
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
    DialogTitle
  } from "@/components/ui/dialog"
import { CircleCheck, Landmark, Mail, Star, Wallet } from "lucide-react";

interface Props {
    id: number;
    sender: string;
    recipient: string;
    amount: number;
    commission: number;
    message: string;
    type: TRANSACTION_TYPE;
    transactionSenderId: number;
    transactionRecipientId: number;
    createdAt: Date;

    data: User;
    className?: string;
}

// ... existing code ...

export const LastOperation: React.FC<Props> = ({
    id,
    recipient,
    sender,
    amount,
    commission,
    transactionSenderId,
    message,
    createdAt,
    type,
    data,
    className }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // Функция для определения типа операции
    const getOperationType = () => {
        switch (type) {
            case TRANSACTION_TYPE.TRANSFER:
                return recipient === 'bank' || sender === 'bank' ? 'Bank' 
                : recipient === 'government' ? 'Government' : 
                recipient === data.userName ? sender : recipient ;
            case TRANSACTION_TYPE.GOVERNMENT:
                return 'Government';
            case TRANSACTION_TYPE.BANK:
                return 'Bank';
            default:
                return recipient === data.userName ? sender : recipient;
        }
    };

    // Функция для определения текста операции
    const getOperationText = () => {
        if (type === TRANSACTION_TYPE.TRANSFER) {

            if (recipient === 'bank' || sender === 'bank') {
                return (data.id === transactionSenderId ? 'Оплата' : 'Пополнение');
            }
            if (recipient === 'government' || sender === 'government') {
                return (data.id === transactionSenderId ? 'Оплата' : 'Пополнение');
            }
            return (data.id === transactionSenderId ? 'Перевод' : 'Пополнение');
        } else if (type === TRANSACTION_TYPE.GOVERNMENT || type === TRANSACTION_TYPE.BANK) {
            return data.id === transactionSenderId ? 'Оплата' : 'Пополнение';
        }
        return data.id === transactionSenderId ? 'Перевод' : 'Пополнение';
    };

    // Функция для отображения аватара
    const renderAvatar = (size: number) => {
        const avatarSize = size;
        const avatarClass = `w-[${avatarSize}px] h-[${avatarSize}px] rounded-[8px] bg-black`;

        switch (type) {
            case TRANSACTION_TYPE.TRANSFER:
                if (recipient === 'bank' || sender === 'bank') {
                    return (
                        <div className={avatarClass}>
                            <div className={`w-[${avatarSize}px] h-[${avatarSize}px] p-1 flex justify-center items-center`}>
                                <Wallet color="#fff" size={avatarSize - 20} />
                            </div>
                        </div>
                    );
                }
                if (recipient === 'government' || sender === 'government') {
                    return (
                        <div className={avatarClass}>
                            <div className={`w-[${avatarSize}px] h-[${avatarSize}px] p-1 flex justify-center items-center`}>
                                <Landmark color="#fff" size={avatarSize - 20} />
                            </div>
                        </div>
                    )
                }
                return (
                    <div className={`w-[${avatarSize}px] h-[${avatarSize}px] rounded-[8px]`}>
                        <div className={`w-[${avatarSize}px] h-[${avatarSize}px] flex justify-center items-center relative`}>
                            <Image
                                src={`https://minotar.net/avatar/${data.id === transactionSenderId ? recipient : sender}`}
                                alt="AVATAR ICON"
                                width={avatarSize}
                                height={avatarSize}
                                className="rounded-[8px] border"
                            />

                            {/* ЗВЕЗДА ДЛЯ ПРЕМИУМ */}
                            {/* <div className="absolute top-[-3px] left-[-3px] bg-black flex justify-center items-center h-6 w-6 rounded-[6px] border">
                                <Star color="#fff" className="h-4 w-4" strokeWidth={2.5}/>
                            </div> */}
                        </div>  
                    </div>
                );
            case TRANSACTION_TYPE.GOVERNMENT:
                return (
                    <div className={avatarClass}>
                        <div className={`w-[${avatarSize}px] h-[${avatarSize}px] p-1 flex justify-center items-center`}>
                            <Landmark color="#fff" size={avatarSize - 20} />
                        </div>
                    </div>
                );
            case TRANSACTION_TYPE.BANK:
                return (
                    <div className={avatarClass}>
                        <div className={`w-[${avatarSize}px] h-[${avatarSize}px] p-1 flex justify-center items-center `}>
                            <Wallet color="#fff" size={avatarSize - 20} />
                            {/* <div className="absolute top-0 left-0 text-yellow-500">★</div> */}
                        </div>
                    </div>
                );
            default:
                return (
                    <div className={`w-[${avatarSize}px] h-[${avatarSize}px] rounded-[8px]`}>
                        <div className={`w-[${avatarSize}px] h-[${avatarSize}px] flex justify-center items-center relative`}>
                            <Image
                                src={`https://minotar.net/avatar/${data.id === transactionSenderId ? recipient : sender}`}
                                alt="AVATAR ICON"
                                width={avatarSize}
                                height={avatarSize}
                                className="rounded-[8px] border"
                            />
                            <div className="absolute top-[-3px] left-[-3px] bg-black flex justify-center items-center h-6 w-6 rounded-[6px] border">
                                <Star color="#fff" className="h-4 w-4" strokeWidth={2.5}/>
                            </div>
                        </div>  
                    </div>
                );
        }
    };

    return (
        <div className={cn("mt-1 hover:bg-primary/5 active:bg-primary/10 rounded-[16px] cursor-pointer p-2 z-0", className)} onClick={toggleExpand}>
            <Dialog>
                <DialogTrigger asChild>
                    <div>
                        <div className="flex gap-3">
                            {renderAvatar(50)}
                            <div>
                                <p className="text-[17px] lg:text-[20px] font-regular">{getOperationType()}</p>
                                <p className="text-[13px] lg:text-[15px] text-[#434C55] font-regular">{getOperationText()}</p>
                            </div>
                            <div className="flex justify-end items-center w-full">
                                {data.id === transactionSenderId ? (
                                    <div className="flex gap-1 text-[17px] lg:text-[20px] font-bold">
                                        <p className="text-right"> -{(amount).toFixed(2)} </p>
                                        <p className="text-[17px] font-medium"> ALM </p>
                                    </div>
                                ) : (
                                    <div className="flex gap-1 text-[17px] lg:text-[20px] font-bold">
                                        <p className="text-right text-[#3FB64F]"> +{(amount - commission).toFixed(2)}</p>
                                        <p className="text-[17px] font-medium text-[#3FB64F]"> ALM </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="w-[400px] p-4 px-10 border bg-white shadow-md">
                    <DialogHeader>
                        <div className="flex gap-6">
                            <h1 className="text-[18px] font-semibold">ID операции: {id}</h1>
                            <DialogTitle className="text-[18px] font-semibold text-center">{new Date(createdAt).toLocaleString()}</DialogTitle>
                        </div>
                        <hr className="bg-black" />
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="py-7 px-6 bg-primary/5 shadow-sm rounded-[20px]">
                            <div className="flex">
                                <div className="flex flex-col">
                                    <div className="flex text-[22px] font-semibold gap-2 items-center justify-center">
                                        <CircleCheck size={30} />
                                        <h1 className="pt-1">Успешный платеж</h1>
                                    </div>
                                    {data.id === transactionSenderId ? (
                                        <div className="flex gap-1 text-[30px] lg:text-[30px] mt-2 font-bold">
                                            <p className="text-right gap-2"> -{(amount).toFixed(2)} </p>
                                            <p className="text-[22px] font-medium"> ALM </p>
                                        </div>
                                    ) : (
                                        <div className="flex gap-1 text-[25px] lg:text-[25px] mt-1 font-bold">
                                            <p className="text-right text-[#3FB64F]"> +{(amount - commission).toFixed(2)}</p>
                                            <p className="text-[20px] font-medium text-[#3FB64F]"> ALM </p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center justify-end ml-auto">
                                    {renderAvatar(75)}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex p-2 px-4 mt-2 bg-primary/5 rounded-[16px] text-[19px] gap-1">
                                    <p className="mt-1">Комиссия {commission.toFixed(2)}</p>
                                    <p className="text-[16px]">ALM</p>
                                </div>
                            </div>
                            <div className="text-[19px] mt-3 ml-3">
                                <h1>Алмазный счет {'-->'} {recipient}</h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="font-semibold text-[22px]">Сообщение</h1>
                        <div className="flex mt-1 gap-3 p-1.5 bg-primary/5 rounded-[12px] items-center justify-center">
                            <div className="w-[50px] h-[50px] flex items-center justify-center">
                                {renderAvatar(50)}
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="flex flex-col">
                                    {data.id === transactionSenderId ? (
                                        <p className="text-[22px]">{recipient}</p>
                                    ) : (
                                        <p className="text-[22px]">{sender}</p>
                                    )}
                                    <div className="w-[250px] text-[18px] text-slate-800">
                                    {message === '' ? <p>Сообщения нет</p> : <p>{message}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center ml-auto pr-2">
                                <Mail className="ml-auto hover:scale-110 transition-all cursor-pointer" size={30} />
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="m-auto">
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};