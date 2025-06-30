'use client';

import { Input } from "@/components/ui/input";
import React, { useState } from "react"
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { banUser_Admin, changePassword_Admin, unBanUser_Admin } from "@/app/actions";
import Image from 'next/image';
import { Ban, Save, ShieldPlus } from "lucide-react";

interface Props {
    id: number;
    userName: string;
    email: string;
    imageUrl: string;
    discordId: string;
    discordUser: string;
    userStatus: string;
    codeWord: string;
    role: string;
    isGov: boolean;
    createdAt: Date;
}

export const UsersDashboard: React.FC<Props> = ({ 
    id,
    userName,
    userStatus,
    codeWord,
    isGov,
 }) => {
    const [ password, setPassword] = useState('');

    const onChangeStatus = async (userStatus: string, userName: string, id: number) => {
        try {

            if (userStatus === 'ACTIVE') {
                await banUser_Admin(id);
                toast({
                    title: "Операция выполнена успешно.",
                    description: `Вы заблокировали пользователя ${userName} c ID: ${id}.`,   
                })
            } else if (userStatus === 'BLOCKED') {
                await unBanUser_Admin(id);
                toast({
                    title: "Операция выполнена успешно.",
                    description: `Вы разблокировали пользователя ${userName} c ID: ${id}.`,   
                })
            }

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

      const onChangePassword = async (id: number, password: string) => {
        try {

            await changePassword_Admin(id, password)

            toast({
                title: "Операция выполнена успешно.",
                description: `Вы изменили пароль пользователя ${userName} c ID: ${id}.`,   
              })

            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } catch (error) {
            console.log('Error [CHANGEPASSWORD_ADMIN]', error);
            toast({
                variant: "destructive",
                title: "О-о-о! Что-то пошло не так.",
                description: `${error}`,
            })
        }
      }

    return (
        <>  
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
                    <div className="w-full items-center">
                        <Input 
                            placeholder="Новый пароль"
                            value={password ?? ""} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    <Button 
                        className="pt-4 pb-4 pr-8 pl-8 text-[16px]" 
                        disabled={password.length === 0}
                        onClick={() => onChangePassword(id, password)}
                    >
                        Сохранить <Save size={24}/>
                    </Button>

                    <div className="w-full">
                        <p className="font-semibold text-[16px] mb-1">Кодовое слово</p>
                        <h1>{codeWord}</h1>
                    </div>

                    <div className="flex justify-center items-center w-full">
                            <p className="font-semibold text-[16px]">Гос. аккаунт: {isGov === false ? 'Нет' : 'Да'}</p>
                    </div>
                    <div className="flex justify-center items-center gap-2 w-full">
                        {
                            userStatus === 'BLOCKED' ? 
                            <Button onClick={() => onChangeStatus(userStatus, userName, id)} className="pt-4 pb-4 pr-8 pl-8 text-[16px]">
                                Разблокировать <ShieldPlus size={24}/>
                            </Button>
                            :
                            <Button onClick={() => onChangeStatus(userStatus, userName, id)} className="pt-4 pb-4 pr-8 pl-8 text-[16px]">
                                Заблокировать <Ban size={24}/>
                            </Button>
                        }
                        {/* <div className="w-full gap-2">
                        {
                            isGov === false ? 
                            <Button className="pt-4 pb-4 pr-8 pl-8 text-[16px]">
                                Назначить GOV
                            </Button>
                            :
                            <Button className="pt-4 pb-4 pr-8 pl-8 text-[16px]">
                                Убрать GOV
                            </Button>
                        }
                        {
                            role === 'MODER' &&
                            <Button className="pt-4 pb-4 pr-8 pl-8 mt-2 text-[16px]">
                                Назначить USER
                            </Button>
                        }
                        {
                            role === 'USER' &&
                            <Button className="pt-4 pb-4 pr-8 pl-8 mt-2 text-[16px]">
                                Назначить MODER
                            </Button>
                        }
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}