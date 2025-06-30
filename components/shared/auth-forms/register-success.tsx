'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ArrowLeft, User } from "lucide-react";
import Image from "next/image";

interface Props {
    userName: string;
    telegram: string;
    discord: string;
    className?: string;
}

export const RegisterSuccess: React.FC<Props> = ({ className, userName, telegram, discord }) => {
    const router = useRouter();

    return (
        <div className={cn('border bg-white rounded-[20px] shadow-lg w-[370px] p-[30px] md:p-[55px] md:w-[650px]', className)}>  
            <div className="text-center">

                <div className="flex justify-center items-center gap-4 mb-2">
                  <h1 className="text-[35px] font-bold">
                      Ваша заявка успешно создана
                  </h1>
                </div>

                {/* Текст с инструкциями */}
                <div className="rounded-[12px] text-black">
                    <p className="text-[20px] ">
                        Спасибо, что хотите стать клиентом нашего банка! 
                        Напоминаем, что вы должны открыть личные сообщения в Discord или Telegram, 
                        чтобы с вами смог связаться представитель банка для обсуждения деталей оформления счета. 
                    </p>
                </div>
                
                <div className="text-[22px] mt-4">
                  <p className="text-[16px] text-gray-700 ">
                      Если вы заполнили что-то не верно, пожалуйста, обратитесь в поддержку.
                    </p>
                </div>

                <div className="bg-primary/5 rounded-[12px] p-4 mb-6">
                  <div className="flex justify-start items-center gap-4">
                    <Image 
                        src={`https://minotar.net/avatar/${userName}`}
                        alt="REGISTER ICON"
                        width={65}
                        height={65}
                        className="rounded-[8px]"
                    />
                    <div className="flex flex-col justify-center items-start">
                      <p className="text-[25px] font-semibold">{userName}</p>
                      <div className="flex gap-2 text-[17px]">
                        <p>@{telegram}</p>
                        <p>{discord}</p>
                      </div>
                    </div>

                  </div>
                </div>
                <p className="text-[20px]">Мы свяжемся с вами в течение 24 часов для подтверждения заявки.</p>

                {/* Кнопка для возврата на главную */}
                <div className="flex justify-center items-center gap-4 mt-2">
                  <Button 
                        onClick={() => router.push('/login')} 
                        className="mt-4 px-10 h-[50px] text-[20px]" 
                        variant={'outline'}
                    >
                      Вход в аккаунт <User size={24} />
                  </Button>
                  <Button 
                      onClick={() => router.push('/')} 
                      className="mt-4 px-10 h-[50px] text-[20px]" 
                  >
                      Вернуться на главную <ArrowLeft size={24} />
                  </Button>
                </div>
            </div>
        </div>
    );
};
