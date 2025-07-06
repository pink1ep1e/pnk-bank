'use client';

import React from "react"
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

interface Props {
    className?: string;
}

export const AdminWarring: React.FC<Props> = ({ className }) => {

    return (
        <div className={cn("shadow-md border-primary bg-red-50 mt-4 rounded-[20px] border border-red-500 w-full h-fit pt-[20px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[30px] lg:pb-[30px] lg:pr-[45px] lg:pl-[45px]", className)}>        
            <div className="flex justify-start items-start gap-4">
                <div className="h-[50px]">
                    <TriangleAlert size={50}/>
                </div>
                <div className="flex flex-col">
                    <p className="text-[21px] font-semibold">Важная информация для администрации!</p>
                    <p className="text-[16px]">Используйте админ-панель ответственно! Каждое ваше действие фиксируется и видно нам. Помните, что вы управляете важными данными пользователей, и любая ошибка может иметь серьезные последствия. Будьте внимательны и осторожны при выполнении операций.</p>
                </div>
            </div>
        </div>
    )
}