'use client';

import { User, Card, Transactions, Notification } from "@prisma/client";
import React, { useEffect } from "react"
import { AccountDetails, CardDetails, LastOperationDetails, NotificationDetails, TransactionDetails } from "./cabinet-details";
import { CreditCard, ArrowBigUpDash, ScanQrCode } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CardButtons } from "./card-buttons";

interface Props {
    data: User;
    card: Card;
    transaction: Transactions[];
    notifications: Notification[]   
}

export const Cabinet: React.FC<Props> = ({transaction, data, card, notifications }) => {

    useEffect(() => {
        AOS.init({
          duration: 800, 
          once: true, 
        });
      }, []);
        
    return (
        <div style={{overflow: 'hidden'}}>  
            <div className="flex items-center md:flex-row justify-center m-auto font-semibold text-[48px] gap-2 select-none">
                <h1>pnk</h1>
                <h1>банк</h1>
            </div>
            <div className="flex flex-col pb-8 md:grid md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5 w-full px-4 md:px-8 lg:px-[8rem]">
                <div className="flex flex-col gap-5">
                    <div data-aos="fade-up">
                        <CardDetails data={data} card={card}/>
                    </div>
                    <CardButtons />
                    <div data-aos="fade-left">
                        <AccountDetails data={data} />
                    </div>
                </div>
                <div>
                    <div data-aos="fade-up">
                        <LastOperationDetails transaction={transaction} data={data}/>
                    </div>
                    <div data-aos="fade-down">
                        <NotificationDetails className="mt-5" notifications={notifications}/>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <TransactionDetails data={data} card={card}/>
                    {/* <PremiumDetails username={data.userName}/> */}
                </div>
            </div>
        </div>
    )
}