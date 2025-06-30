'use client';

import React, { useState } from 'react'
import { cn } from "@/lib/utils";
import { Bell, BookMarked, KeyRound, RectangleEllipsis, Settings } from 'lucide-react';
import { NOTIFICATION_TYPE } from '@prisma/client';
import { parseMessage } from './parse-url';

interface Props {
    id: number;
    sender: string;
    message: string;
    type: NOTIFICATION_TYPE;

    createdAt: Date;
}

export const NotificationItem: React.FC<Props> = ({
    sender,
    message,
    type,
    createdAt,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const formattedDate = new Date(createdAt).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
    })

    return (
        <div className={cn("rounded-[16px] hover:bg-[#F5F7FA] cursor-pointer p-2 z-0")} onClick={toggleExpand}>   
            <div className="flex justify-start items-center gap-3 relative">
                <div className='w-[32px] h-[32px] justify-center items-center'>
                    {type === NOTIFICATION_TYPE.SYSTEM &&
                        <Bell size={32}/>
                        
                    }
                    {type === NOTIFICATION_TYPE.ADMIN &&
                        <Settings size={32} />
                        
                    }
                    {type === NOTIFICATION_TYPE.PASSWORD &&
                        <KeyRound size={32}/>
                        
                    }
                    {type === NOTIFICATION_TYPE.CODEWORD &&
                        <RectangleEllipsis size={32}/>
                        
                    }
                    {type === NOTIFICATION_TYPE.INFO &&
                        <BookMarked size={32}/>
                        
                    }
                </div>
                <div className='flex-1'>
                    <h1 className='text-[18px] '>
                        {sender} 
                        <span className='text-sm float-right text-center mt-[3px]'>{formattedDate}</span>
                    </h1>
                    <p className='text-[#434C55]'>{parseMessage(message)}</p>
                </div>
            </div>
        </div>  
    )
}