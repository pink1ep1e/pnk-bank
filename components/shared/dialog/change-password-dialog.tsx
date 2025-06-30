'use client';

import React, { useState } from "react"
// import { Title } from "../title";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { ChevronRight, KeyRound, LockOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { updatePassword } from "@/app/actions";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {   
    className?: string;
}

export const ChangePasswordDialog: React.FC<Props> = ({ className }) => {
    const [ currentPassword, setCurrentPassword ] = useState<string>('');
    const [ newPassword, setNewPassword ] = useState<string>('');
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
    const [passwordStrength, setPasswordStrength] = useState<number>(0);

    const checkPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
        setPasswordStrength(strength);
    };

    const getStrengthColor = (strength: number) => {
        switch (strength) {
            case 0: return 'bg-red-500';
            case 1: return 'bg-orange-500';
            case 2: return 'bg-yellow-500';
            case 3: return 'bg-lime-500';
            case 4: return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    const getStrengthText = (strength: number) => {
        switch (strength) {
            case 0: return 'Очень слабый';
            case 1: return 'Слабый';
            case 2: return 'Средний';
            case 3: return 'Хороший';
            case 4: return 'Отличный';
            default: return '';
        }
    };

    const onSubmit = async (newPassword: string, currentPassword: string) => {
        try {
            if (!isConfirmed) {
                throw new Error("Пожалуйста, подтвердите изменение пароля.");
            }

            if (newPassword === '') {
                throw new Error("Строка нового пароля не должна быть пустой.")
            }

            if (currentPassword === '') {
                throw new Error("Строка старого пароля должна быть пустой.")
            }

            if (currentPassword === newPassword) {
                throw new Error("Новый пароль не должен содержать в себе старый пароль.")
            }

            if (newPassword.length < 8) {
                throw new Error("Пароль должен содержать более 8 символов!")
            }

            await updatePassword(newPassword, currentPassword);

            setNewPassword('');
            setCurrentPassword('');

            toast({
                title: "Операция выполнена успешно.",
                description: `Вы успешно изменили пароль.`,   
              })

        } catch (error) {
            console.log('Error [CODEWORD]', error);
            toast({
              variant: "destructive",
              title: "О-о-о! Что-то пошло не так.",
              description: `${error}`,
            })
        }

    }

    return (
        <>
            <div className={cn("", className)}>
                <Dialog>
                    <DialogTrigger asChild>
                    <div className="flex cursor-pointer hover:bg-primary/5 rounded-[12px] p-2 justify-start mt-1 items-center gap-3">
                            <div className="flex rounded-[16px] h-[55px] w-[55px] md:h-[60px] md:w-[60px] border border-primary/30 bg-white p-3 items-center justify-center">
                                <KeyRound className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]"/>
                            </div>
                            <div className="items-center"> 
                                <p className="text-[18px] lg:text-[20px] text-left font-regular">Ваш пароль</p>
                                <p className="text-[14px] lg:text-[18px] text-left font-regular text-[#434C55]">Сменить ваш пароль</p>
                            </div>
                            <div className="flex justify-center items-center ml-auto">
                                <ChevronRight size={20}/>
                            </div>
                    </div>
                    </DialogTrigger>
                    <DialogContent className="min-w-[500px] p-8 px-10 border-2 border-slate-300">
                    <DialogHeader>
                    <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-[150px] lucide lucide-shield-user-icon lucide-shield-user"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M6.376 18.91a6 6 0 0 1 11.249.003"/><circle cx="12" cy="11" r="4"/></svg>
                    </div>
                    <DialogTitle className="text-[35px] font-bold text-center">Изменение пароля</DialogTitle>
                        <DialogDescription className="text-[18px] text-center">
                            Используйте надежный пароль, состоящий из букв, цифр и специальных символов. 
                            Рекомендуем менять пароль каждые 3 месяца для безопасности.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-1 items-center gap-0.5">
                            <p className="text-[20px] font-semibold">Введите ваш новый пароль: </p>
                            <div className="flex items-center justify-center gap-3">
                                <Input 
                                    placeholder="pnkbanksuper123"
                                    value={newPassword ?? ""} 
                                    type={'password'}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        checkPasswordStrength(e.target.value);
                                    }}
                                    className="h-[45px] rounded-[12px]"
                                />
                                <KeyRound className="hover:scale-110 cursor-pointer transition-all" size={35}/>
                            </div>
                            <div className="bg-gray-200 w-[350px] ml-2 rounded-full h-2 mt-2">
                                <div 
                                    className={`${getStrengthColor(passwordStrength)} h-2 rounded-full`} 
                                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                ></div>
                            </div>
                            <span className="text-[#71717a] ml-2 mt-1 text-[15px]">
                                Надежность пароля: <span className={`${getStrengthColor(passwordStrength)} text-white px-4 py-1 rounded-md`}>
                                    {getStrengthText(passwordStrength)}
                                </span>
                            </span>
                            {/* <span className="text-[#71717a] ml-2 mt-1 text-[15px]">Пароль должен состоять минимум из 8 символов и содержать цифры и специальные символы (! “ # $ % ‘ () *)</span> */}
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-1 items-center gap-0.5">
                            <p className="text-[20px] font-semibold">Введите ваш текущий пароль: </p>
                            <div className="flex items-center justify-center gap-3">
                                <Input 
                                    placeholder="pnkbank228"
                                    value={currentPassword ?? ""} 
                                    type={'password'}
                                    onChange={(e) => setCurrentPassword(e.target.value)} 
                                    className="h-[45px] rounded-[12px]"
                                />
                                <LockOpen className="hover:scale-110 cursor-pointer transition-all" size={35}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-start items-center ml-1 mt-1 gap-2">
                        <Checkbox
                            id="confirm-password"
                            checked={isConfirmed}
                            onCheckedChange={(checked) => setIsConfirmed(checked === true)}
                            className="w-[25px] h-[25px] ring-0 rounded-[8px]"
                        />
                        <label
                            htmlFor="confirm-password"
                            className="text-[17px] text-[#71717a] cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Я подтверждаю <span className="text-black">изменение пароля</span> и обязуюсь <span className="text-black">запомнить его или</span> <span className="text-black">сохранить</span> в <span className="text-black">безопасном месте.</span>
                        </label>
                    </div>
                    <DialogFooter className="m-auto mt-4">
                        <Button 
                            onClick={() => onSubmit(newPassword, currentPassword)} 
                            className="text-[20px] py-2.5 w-[350px]" 
                            type="submit"
                            disabled={!isConfirmed}
                        >
                            Изменить пароль
                        </Button>
                    </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}