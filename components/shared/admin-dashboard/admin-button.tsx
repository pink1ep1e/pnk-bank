'use client';

import React from "react"
import { cn } from "@/lib/utils";
import { Crown, ChevronRight } from "lucide-react";

interface Props {   
    className?: string;
}

export const AdminButton: React.FC<Props> = ({ className }) => {

    return (
        <a href="/cabinet/dashboard" className={cn("flex cursor-pointer hover:bg-primary/5 rounded-[12px] p-2 justify-start mt-1 items-center gap-3", className)}>
            <div className="flex rounded-[16px] h-[55px] w-[55px] md:h-[60px] md:w-[60px] border border-primary/30 bg-white p-3 items-center justify-center">
                <Crown className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]"/>
            </div>
            <div className="items-center"> 
                <p className="text-[18px] lg:text-[20px] text-left font-regular">Управление</p>
                <p className="text-[14px] lg:text-[18px] text-left font-regular text-[#434C55]">Войти в админ-панель</p>
            </div>
            <div className="flex justify-center items-center ml-auto">
                <ChevronRight size={20}/>
            </div>
        </a>
    )
}