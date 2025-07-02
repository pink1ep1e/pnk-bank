'use client';

import { Card, User } from "@prisma/client";
import React, { useState, useEffect } from 'react';
import { Title } from "../title";
import { cn } from "@/lib/utils";
import { Wallet } from "lucide-react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselApi,
    CarouselPrevious,
    CarouselNext,
  } from "@/components/ui/carousel"

interface Props {
    card: Card;
    data: User;
    className?: string;
}

export const CardDetails: React.FC<Props> = ({ data, card, className }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <div className="shadow-md border-primary bg-white rounded-[20px] border border-slate-200 w-full pt-[15px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[25px] lg:pb-[25px] lg:pr-[35px] lg:pl-[35px] ">
            <div className="flex justify-start items-center">
                <Title className="font-extrabold" text="Мои финансы" size='md'/>
            </div>
            <div className="flex items-center justify-center mt-1">
                <div className="flex justify-center items-center text-black/80 bg-primary/5 py-[8px] font-semibold px-4 text-[16px] text-center mt-2 gap-2 rounded-[18px]">
                    <Wallet />
                    <div className="flex justify-center items-center gap-1">
                        <p className="pt-[3px] text-[17px]">Алмазный счет </p>
                        <p className="pt-[3px] text-[16px]">
                            {card.balance.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, '|').replace(/\./g, ',').replace(/\|/g, '.')}
                        </p>
                        <p className="text-[15px]">ALM</p>
                    </div>
                </div>
            </div>
            <div className={cn("flex flex-col justify-center items-center rounded-[20px]", className)}>
                <Carousel className="w-full max-w-[360px] rounded-[30px]" setApi={setApi}>
                    <CarouselContent className="select-none">
                        <CarouselItem className="basis-full transition-all duration-300 cursor-pointer h-[220px] flex items-center justify-center">
                            <div className="relative w-[350px] h-[200px] perspective cursor-pointer select-none z-50">
                                <div
                                    className={`absolute w-full h-full rounded-[20px] px-[20px] py-[15px] text-white transition-transform duration-500 transform-style-3d ${
                                        isFlipped ? 'rotate-y-180' : ''
                                    }`}
                                    onClick={() => setIsFlipped(!isFlipped)}
                                    style={{
                                        background: `
                                            linear-gradient(50deg, rgb(0, 0, 0), rgb(42 42 42)),
                                            repeating-linear-gradient(
                                                45deg,
                                                transparent,
                                                transparent 4px,
                                                rgba(255, 255, 255, 0.05) 1px,
                                                rgba(255, 255, 255, 0.05) 3px
                                            )
                                        `,
                                        backgroundBlendMode: 'overlay'
                                    }}
                                >
                                    {/* Передняя сторона */}
                                    <div className={`w-full h-full ${isFlipped ? 'delayed-hidden' : 'delayed-block'}`}>
                                        <div className='flex items-center justify-between'>
                                            <p className='font-semibold text-[35px]'>pnk банк</p>
                                            <svg width="32" height="32" viewBox="0 0 12 12"><g opacity="0.5"><path d="M6 3C4.48899 3 3.23814 4.11756 3.03037 5.57106C2.99469 5.82063 2.7788 6.00461 2.52673 6.00023C2.51784 6.00008 2.50893 6 2.5 6C1.67157 6 1 6.67157 1 7.5C1 8.32843 1.67157 9 2.5 9H10C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7C9.86912 7 9.74526 7.02489 9.63204 7.06973C9.4638 7.13636 9.27268 7.10689 9.13233 6.99267C8.99198 6.87846 8.92429 6.69732 8.95535 6.51905C8.98466 6.35078 9 6.17739 9 6C9 4.34315 7.65686 3 6 3ZM2.11882 5.02888C2.55292 3.28889 4.12557 2 6 2C8.20914 2 10 3.79086 10 6C11.1046 6 12 6.89543 12 8C12 9.10457 11.1046 10 10 10H2.5C1.11929 10 0 8.88071 0 7.5C0 6.24889 0.919024 5.21243 2.11882 5.02888Z" fill="white"></path></g></svg>
                                        </div>
                                        <div className='flex justify-between items-end h-[115px]'>
                                            <p className='flex font-semibold text-[30px]'>
                                                Start
                                            </p>
                                            <p className='font-semibold text-[30px]'>•••• {String(card.cardNumber).slice(-4)}</p>
                                        </div>
                                    </div>
                                    {/* Задняя сторона */}
                                    <div className={`w-full h-full rotate-y-180 ${isFlipped ? 'delayed-block' : 'delayed-hidden'}`}>
                                        <div className='w-full h-[60px] rounded-[8px] bg-white/10'></div>
                                        <p className='font-semibold text-[30px] mt-2'>{data.userName}</p>
                                        <div className="flex m-auto"></div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem className="basis-full transition-all duration-300 cursor-pointer h-[220px] flex items-center justify-center">
                            <div className="relative w-[350px] h-[200px] perspective cursor-pointer select-none z-50">
                                <div
                                    className={`absolute w-full h-full rounded-[20px] px-[20px] py-[15px] text-white transition-transform duration-500 transform-style-3d ${
                                        isFlipped ? 'rotate-y-180' : ''
                                    }`}
                                    style={{
                                        background: `
                                            linear-gradient(50deg, rgb(0, 0, 0), rgb(45 31 29)),
                                            repeating-linear-gradient(
                                                45deg,
                                                transparent,
                                                transparent 4px,
                                                rgba(255, 255, 255, 0.05) 1px,
                                                rgba(255, 255, 255, 0.05) 3px
                                            )
                                        `,
                                        backgroundBlendMode: 'overlay'
                                    }}
                                    onClick={() => setIsFlipped(!isFlipped)}
                                >
                                    {/* Передняя сторона */}
                                    <div className={`w-full h-full ${isFlipped ? 'delayed-hidden' : 'delayed-block'}`}>
                                        <div className='flex items-center justify-between'>
                                            <p className='font-semibold text-[35px]'>pnk банк</p>
                                            {/* <svg width="32" height="32" viewBox="0 0 12 12"><g opacity="0.5"><path d="M6 3C4.48899 3 3.23814 4.11756 3.03037 5.57106C2.99469 5.82063 2.7788 6.00461 2.52673 6.00023C2.51784 6.00008 2.50893 6 2.5 6C1.67157 6 1 6.67157 1 7.5C1 8.32843 1.67157 9 2.5 9H10C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7C9.86912 7 9.74526 7.02489 9.63204 7.06973C9.4638 7.13636 9.27268 7.10689 9.13233 6.99267C8.99198 6.87846 8.92429 6.69732 8.95535 6.51905C8.98466 6.35078 9 6.17739 9 6C9 4.34315 7.65686 3 6 3ZM2.11882 5.02888C2.55292 3.28889 4.12557 2 6 2C8.20914 2 10 3.79086 10 6C11.1046 6 12 6.89543 12 8C12 9.10457 11.1046 10 10 10H2.5C1.11929 10 0 8.88071 0 7.5C0 6.24889 0.919024 5.21243 2.11882 5.02888Z" fill="white"></path></g></svg> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide opacity-50 lucide-container-icon lucide-container"><path d="M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"/><path d="M10 21.9V14L2.1 9.1"/><path d="m10 14 11.9-6.9"/><path d="M14 19.8v-8.1"/><path d="M18 17.5V9.4"/></svg>
                                        </div>
                                        <div className='flex justify-between items-end h-[115px]'>
                                            <p className='flex font-semibold text-[30px]'>
                                                Netherite
                                            </p>
                                            <p className='font-semibold text-[30px]'>•••• ••••</p>
                                        </div>
                                    </div>
                                    {/* Задняя сторона */}
                                    <div className={`w-full h-full rotate-y-180 ${isFlipped ? 'delayed-block' : 'delayed-hidden'}`}>
                                        <div className='w-full h-[60px] rounded-[8px] bg-white/10'></div>
                                        <p className='font-semibold text-[30px] mt-2'>{data.userName}</p>
                                        <div className="flex m-auto"></div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
                <div className="flex gap-2 mb-1">
                    <div className={`w-3 h-3 rounded-full transition-all ${current === 0 ? 'bg-black' : 'bg-gray-300'}`}></div>
                    <div className={`w-3 h-3 rounded-full transition-all ${current === 1 ? 'bg-black' : 'bg-gray-300'}`}></div>
                </div>
            </div>
        </div>
    )
}