'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Title } from "../title";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    userName?: string;
    className?: string;
}

export const AuthSession: React.FC<Props> = ({ className, userName }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    
    const handleNavigate = () => {
        setIsLoading(true);
        router.push('/cabinet');
    }

  return (
    <div className={cn('', className)}>  
        <div className="text-center">
            <Title className="font-extrabold" text="Вы недавно входили в аккаунт, это вы?" size="xl"/>
            <h1 className="text-[17px] text-gray-600">Если вы желаете продолжить вход в личный кабинет с этим аккаунтом, нажмите кнопку ниже</h1>
        </div>

        <div className="flex items-center justify-start border bg-gray-100 p-4 mt-4 rounded-[20px] gap-4">
            <Image 
                src={`https://minotar.net/avatar/${userName}`}
                alt="AVATAR ICON"
                width={70}
                height={70}
                className="rounded-[12px]"
            />
            <div className="text-[25px] ">
                <p className="font-semibold">{userName}</p>
                <p className="text-[16px] text-gray-600">Вы недавно входили в этот аккаунт</p>
            </div>
            <div className="flex-grow flex justify-end items-center">
                <Button 
                    onClick={handleNavigate} 
                    className="h-[60px] w-[60px] text-[20px] pt-1 rounded-[12px]"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <p className="text-[23px]">{'->'}</p>
                    )}
                </Button>
            </div>
        </div>
    </div>
  );
};
