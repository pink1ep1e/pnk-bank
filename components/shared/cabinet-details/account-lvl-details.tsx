'use client';

import React from "react"
import { cn } from "@/lib/utils";
import { Title } from "../title";
import { User, Level } from "@prisma/client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LvlItem } from "../lvl-item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";
import Image from 'next/image';

interface UserTopLvl {
  userName: string;
  lvl: number | null;
  xp: number | null;
}

interface Props {
  user: User;
  level: Level[];
  userTopLvl: UserTopLvl[];
  className?: string;
}

export const AccountLvlDetails: React.FC<Props> = ({ user, level, userTopLvl, className }) => {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)

    const handleReturnToCurrentLevel = () => {
        if (!api) return
        const userLevelIndex = level.findIndex(l => l.lvl === user.lvl) - 1
        if (userLevelIndex !== -1) {
            api.scrollTo(userLevelIndex)
        }
    }

    React.useEffect(() => {
        if (!api) return

        const userLevelIndex = level.findIndex(l => l.lvl === user.lvl) - 1
        if (userLevelIndex !== -1) {
            api.scrollTo(userLevelIndex)
        }

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api, level, user.lvl])

    return (
        <>  
        <Link href="/cabinet">
              <div className='mt-8 mr-12 top-0 right-0 fixed z-[9999] bg-black p-3 rounded-[12px]'>
                  <ArrowLeft className='text-white' />
              </div>
        </Link>
        <div className={cn("flex justify-center items-center flex-col bg-white w-full pt-[20px] pb-[20px] pr-[0px] pl-[0px] lg:pt-[30px] lg:pb-[30px] lg:pr-[20px] lg:pl-[50px]", className)}>
            <div className="mb-10 flex justify-start items-center flex-col">
                <Title className="font-extrabold text-[25px]" text="Уровень счёта" size='lg'/>
                <p className="text-gray-600 text-[20px]">
                    Добавьте больше информации о себе
                    <br/>и откройте все возможности pnk Банка
                </p>
                <Button
                    className="bg-black p-1.5 font-semibold w-[300px] text-[16px] text-center mt-2 rounded-[12px]"
                    onClick={handleReturnToCurrentLevel}
                >
                    Вернуться к текущему уровню
                </Button>
            </div>

            <div className="w-full mx-auto">
                <Carousel setApi={setApi}>
                    <CarouselContent className="select-none mt-4">
                        {level.map((item, index) => (
                            <CarouselItem 
                                key={index} 
                                className={cn(
                                    "basis-1/3.5 transition-all duration-300 cursor-pointer",
                                    index === current + 1 ? "transform -translate-y-4" : ""
                                )}
                            >
                                <div onClick={() => api?.scrollTo(index - 1)}>
                                    <LvlItem 
                                        name={item.name}
                                        lvl={item.lvl}
                                        xp={item.xp}
                                        userLvl={user.lvl || 0}
                                        userXp={user.xp || 0}
                                        isActive={item.lvl === user.lvl}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* <CarouselPrevious className="absolute left-4 top-1/2 text-white bg-black p-3 rounded-[12px] text-[20px] h-[220px] w-[600px] transition-colors opacity-0 hover:opacity-0" />
                    <CarouselNext className="absolute right-4 top-1/2 text-white bg-black p-3 rounded-[12px] text-[20px] h-[50px] w-[50px] transition-colors" /> */}
                </Carousel>
            </div>
            <div className="flex mt-12 flex-col lg:flex-row gap-0 lg:gap-20">
                <div className="mb-12 flex justify-start items-center flex-col mt-6 w-[500px]">
                    <Title className="font-extrabold text-[25px]" text="Как получать XP" size='lg'/>
                    <p className="text-gray-600 text-[20px] text-center">
                        Существуют множество способов получения уровня
                        и вот все которые есть на данный момент
                    </p>
                    
                    <div className="mt-6 space-y-3 w-full p-2 md:p-0">
                        <div className="flex items-center cursor-pointer hover:bg-gray-100 p-3 py-3.5 px-6 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="p-1.5 bg-black rounded-[12px] mr-3">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-[18px] md:text-[20px]">Создание аккаунта</p>
                                <p className="text-gray-600 text-[14px] md:text-[15px]">Получите 50 XP за регистрацию в системе</p>
                            </div>
                            <span className="font-bold text-[18px] md:text-[22px]">+50 XP</span>
                        </div>
                        
                        <div className="flex items-center cursor-pointer hover:bg-gray-100 p-3 py-3.5 px-6 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="p-2 bg-black rounded-[12px] mr-3">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-[20px]">Заполнение код-слова</p>
                                <p className="text-[15px] text-gray-600">Придумайте код-слово для поддержки</p>
                            </div>
                            <span className="font-bold text-[22px]">+75 XP</span>
                        </div>
                        
                        <div className="flex items-center cursor-pointer hover:bg-gray-100 p-3 py-3.5 px-6 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="p-2 bg-black rounded-[12px] mr-3">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-[20px]">Совершайте перводы</p>
                                <p className="text-[15px] text-gray-600">За каждый перевод получайте XP</p>
                            </div>
                            <span className="font-bold text-[22px]">+25 XP</span>
                        </div>
                        
                        <div className="flex items-center cursor-pointer hover:bg-gray-100 p-3 py-3.5 px-6 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="p-2 bg-black rounded-[12px] mr-3">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-[20px]">Регулярная активность</p>
                                <p className="text-[15px] text-gray-600">Заходите в банк каждый день</p>
                            </div>
                            <span className="font-bold text-[22px]">+100 XP / день</span>
                        </div>
                        
                        <div className="flex items-center cursor-pointer hover:bg-gray-100 p-3 py-3.5 px-6 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="p-2 bg-black rounded-[12px] mr-3">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-[20px]">Активности банка</p>
                                <p className="text-[15px] text-gray-600">Учавствуйте в активностях и получайте призы</p>
                            </div>
                            <span className="font-bold text-[22px]">+150 XP</span>
                        </div>
                    </div>
                </div>

                <div className="mb-12 flex justify-start items-center flex-col mt-6 w-[500px]">
                    <Title className="font-extrabold text-[25px]" text="Топы по уровням" size='lg'/>
                    <p className="text-gray-600 text-[20px] text-center">
                        Соревнуйтесь с другими пользователями и поднимайтесь
                        в рейтинге
                    </p>
                    
                    <div className="mt-6 space-y-3 w-full rounded-[20px]">
                        {userTopLvl
                            .sort((a, b) => (b.lvl || 0) - (a.lvl || 0) || (b.xp || 0) - (a.xp || 0))
                            .slice(0, 5)
                            .map((data, index) => (
                                <div key={data.userName} className={cn(
                                    "flex items-center cursor-pointer py-2 bg-gray-50 border hover:bg-gray-100 px-4 rounded-[20px]",
                                    index === 0 && "border-red-400 border-2 bg-red-50 hover:bg-red-100",
                                    index === 1 && "border-yellow-500 bg-yellow-50 hover:bg-yellow-100",
                                    index === 2 && "border-blue-500 bg-blue-50 hover:bg-blue-100",

                                )}>
                                    <div className="flex">
                                        <div className={cn(
                                            "flex items-center justify-center pt-1 rounded-[8px] h-8 w-8 -mr-6 -mt-2 z-10",
                                            index === 0 && "bg-red-400",
                                            index === 1 && "bg-yellow-300", 
                                            index === 2 && "bg-blue-700",
                                            index === 3 && "bg-black",
                                            index === 4 && "bg-black",
                                        )}>
                                            <p className="text-white font-bold text-[18px]">{index + 1}</p>
                                        </div>
                                        <Image 
                                            src={`https://minotar.net/avatar/${data.userName}`}
                                            alt="AVATAR ICON"
                                            width={50}
                                            height={50}
                                            className="rounded-[12px] mr-2"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-[25px]">{data.userName}</p>
                                        <p className="text-[18px] text-gray-600">lvl {data.lvl}</p>
                                    </div>
                                    <span className="font-bold text-[22px]">{data.xp} XP</span>
                                </div>
                            ))}
                            {userTopLvl
                            .sort((a, b) => (b.lvl || 0) - (a.lvl || 0) || (b.xp || 0) - (a.xp || 0))
                            .map((data, index) => (
                                data.userName === user.userName && (
                                    <div key={data.userName}>
                                        <h1 className="font-bold text-[25px]">Ваше текущее место: </h1>
                                        <div className={cn(
                                                "flex items-center cursor-pointer py-2 bg-green-50 border-2 hover:bg-green-100 border-green-400 px-4 rounded-[20px]"

                                            )}>
                                            <div className="flex">
                                                <div className={cn(
                                                    "flex items-center justify-center bg-green-500 pt-1 rounded-[8px] h-8 w-8 -mr-6 -mt-2 z-10")}>
                                                    <p className="text-white font-bold text-[18px]">{index + 1}</p>
                                                </div>
                                                <Image 
                                                    src={`https://minotar.net/avatar/${user.userName}`}
                                                    alt="AVATAR ICON"
                                                    width={50}
                                                    height={50}
                                                    className="rounded-[12px] mr-2"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-[25px]">{user.userName}</p>
                                                <p className="text-[18px] text-gray-600">lvl {user.lvl}</p>
                                            </div>
                                            <span className="font-bold text-[22px]">{user.xp} XP</span>
                                        </div>
                                    </div>
                                )
                            ))}
                            
                    </div>
                </div>  
            </div>

        </div>
        </>
    )
}