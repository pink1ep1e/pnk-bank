'use client';

import React from 'react';
// import { Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signIn } from "next-auth/react";

export const QRCodeLogin: React.FC = () => {

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className='flex flex-col text-[20px] justify-center items-center'>
            <div className='text-center text-[16px]'>
                <p>Для входа через Discord вы должны быть зарегистрированным игроком Star SMP. Если вы не зарегистрированы на сервере, войти в аккаунт не получится.</p>
            </div>
            <Button 
                className="h-[50px] w-[250px] md:w-[400px] rounded-[12px] mt-6" 
                size={"lg"}
                onClick={() => signIn('discord')}
            >
                Войти через Discord
            </Button>
            <div className="text-center text-[16px] text-black pt-3 mt-3">
                        {/* <p>Если вы не помните пароль, пожалуйста обратитесь в поддержку.</p> */}
                        <p className="text-gray-600">При входе в аккаунт вы подтверждаете свое согласие с <a href="/offer" className="text-primary underline">условиями использования сервиса</a>.</p>
                    </div>
            </div>
        </div>
    );
}; 