'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    name: string;
    lvl: number;
    xp: number;
    userLvl: number;
    userXp: number;
    className?: string;
    isActive?: boolean;
}

export const LvlItem: React.FC<Props> = ({ 
    name,
    lvl,
    xp,
    userLvl,  
    userXp,
    isActive,
    className 
}) => {

    const xpProgress = Math.round((userXp / xp) * 100);

    return (
            <div className={cn("flex flex-col w-[350px]", className)} data-lvl={lvl}>
                {
                    userLvl == lvl && isActive && (
                        <div className='w-[100xp] m-auto'>
                            <div className="flex justify-center items-center mb-2 p-1 pr-12 pl-12 bg-black w-[100xp] rounded-[12px]">
                                <h1 className="font-bold text-[16px] text-white">Текущий уровень</h1>
                            </div>
                        </div>
                    )
                }
                {
                        lvl <= 9 && (
                <div className="border border-primary bg-white rounded-[20px] border-black w-full pt-[15px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[15px] lg:pb-[15px] lg:pr-[25px] lg:pl-[25px] relative">
                    {
                        userLvl > lvl && (
                            <div className="absolute inset-0 bg-black/40 rounded-[20px] flex flex-col justify-center items-center">
                                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 4px black)' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <p className="font-bold text-white text-[22px] mt-1" style={{ textShadow: '0 0 4px black' }}>Уровень пройден</p>
                            </div>
                        )
                    }
                    {       
                        userLvl < lvl && (
                            <div className="absolute inset-0 bg-black/40 rounded-[20px] flex flex-col justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ filter: 'drop-shadow(0 0 2px black)' }} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-16 h-16 text-white lucide lucide-lock-icon lucide-lock">
                                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                    </svg>
                                    <p className="font-bold text-white text-[22px] mt-1" style={{ textShadow: '0 0 4px black' }}>Уровень не открыт</p>
                            </div>
                        )
                    }
                    
                    <div className="flex items-center justify-start">
                        <h1 className="font-bold text-[25px]">{name}</h1>
                        <h1 className="font-bold text-[25px] ml-auto">LVL {lvl}</h1>
                    </div>
                    
                    <h1 className="font-semibold text-[18px] mt-2">Прогресс уровня:</h1>
                    <div className="mt-3 mb-3">
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">
                                {
                                    userLvl > lvl && xp
                                }
                                {
                                    userLvl < lvl && '0'
                                }
                                {
                                    userLvl == lvl && userXp
                                }
                                /
                                {
                                    userLvl > lvl && xp
                                }
                                {
                                    userLvl < lvl && '?'
                                }
                                {
                                    userLvl == lvl && xp
                                }
                                 XP</span>
                            <span className="text-sm font-medium">
                                {
                                userLvl == lvl && xpProgress
                                }
                                {
                                    userLvl > lvl && '100'
                                }
                                {
                                    userLvl < lvl && '0'
                                }
                                %</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-black h-2.5 rounded-full" style={{ width: `${
                                userLvl > lvl ? '100' :
                                userLvl < lvl ? '0' :
                                xpProgress
                            }%` }}></div>
                        </div>
                        {
                            userLvl >= lvl &&
                            <p className="text-xs text-gray-500 mt-2">Наберите {xp} XP для перехода на следующий уровень</p>
                        }
                        {
                            userLvl < lvl &&
                            <p className="text-xs text-gray-500 mt-2">Пройдите предыдущий уровень для перехода на этот уровень</p>
                        }
                    </div>
                </div>
                )}
                {
                    lvl >= 10 && lvl <= 14 && (
                        <div className="border border-primary bg-white rounded-[20px] border-yellow-600 w-full pt-[15px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[15px] lg:pb-[15px] lg:pr-[25px] lg:pl-[25px] relative">
                            {
                                userLvl > lvl && (
                                    <div className="absolute inset-0 bg-black/40 rounded-[20px] flex flex-col justify-center items-center">
                                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 4px black)' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="font-bold text-white text-[22px] mt-1" style={{ textShadow: '0 0 4px black' }}>Уровень пройден</p>
                                    </div>
                                )
                            }

                            {       
                                userLvl < lvl && (
                                    <div className="absolute inset-0 bg-black/40 rounded-[20px] flex flex-col justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ filter: 'drop-shadow(0 0 2px black)' }} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-16 h-16 text-white lucide lucide-lock-icon lucide-lock">
                                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                            </svg>
                                            <p className="font-bold text-white text-[22px] mt-1" style={{ textShadow: '0 0 4px black' }}>Уровень не открыт</p>
                                    </div>
                                )
                            }
                            
                            <div className="flex items-center justify-start">
                                <h1 className="font-bold text-[25px]">{name}</h1>
                                <h1 className="font-bold text-[25px] ml-auto">LVL {lvl}</h1>
                            </div>
                            
                            <h1 className="font-semibold text-[18px] mt-2">Прогресс уровня:</h1>
                            <div className="mt-3 mb-3">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">
                                        {
                                            userLvl > lvl && xp
                                        }
                                        {
                                            userLvl < lvl && '0'
                                        }
                                        {
                                            userLvl == lvl && userXp
                                        }
                                        /
                                        {
                                            userLvl > lvl && xp
                                        }
                                        {
                                            userLvl < lvl && '?'
                                        }
                                        {
                                            userLvl == lvl && xp
                                        }
                                        XP</span>
                                    <span className="text-sm font-medium">
                                        {
                                        userLvl == lvl && xpProgress
                                        }
                                        {
                                            userLvl > lvl && '100'
                                        }
                                        {
                                            userLvl < lvl && '0'
                                        }
                                        %</span>
                                </div>
                                <div className="w-full bg-yellow-50 rounded-full h-2.5">
                                    <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: `${
                                        userLvl > lvl ? '100' :
                                        userLvl < lvl ? '0' :
                                        xpProgress
                                    }%` }}></div>
                                </div>
                                {
                                    userLvl >= lvl &&
                                    <p className="text-xs text-gray-500 mt-2">Наберите {xp} XP для перехода на следующий уровень</p>
                                }
                                {
                                    userLvl < lvl &&
                                    <p className="text-xs text-gray-500 mt-2">Пройдите предыдущий уровень для перехода на этот уровень</p>
                                }
                            </div>
                        </div>
                    )
                }
                {
                    lvl >= 15 && lvl <= 19 && (
                        <div className="border border-primary bg-white rounded-[20px] border-blue-500 w-full pt-[15px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[15px] lg:pb-[15px] lg:pr-[25px] lg:pl-[25px] relative">
                            {
                                userLvl > lvl && (
                                    <div className="absolute inset-0 bg-black/40 rounded-[20px] flex flex-col justify-center items-center">
                                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 4px black)' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="font-bold text-white text-[22px] mt-1" style={{ textShadow: '0 0 4px black' }}>Уровень пройден</p>
                                    </div>
                                )
                            }
                            {       
                                userLvl < lvl && (
                                    <div className="absolute inset-0 bg-black/40 rounded-[20px] flex flex-col justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ filter: 'drop-shadow(0 0 2px black)' }} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-16 h-16 text-white lucide lucide-lock-icon lucide-lock">
                                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                            </svg>
                                            <p className="font-bold text-white text-[22px] mt-1" style={{ textShadow: '0 0 4px black' }}>Уровень не открыт</p>
                                    </div>
                                )
                            }
                            
                            <div className="flex items-center justify-start">
                                <h1 className="font-bold text-[25px]">{name}</h1>
                                <h1 className="font-bold text-[25px] ml-auto">LVL {lvl}</h1>
                            </div>
                            
                            <h1 className="font-semibold text-[18px] mt-2">Прогресс уровня:</h1>
                            <div className="mt-3 mb-3">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">
                                        {
                                            userLvl > lvl && xp
                                        }
                                        {
                                            userLvl < lvl && '0'
                                        }
                                        {
                                            userLvl == lvl && userXp
                                        }
                                        /
                                        {
                                            userLvl > lvl && xp
                                        }
                                        {
                                            userLvl < lvl && '?'
                                        }
                                        {
                                            userLvl == lvl && xp
                                        }
                                        XP</span>
                                    <span className="text-sm font-medium">
                                        {
                                        userLvl == lvl && xpProgress
                                        }
                                        {
                                            userLvl > lvl && '100'
                                        }
                                        {
                                            userLvl < lvl && '0'
                                        }
                                        %</span>
                                </div>
                                <div className="w-full bg-cyan-50 rounded-full h-2.5">
                                    <div className="bg-cyan-600 h-2.5 rounded-full" style={{ width: `${
                                        userLvl > lvl ? '100' :
                                        userLvl < lvl ? '0' :
                                        xpProgress
                                    }%` }}></div>
                                </div>
                                {
                                    userLvl >= lvl &&
                                    <p className="text-xs text-gray-500 mt-2">Наберите {xp} XP для перехода на следующий уровень</p>
                                }
                                {
                                    userLvl < lvl &&
                                    <p className="text-xs text-gray-500 mt-2">Пройдите предыдущий уровень для перехода на этот уровень</p>
                                }
                            </div>
                        </div>
                    )
                }
                {
                    lvl >= 20 && lvl <= 24 && (
                        <div className="border border-primary bg-white rounded-[20px] border-violet-600 w-full pt-[15px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[15px] lg:pb-[15px] lg:pr-[25px] lg:pl-[25px] relative">
                            {
                                userLvl > lvl && (
                                    <div className="absolute inset-0 bg-black/40 rounded-[20px] flex flex-col justify-center items-center">
                                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 4px black)' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="font-bold text-white text-[22px] mt-1" style={{ textShadow: '0 0 4px black' }}>Уровень пройден</p>
                                    </div>
                                )
                            }
                            {       
                                userLvl < lvl && (
                                    <div className="absolute inset-0 bg-black/40 rounded-[20px] flex flex-col justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ filter: 'drop-shadow(0 0 2px black)' }} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-16 h-16 text-white lucide lucide-lock-icon lucide-lock">
                                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                            </svg>
                                            <p className="font-bold text-white text-[22px] mt-1" style={{ textShadow: '0 0 4px black' }}>Уровень не открыт</p>
                                    </div>
                                )
                            }
                            
                            <div className="flex items-center justify-start">
                                <h1 className="font-bold text-[25px]">{name}</h1>
                                <h1 className="font-bold text-[25px] ml-auto">LVL {lvl}</h1>
                            </div>
                            
                            <h1 className="font-semibold text-[18px] mt-2">Прогресс уровня:</h1>
                            <div className="mt-3 mb-3">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">
                                        {
                                            userLvl > lvl && xp
                                        }
                                        {
                                            userLvl < lvl && '0'
                                        }
                                        {
                                            userLvl == lvl && userXp
                                        }
                                        /
                                        {
                                            userLvl > lvl && xp
                                        }
                                        {
                                            userLvl < lvl && '?'
                                        }
                                        {
                                            userLvl == lvl && xp
                                        }
                                        XP</span>
                                    <span className="text-sm font-medium">
                                        {
                                        userLvl == lvl && xpProgress
                                        }
                                        {
                                            userLvl > lvl && '100'
                                        }
                                        {
                                            userLvl < lvl && '0'
                                        }
                                        %</span>
                                </div>
                                <div className="w-full bg-violet-50 rounded-full h-2.5">
                                    <div className="bg-violet-600 h-2.5 rounded-full" style={{ width: `${
                                        userLvl > lvl ? '100' :
                                        userLvl < lvl ? '0' :
                                        xpProgress
                                    }%` }}></div>
                                </div>
                                {
                                    userLvl >= lvl &&
                                    <p className="text-xs text-gray-500 mt-2">Наберите {xp} XP для перехода на следующий уровень</p>
                                }
                                {
                                    userLvl < lvl &&
                                    <p className="text-xs text-gray-500 mt-2">Пройдите предыдущий уровень для перехода на этот уровень</p>
                                }
                            </div>
                        </div>
                    )
                }
                {
                    lvl >= 25 && lvl <= 29 && (
                        <div className="border border-primary bg-white rounded-[20px] border-red-600 w-full pt-[15px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[15px] lg:pb-[15px] lg:pr-[25px] lg:pl-[25px] relative">
                            {
                                userLvl > lvl && (
                                    <div className="absolute inset-0 bg-black/40 rounded-[20px] flex flex-col justify-center items-center">
                                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 4px black)' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="font-bold text-white text-[22px] mt-1" style={{ textShadow: '0 0 4px black' }}>Уровень пройден</p>
                                    </div>
                                )
                            }
                            {       
                                userLvl < lvl && (
                                    <div className="absolute inset-0 bg-black/40 rounded-[20px] flex flex-col justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ filter: 'drop-shadow(0 0 2px black)' }} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-16 h-16 text-white lucide lucide-lock-icon lucide-lock">
                                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                            </svg>
                                            <p className="font-bold text-white text-[22px] mt-1" style={{ textShadow: '0 0 4px black' }}>Уровень не открыт</p>
                                    </div>
                                )
                            }
                            
                            <div className="flex items-center justify-start">
                                <h1 className="font-bold text-[25px]">{name}</h1>
                                <h1 className="font-bold text-[25px] ml-auto">LVL {lvl}</h1>
                            </div>
                            
                            <h1 className="font-semibold text-[18px] mt-2">Прогресс уровня:</h1>
                            <div className="mt-3 mb-3">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">
                                        {
                                            userLvl > lvl && xp
                                        }
                                        {
                                            userLvl < lvl && '0'
                                        }
                                        {
                                            userLvl == lvl && userXp
                                        }
                                        /
                                        {
                                            userLvl > lvl && xp
                                        }
                                        {
                                            userLvl < lvl && '?'
                                        }
                                        {
                                            userLvl == lvl && xp
                                        }
                                        XP</span>
                                    <span className="text-sm font-medium">
                                        {
                                        userLvl == lvl && xpProgress
                                        }
                                        {
                                            userLvl > lvl && '100'
                                        }
                                        {
                                            userLvl < lvl && '0'
                                        }
                                        %</span>
                                </div>
                                <div className="w-full bg-red-50 rounded-full h-2.5">
                                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${
                                        userLvl > lvl ? '100' :
                                        userLvl < lvl ? '0' :
                                        xpProgress
                                    }%` }}></div>
                                </div>
                                {
                                    userLvl >= lvl &&
                                    <p className="text-xs text-gray-500 mt-2">Наберите {xp} XP для перехода на следующий уровень</p>
                                }
                                {
                                    userLvl < lvl &&
                                    <p className="text-xs text-gray-500 mt-2">Пройдите предыдущий уровень для перехода на этот уровень</p>
                                }
                            </div>
                        </div>
                    )
                }
                {
                    lvl == 30 && (
                        <div className="border-2 border-primary bg-white rounded-[20px] border-red-600 w-full pt-[15px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[15px] lg:pb-[15px] lg:pr-[25px] lg:pl-[25px] relative">
                            {
                                userLvl > lvl && (
                                    <div className="absolute inset-0 bg-black/40 rounded-[20px] flex flex-col justify-center items-center">
                                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 4px black)' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="font-bold text-white text-[22px] mt-1" style={{ textShadow: '0 0 4px black' }}>Уровень пройден</p>
                                    </div>
                                )
                            }
                            {       
                                userLvl < lvl && (
                                    <div className="absolute inset-0 bg-black/40 rounded-[20px] flex flex-col justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ filter: 'drop-shadow(0 0 2px black)' }} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-16 h-16 text-white lucide lucide-lock-icon lucide-lock">
                                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                            </svg>
                                            <p className="font-bold text-white text-[22px] mt-1" style={{ textShadow: '0 0 4px black' }}>Уровень не открыт</p>
                                    </div>
                                )
                            }
                            
                            <div className="flex items-center justify-start">
                                <h1 className="font-bold text-[25px]">{name}</h1>
                                <h1 className="font-bold text-[25px] ml-auto">LVL {lvl}</h1>
                            </div>
                            
                            <h1 className="font-semibold text-[18px] mt-2">Прогресс уровня:</h1>
                            <div className="mt-3 mb-3">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">
                                        {
                                            userLvl > lvl && xp
                                        }
                                        {
                                            userLvl < lvl && '0'
                                        }
                                        {
                                            userLvl == lvl && userXp
                                        }
                                        /
                                        {
                                            userLvl > lvl && xp
                                        }
                                        {
                                            userLvl < lvl && '?'
                                        }
                                        {
                                            userLvl == lvl && xp
                                        }
                                        XP</span>
                                    <span className="text-sm font-medium">
                                        {
                                        userLvl == lvl && xpProgress
                                        }
                                        {
                                            userLvl > lvl && '100'
                                        }
                                        {
                                            userLvl < lvl && '0'
                                        }
                                        %</span>
                                </div>
                                <div className="w-full bg-red-50 rounded-full h-2.5">
                                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${
                                        userLvl > lvl ? '100' :
                                        userLvl < lvl ? '0' :
                                        xpProgress
                                    }%` }}></div>
                                </div>
                                {
                                    userLvl >= lvl &&
                                    <p className="text-xs text-gray-500 mt-2">Наберите {xp} XP для перехода на следующий уровень</p>
                                }
                                {
                                    userLvl < lvl &&
                                    <p className="text-xs text-gray-500 mt-2">Пройдите предыдущий уровень для перехода на этот уровень</p>
                                }
                            </div>
                        </div>
                    )
                }
                {
                    lvl == 31 && (
                        <div className="border-2 border-primary bg-white rounded-[20px] border-violet-600 w-full pt-[15px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[15px] lg:pb-[15px] lg:pr-[25px] lg:pl-[25px] relative">
                            {
                                userLvl > lvl && (
                                    <div className="absolute inset-0 bg-black/40 rounded-[20px] flex flex-col justify-center items-center">
                                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 4px black)' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="font-bold text-white text-[22px] mt-1" style={{ textShadow: '0 0 4px black' }}>Уровень пройден</p>
                                    </div>
                                )
                            }
                            {       
                                userLvl < lvl && (
                                    <div className="absolute inset-0 bg-black/40 rounded-[20px] flex flex-col justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ filter: 'drop-shadow(0 0 2px black)' }} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-16 h-16 text-white lucide lucide-lock-icon lucide-lock">
                                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                            </svg>
                                            <p className="font-bold text-white text-[22px] mt-1" style={{ textShadow: '0 0 4px black' }}>Уровень не открыт</p>
                                    </div>
                                )
                            }
                            
                            <div className="flex items-center justify-start">
                                <h1 className="font-bold text-[25px]">{name}</h1>
                                <h1 className="font-bold text-[25px] ml-auto">LVL {lvl}</h1>
                            </div>
                            
                            <h1 className="font-semibold text-[18px] mt-2">Прогресс уровня:</h1>
                            <div className="mt-3 mb-3">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">
                                        {
                                            userLvl > lvl && xp
                                        }
                                        {
                                            userLvl < lvl && '0'
                                        }
                                        {
                                            userLvl == lvl && userXp
                                        }
                                        /
                                        {
                                            userLvl > lvl && xp
                                        }
                                        {
                                            userLvl < lvl && '?'
                                        }
                                        {
                                            userLvl == lvl && xp
                                        }
                                        XP</span>
                                    <span className="text-sm font-medium">
                                        {
                                        userLvl == lvl && xpProgress
                                        }
                                        {
                                            userLvl > lvl && '100'
                                        }
                                        {
                                            userLvl < lvl && '0'
                                        }
                                        %</span>
                                </div>
                                <div className="w-full bg-violet-50 rounded-full h-2.5">
                                    <div className="bg-violet-600 h-2.5 rounded-full" style={{ width: `${
                                        userLvl > lvl ? '100' :
                                        userLvl < lvl ? '0' :
                                        xpProgress
                                    }%` }}></div>
                                </div>
                                {
                                    userLvl >= lvl &&
                                    <p className="text-xs text-gray-500 mt-2">Наберите {xp} XP для перехода на следующий уровень</p>
                                }
                                {
                                    userLvl < lvl &&
                                    <p className="text-xs text-gray-500 mt-2">Пройдите предыдущий уровень для перехода на этот уровень</p>
                                }
                            </div>
                        </div>
                    )
                }
                {
                    lvl == 32 && (
                        <div className="border-2 border-primary bg-white rounded-[20px] w-full pt-[15px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[15px] lg:pb-[15px] lg:pr-[25px] lg:pl-[25px] relative" style={{
                            borderImage: 'linear-gradient(to right, red, orange, purple) 1',
                            borderRadius: '20px',
                            borderImageSlice: 1
                        }}>
                            {
                                userLvl > lvl && (
                                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center">
                                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 4px black)' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <p className="font-bold text-white text-[22px] mt-1" style={{ textShadow: '0 0 4px black' }}>Уровень пройден</p>
                                    </div>
                                )
                            }
                            {       
                                userLvl < lvl && (
                                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ filter: 'drop-shadow(0 0 2px black)' }} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-16 h-16 text-white lucide lucide-lock-icon lucide-lock">
                                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                            </svg>
                                            <p className="font-bold text-white text-[22px] mt-1" style={{ textShadow: '0 0 4px black' }}>Уровень не открыт</p>
                                    </div>
                                )
                            }
                            
                            <div className="flex items-center justify-start">
                                <h1 className="font-bold text-[25px]">{name}</h1>
                                <h1 className="font-bold text-[25px] ml-auto">LVL {lvl}</h1>
                            </div>
                            
                            <h1 className="font-semibold text-[18px] mt-2">Прогресс уровня:</h1>
                            <div className="mt-3 mb-3">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">
                                        {
                                            userLvl > lvl && xp
                                        }
                                        {
                                            userLvl < lvl && '0'
                                        }
                                        {
                                            userLvl == lvl && userXp
                                        }
                                        /
                                        {
                                            userLvl > lvl && xp
                                        }
                                        {
                                            userLvl < lvl && '?'
                                        }
                                        {
                                            userLvl == lvl && xp
                                        }
                                        XP</span>
                                    <span className="text-sm font-medium">
                                        {
                                        userLvl == lvl && xpProgress
                                        }
                                        {
                                            userLvl > lvl && '100'
                                        }
                                        {
                                            userLvl < lvl && '0'
                                        }
                                        %</span>
                                </div>
                                <div className="w-full bg-blue-50 rounded-full h-2.5">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${
                                        userLvl > lvl ? '100' :
                                        userLvl < lvl ? '0' :
                                        xpProgress
                                    }%` }}></div>
                                </div>
                                {
                                    userLvl >= lvl &&
                                    <p className="text-xs text-gray-500 mt-2">Наберите {xp} XP для перехода на следующий уровень</p>
                                }
                                {
                                    userLvl < lvl &&
                                    <p className="text-xs text-gray-500 mt-2">Пройдите предыдущий уровень для перехода на этот уровень</p>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
    )
}