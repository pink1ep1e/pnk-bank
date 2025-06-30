'use client';

import React, { useState } from 'react';
import { LoginForm } from './login-form';
import { cn } from '@/lib/utils';
import { Title } from '../title';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { QRCodeLogin } from './qr-code-login';
import { Rocket } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
    className?: string;
}

export const AuthModal: React.FC<Props> = ({ className }) => {
    const router = useRouter()
    const [activeButton, setActiveButton] = useState(0);

    return (
        <div className={cn('shadow-xl border rounded-[20px] w-[370px] p-[30px] md:p-[55px] md:py-[45px] md:w-[650px] bg-white', className)}>
            <div className="text-center mb-2">
                <Title className="font-extrabold" text="Вход в личный кабинет" size="xl"/>
                <h1 className="text-[17px] text-gray-600">Введите данные от своего аккаунта и войдите в личный кабинет</h1>
            </div>
            <div className='relative flex justify-center items-center w-full bg-white border gap-2 p-2 py-3 rounded-[14px] mb-4 mt-4'>
                <motion.div
                    className="absolute left-0 h-full bg-black/5 rounded-[8px]"
                    initial={false}
                    animate={{ x: activeButton === 0 ? '20%' : '125%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{ width: '220px', height: '45px' }}
                />
                <Button 
                    onClick={() => setActiveButton(0)}
                    className={`relative z-10 w-[220px] rounded-[8px] h-[45px] transition-all font-semibold text-black text-[20px] px-6 hover:text-black ${activeButton == 0 && 'hover:bg-black/0 text-black'}`} 
                    variant={'ghost'}
                >
                    Вход по логину
                </Button>
                <Button 
                    onClick={() => setActiveButton(1)}
                    className={`relative z-10 w-[220px] rounded-[8px] h-[45px] transition-all font-semibold text-black text-[20px] px-6 hover:text-black ${activeButton == 1 && 'hover:bg-black/0 text-black'}`} 
                    variant={'ghost'}
                >
                    Вход по Email-Коду
                </Button>
                {/* <Button 
                    onClick={() => setActiveButton(2)}
                    className='relative z-10 w-[200px] rounded-[8px] h-[45px] font-semibold text-[20px] px-6 hover:bg-black/5' 
                    variant={'ghost'}
                >
                    ...
                </Button> */}
            </div>
            {
                activeButton == 0 ?
                <div className='min-h-[420px]'>
                    <LoginForm />
                    <div className='flex items-center justify-center'>
                        <Button className='rounded-[12px] mt-2 h-[50px] text-[20px] w-[250px] md:w-[400px]' onClick={() => router.push('/register')} variant={'ghost'}>
                            Стать клиентом <Rocket size={64} />
                        </Button>
                    </div>
                    <div className="text-center text-[16px] text-black pt-3">
                        <p>Если вы не помните пароль, пожалуйста обратитесь в поддержку.</p>
                        <p className="text-gray-600">При входе в аккаунт вы подтверждаете свое согласие с <a href="/offer" className="text-primary underline">условиями использования сервиса</a>.</p>
                    </div>
                </div>
                :
                <div className='min-h-[420px]'>
                    <QRCodeLogin />
                </div>
            }
        </div>
    );
};