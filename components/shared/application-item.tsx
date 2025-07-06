'use client';

import { APPLICATION_STATUS } from "@prisma/client";
import React from "react"
import { Button } from "../ui/button";
import Image from 'next/image';
import { toast } from "@/hooks/use-toast";
import { Check, Forward, X } from "lucide-react";
import { ApplicationStatusReject, ApplicationStatusSuccess } from "@/app/actions";

interface Props {
    id: number;
    userName: string;
    telegram: string;
    discord: string;
    status: APPLICATION_STATUS;
    createdAt: Date;
}

export const ApplicationItem: React.FC<Props> = ({ 
    id,
    userName,
    telegram, 
    discord,
    status,
    createdAt
 }) => {
    const date = new Date(createdAt);

    const onChangeStatusSuccess = async (id: number) => {
        try {

            await ApplicationStatusSuccess(id)


            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (error) {
          console.log('Error [BAN_USER]', error);
          toast({
            variant: "destructive",
            title: "О-о-о! Что-то пошло не так.",
            description: `${error}`,
          })
        }
      };
      const onChangeStatusReject = async (id: number) => {
        try {

            await ApplicationStatusReject(id)


            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (error) {
          console.log('Error [BAN_USER]', error);
          toast({
            variant: "destructive",
            title: "О-о-о! Что-то пошло не так.",
            description: `${error}`,
          })
        }
      };

    return (    
        <div className="w-full rounded-[20px] p-3 bg-[#F5F7FA] mt-4 px-4 md:px-4 lg:px-[2rem]">
            <div className="flex gap-4 justify-center items-center">
                <Image 
                    src={`https://minotar.net/avatar/${userName}`}
                    alt="AVATAR ICON"
                    width={60}
                    height={60}
                    className="rounded-[12px]"
                />
                <p className="text-[23px] font-semibold">#{id}</p>
                <div className="w-full">
                    <p className="font-regular text-[23px] mb-1">{userName}</p>
                </div>

                <div className="w-full">
                    <p className="font-semibold text-[16px] mb-1">Telegram</p>
                    <h1>{telegram}</h1>
                </div>

                <div className="w-full">
                    <p className="font-semibold text-[16px] mb-1">Discord</p>
                    <h1>{discord}</h1>
                </div>
                <div className="w-full">
                    <p className="font-semibold text-[16px] mb-1">Дата</p>
                    <h1>{date.toLocaleDateString()}</h1>
                </div>
                <div className="w-full">
                    <p className="font-semibold text-[16px] mb-1">Время</p>
                    <h1>{date.toLocaleString()}</h1>
                </div>


                <div className="flex justify-center items-center gap-2 w-full">
                    {
                        status == APPLICATION_STATUS.WAITING &&
                        <div className="flex gap-2">
                            <Button onClick={() => onChangeStatusSuccess(id)} className="pt-4 pb-4 pr-8 pl-8 text-[16px]">
                            Выполнить <Forward size={24} />
                            </Button>
                            <Button variant={'destructive'} onClick={() => onChangeStatusReject(id)} className="pt-4 pb-4 pr-8 pl-8 text-[16px]">
                                Отказать <X size={24}/>
                            </Button>
                        </div>
                    }
                    {
                        status === APPLICATION_STATUS.ACTIVE &&
                        <div>
                            <Button disabled={true} className="pt-4 pb-4 pr-8 pl-8 text-[16px]">
                                Выполненно <Check size={24} />
                            </Button>
                        </div>
                    }
                    {
                        status === APPLICATION_STATUS.REJECTED && 
                        <div>
                            <Button disabled={true} className="pt-4 pb-4 pr-8 pl-8 text-[16px]">
                                Отказано <X size={24}/>
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}