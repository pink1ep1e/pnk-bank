'use client';

import { User, Card, Transactions, Notification } from "@prisma/client";
import React from "react"
import { AccountDetails, CardDetails, LastOperationDetails, NotificationDetails, TransactionDetails } from "./cabinet-details";
// import { PremiumDetails } from "./cabinet-details/premium-details";

interface Props {
    data: User;
    card: Card;
    transaction: Transactions[];
    notifications: Notification[]   
}

export const Cabinet: React.FC<Props> = ({transaction, data, card, notifications }) => {
    return (
        <>  
            <div className="flex items-center md:flex-row justify-center m-auto font-semibold text-[48px] gap-2 select-none">
                <h1>pnk</h1>
                <h1>банк</h1>
            </div>
            <div className="flex flex-col pb-8 md:grid md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5 w-full px-4 md:px-8 lg:px-[8rem]">
                <div className="flex flex-col gap-5">
                    <CardDetails card={card}/>
                    <AccountDetails data={data} />
                </div>
                <div>
                    <LastOperationDetails transaction={transaction} data={data}/>
                    <NotificationDetails className="mt-5" notifications={notifications}/>
                </div>
                <div className="flex flex-col gap-5">
                    <TransactionDetails data={data} card={card}/>
                    {/* <PremiumDetails username={data.userName}/> */}
                </div>
            </div>
        </>
    )
}