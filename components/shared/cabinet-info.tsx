'use client';

import { cn } from "@/lib/utils";
import React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Props {
    className?: string;
}


export const CabinetInfo: React.FC<Props> = ({ className }) => {
    return (
        <>
            <div className={cn("flex justify-center items-center mt-16", className)}>
                <Carousel className="w-full max-w-[1412px] relative">
                    <CarouselContent className="ml-1 md:ml-0">
                        <CarouselItem className="pr-4 pl-4 md:pr-24 md:pl-24 select-none cursor-pointer">
                            <div className="flex flex-col md:flex-row border rounded-[20px] border-black p-8 h-[720px] md:h-fit md:pr-12 md:pl-12 md:p-8">
                                <div className="flex flex-col w-full md:w-[600px] justify-center items-start">
                                    <p className="text-[24px] md:text-[36px] mt-2 font-bold">Последние операции</p>
                                    <p className="text-[16px] md:text-[25px] mt-2">
                                        Отслеживайте свои последние операции с легкостью! В pnk Банке вы всегда можете видеть, куда и когда были потрачены ваши средства. 
                                        <br/><br/>Контролируйте свои расходы, планируйте бюджет и наслаждайтесь прозрачностью банковских операций. 
                                        С pnk Банком ваши финансы — под полным контролем!
                                    </p>
                                </div>
                                <div className="w-full md:w-[512px] mt-4 md:mt-0">
                                    <Image 
                                        src="/last-operation-banner.png"
                                        alt="TRANSACTION IMAGE"
                                        width={512}
                                        height={512}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem className="pr-4 pl-4 md:pr-24 md:pl-24 select-none cursor-pointer">
                            <div className="flex flex-col md:flex-row border rounded-[20px] border-black p-8 h-[720px] md:h-fit md:pr-12 md:pl-12 md:p-8">
                                <div className="flex flex-col w-full md:w-[600px] justify-center items-start">
                                    <p className="text-[24px] md:text-[36px] mt-2 font-bold">Переводы</p>
                                    <p className="text-[16px] md:text-[25px] mt-2">
                                        Переводы средств другим пользователям по нику — это просто и удобно! Просто введите ник получателя, и деньги мгновенно отправятся на его счет. 
                                        <br/><br/>Это быстро, безопасно и доступно 24/7. С pnk Банком вы можете легко переводить средства друзьям или партнерам в любое время и в любом месте. 
                                        Удобство и скорость — вот что делает наши переводы лучшими!
                                    </p>
                                </div>
                                <div className="w-full md:w-[512px] mt-4 md:mt-0">
                                    <Image 
                                        src="/transaction-banner.png"
                                        alt="TRANSACTION IMAGE"
                                        width={512}
                                        height={512}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem className="pr-4 pl-4 md:pr-24 md:pl-24 select-none cursor-pointer">
                            <div className="flex flex-col md:flex-row border rounded-[20px] border-black h-[720px] md:h-fit p-8 md:pr-12 md:pl-12 md:p-8 ">
                                <div className="flex flex-col w-full md:w-[600px] justify-center items-start">
                                    <p className="text-[24px] md:text-[36px] mt-2 font-bold">Управление аккаунтом</p>
                                    <p className="text-[16px] md:text-[25px] mt-2">
                                        Управление аккаунтом в pnk Банке — это просто и удобно! Вы можете легко сменить пароль, обновить кодовое слово или настроить другие параметры безопасности всего за несколько кликов. 
                                        <br/><br/>Наша система обеспечивает максимальную защиту ваших данных, при этом оставаясь интуитивно понятной.
                                        Удобство и надежность — вот что делает наше управление аккаунтом лучшим!
                                    </p>
                                </div>
                                <div className="w-full md:w-[512px] mt-4 md:mt-0">
                                    <Image 
                                        src="/account-banner.png"
                                        alt="TRANSACTION IMAGE"
                                        width={512}
                                        height={512}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 bg-black text-white hidden md:block" />
                    <CarouselNext className="absolute right-0 bg-black text-white hidden md:block" />
                </Carousel>
            </div>
        </>
    )
}

