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
import { ChevronRight, RectangleEllipsis, SquareAsterisk } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { updateCodeWord } from "@/app/actions";
import { Checkbox } from "@/components/ui/checkbox";


interface Props {   
    className?: string;
}

export const CodeWordDialog: React.FC<Props> = ({ className }) => {
    const [ value, setValue ] = useState("");
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

    const onSubmit = async (value: string) => {
        try {

            if (value === '') {
                throw new Error("Строка не должна быть пустой.")
            }

            if (value.length > 20) {
                throw new Error("Слишком длинное кодовое слово, максимум 20 символов.")
            }
            
            await updateCodeWord(value);
            
            setValue('');

            toast({
                title: "Операция выполнена успешно.",
                description: `Вы успешно изменили код-слово на ${value}.`,   
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
                    <div className="flex cursor-pointer hover:bg-primary/5 rounded-[12px] p-2 justify-start items-center gap-3">
                        <div className="flex  rounded-[16px] h-[55px] w-[55px] md:h-[60px] md:w-[60px] items-center justify-center shadow-md border border-primary/30 bg-white p-3">
                            <RectangleEllipsis className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]"/>
                        </div>
                        <div className="items-center"> 
                            <p className="text-[18px] lg:text-[20px] text-left font-regular">Ваше код-слово</p>
                            <p className="text-[14px] lg:text-[18px] text-left font-regular text-[#434C55]">Сменить ваше код-слово</p>
                        </div>
                        <div className="flex justify-end items-end ml-auto">
                            <ChevronRight className="pr-auto" size={20}/>
                        </div>
                    </div>
                    </DialogTrigger>
                    <DialogContent className="min-w-[500px] p-8 px-10 border-2 border-slate-300 shadow-md">
                    <DialogHeader>
                        <div className="flex items-center justify-center">
                            <RectangleEllipsis size={150}/>
                        </div>
                        <DialogTitle className="text-[35px] text-center font-bold">Изменение код-слова</DialogTitle>
                        <DialogDescription className="text-[18px] text-center">
                        Только с кодовым словом вы можете обратиться в поддержку для подтверждения что это вы, никому не сообщайте ваше код-слово! Выберите уникальное и запоминающееся слово или фразу.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 ">
                        <div className="grid grid-cols-1 items-center gap-1">
                            <p className="text-[20px] font-semibold">Введите ваше код-слово: </p>
                            <div className="flex items-center justify-center gap-3">
                                <Input 
                                    id="name" 
                                    placeholder="Москва, концерт вайпер"
                                    value={value ?? ""} 
                                    onChange={(e) => setValue(e.target.value)} 
                                    className="h-[45px] rounded-[12px]"
                                />
                                <SquareAsterisk className="hover:scale-110 cursor-pointer transition-all" size={35}/>
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
                            Я подтверждаю <span className="text-black">изменение код-слова</span> и обязуюсь <span className="text-black">запомнить его или</span> <span className="text-black">сохранить</span> в <span className="text-black">безопасном месте.</span>
                        </label>
                    </div>
                    <DialogFooter className="m-auto">
                        <Button onClick={() => onSubmit(value ?? '')} className="text-[20px] py-2.5 w-[350px]" disabled={!isConfirmed}  type="submit">Изменить код-слово</Button>
                    </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}