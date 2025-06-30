'use client';

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CircleUserRound, Wallet, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
       <div className={cn("flex justify-between md:justify-center md:gap-36 items-center p-4 md:px-8 md:py-4", className)}>
            <div className="flex items-center font-semibold text-[24px] md:text-[48px] gap-2 select-none">
                <h1>pnk</h1>
                <h1>банк</h1>
            </div>

            {/* Mobile Menu Button */}
            <button 
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <Menu size={24} />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center font-medium text-[16px] md:text-[20px] gap-3 md:gap-5">
                <a className="hover:text-[#373e46]" href="">Главная</a>
                <a className="hover:text-[#373e46]" href="#cabinet-info">Информация</a>
                <a className="hover:text-[#373e46]" href="#location-block">Пополнение</a>
                <a className="hover:text-[#373e46]" href="">Помощь</a>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white z-50 md:hidden p-4 shadow-lg">
                    <div className="flex flex-col gap-3">
                        <a className="hover:text-[#373e46] p-2" href="">Главная</a>
                        <a className="hover:text-[#373e46] p-2" href="#cabinet-info">Информация</a>
                        <a className="hover:text-[#373e46] p-2" href="#location-block">Пополнение</a>
                        <a className="hover:text-[#373e46] p-2" href="">Помощь</a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button onClick={() => router.push('/register')} className="rounded-[12px] mt-2 text-[16px]" variant={'outline'}>Стать клиентом <Wallet width={24} height={24} /></Button>
                        <Button onClick={() => router.push('/login')} className="rounded-[12px] mt-2 text-[16px]" variant={'outline'}>Войти <CircleUserRound width={24} height={24}/></Button>
                    </div>
                </div>
            )}

            {/* Buttons */}
            <div className="hidden md:flex gap-2">
                <Button onClick={() => router.push('/register')} className="rounded-[12px]" variant={'outline'}>Стать клиентом <Wallet width={24} height={24} /></Button>
                <Button onClick={() => router.push('/login')} className="rounded-[12px]" variant={'outline'}>Войти <CircleUserRound width={24} height={24}/></Button>
            </div>
       </div>
    )
}