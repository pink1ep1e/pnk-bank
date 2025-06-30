'use client';

import { Transactions } from "@prisma/client";
import React from "react"
import { Title } from "../title";
import { calculateFees } from "@/constants/calc-fees";
import { transactionAmount } from "@/constants/calc-transaction-amount";

interface Props {
    transactions: Transactions[];
}

export const BankInfoDashboard: React.FC<Props> = ({ transactions }) => {
    const { dailyFees, weeklyFees, monthlyFees, AllTimeFees } = calculateFees(transactions);
    const { dailyTransaction, weeklyTransaction, monthlyTransaction, AllTimeTransaction } = transactionAmount(transactions);

    return (
        <div className="border border-primary mt-4 bg-white rounded-[20px] border-black w-full h-fit pt-[30px] pb-[30px] pr-[45px] pl-[45px]">        
            <Title className="font-extrabold" text="Системная информация" size='md'/>
            <div className="flex gap-6">
                <p className="font-regular text-sm sm:text-base lg:text-lg">Информация о заработанных средствах на комиссии.</p>
            </div>
            <div className="text-[18px] mt-2">
                <div className="bg-[#F5F7FA] pl-8 pt-5 pb-5 rounded-[20px]">
                    <p>Сумма комиссий за день: <span>{dailyFees.toFixed(2)} ALM</span></p>
                    <p>Сумма комиссий за неделю: <span>{weeklyFees.toFixed(2)} ALM</span></p>   
                    <p>Сумма комиссий за месяц: <span>{monthlyFees.toFixed(2)} ALM</span></p>
                    <p>Сумма комиссий за все время: <span>{AllTimeFees.toFixed(2)} ALM</span></p>
                </div>
            </div>
            <div className="text-[18px] mt-2">
                <h1 className="font-bold text-[24px]">Суммы транзакций</h1>
                <p className="font-regular text-sm sm:text-base lg:text-lg">Информация о суммах транзакций за разное время.</p>
                <div className="bg-[#F5F7FA] pl-8 pt-5 pb-5 rounded-[20px]">
                    <p>Сумма транзакций за день: <span>{dailyTransaction.toFixed(2)} ALM</span></p>
                    <p>Сумма транзакций за неделю: <span>{weeklyTransaction.toFixed(2)} ALM</span></p>   
                    <p>Сумма транзакций за месяц: <span>{monthlyTransaction.toFixed(2)} ALM</span></p>
                    <p>Сумма транзакций за все время: <span>{AllTimeTransaction.toFixed(2)} ALM</span></p>
                </div>
            </div>
        </div>
    )
}