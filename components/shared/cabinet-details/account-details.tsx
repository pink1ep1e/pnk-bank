'use client';

import { User, USER_STATUS } from "@prisma/client";
import React, { useState } from "react"
import { cn } from "@/lib/utils";
import { LogOut, ChevronRight, CircleHelp, AlertCircle, Rocket } from "lucide-react";
import { signOut } from "next-auth/react";
import { CodeWordDialog } from "../dialog/code-word-dialog";
import { ChangePasswordDialog } from "../dialog/change-password-dialog";
import { useRouter } from "next/navigation";
import { Title } from "../title";
import Image from 'next/image';

interface Props {
    data: User;
    className?: string;
}

export const AccountDetails: React.FC<Props> = ({ data, className }) => {
    const router = useRouter()
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setShowTooltip(true);
                setTimeout(() => setShowTooltip(false), 2000); // Скрыть плашку через 2 секунды
            })
            .catch(() => {
                alert('Не удалось скопировать текст');
            });
    };

    const handleTooltipPosition = (event: React.MouseEvent<HTMLParagraphElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltipPosition({
            top: rect.top - 40, // Позиционирование тултипа выше элемента
            left: rect.left + rect.width / 2 - 50, // Центрирование тултипа
        });
    };

    return (
        <>  
        <div className={cn("shadow-md border-primary bg-white border border-slate-200 rounded-[20px] w-full pt-[20px] pb-[20px] pr-[25px] pl-[25px] lg:pt-[35px] lg:pb-[40px] lg:pr-[45px] lg:pl-[45px]", className)}>
            <div className="flex justify-start items-center">
                <Title className="font-extrabold" text="Мой аккаунт" size='md'/>
            </div>
            <div className="flex mt-2">
                <Image 
                    src={`https://minotar.net/avatar/${data.userName}`}
                    alt="AVATAR ICON"
                    width={100}
                    height={100}
                    className="rounded-[20px]"
                />
                <div className="pl-4 w-full pt-[5px]">
                    <div className="flex gap-2">
                        <p 
                            className="text-[25px] font-medium cursor-pointer"
                            onClick={(e) => {
                                handleCopy(data.userName);
                                handleTooltipPosition(e);
                            }}
                        >
                            {data.userName}
                        </p>
                        {data.userStatus == USER_STATUS.ACTIVE ?
                        <Rocket className="pt-2" color="black" size={25}/> 
                        :
                        <AlertCircle className="pt-2" color="red" size={25}/>
                        }
                        <div className="flex items-center justify-center gap=2 ml-auto">
                            <h1 className="text-[25px] font-semibold">lvl {data.lvl}</h1>
                        </div>
                    </div>
                    {/* <Button onClick={() => signOut({redirect: true, callbackUrl: "/login"})}  className="py-2 w-full mt-1 text-[19px]">Выход <LogOut /></Button> */}
                    <div className="flex justify-center items-end w-full h-[45px]">
                        <div className="flex justify-center items-center w-full hover:border transition-all cursor-pointer gap-3 h-[45px] rounded-[18px] bg-gradient-to-r from-white to-primary/10">
                            <p className="font-semibold text-[18px] pt-1">Подписка</p>
                            <div className="bg-black text-white px-[14px] text-[18px] rounded-[16px]">
                                <p className="pt-1">Неактивна</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showTooltip && (
                <div 
                    style={{
                        position: 'absolute',
                        top: tooltipPosition.top,
                        left: tooltipPosition.left,
                        backgroundColor: 'black',
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        zIndex: 1000,
                    }}
                >
                    Скопировано
                    <div 
                        style={{
                            position: 'absolute',
                            bottom: '-4px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '4px solid transparent',
                            borderRight: '4px solid transparent',
                            borderTop: '4px solid black',
                        }}
                    ></div>
                </div>
            )}

            <div className="rounded-[20px] gap=4 bg-primary/5 p-[6px] lg:p-[10px] mt-4">
                <CodeWordDialog />
                <ChangePasswordDialog />
            </div>
            
            <div className="rounded-[20px] gap-4 bg-primary/5 p-[6px] lg:p-[10px] mt-4">
                <div onClick={() => router.push('https://t.me/pink1e_p1e')} className="flex cursor-pointer hover:bg-primary/5 rounded-[12px] p-2 justify-start items-center gap-3">
                    <div className="flex rounded-[16px] h-[55px] w-[55px] md:h-[60px] md:w-[60px] items-center justify-center border border-primary/30 bg-white p-3">
                        <CircleHelp className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]" />
                    </div>
                    <div className="items-center"> 
                        <p className="text-[18px] lg:text-[20px] text-left font-regular">Поддержка</p>
                        <p className="text-[14px] lg:text-[18px] text-left font-regular text-[#434C55]">Обращение в поддержку</p>
                    </div>
                    <div className="flex justify-end items-end ml-auto">
                        <ChevronRight className="pr-auto" size={20}/>
                    </div>
                </div>
                <div onClick={() => router.push('https://t.me/pnk_bank')} className="flex cursor-pointer hover:bg-primary/5 rounded-[12px] p-2 justify-start mt-1 items-center gap-3">
                    <div className="flex rounded-[16px] h-[55px] w-[55px] md:h-[60px] md:w-[60px] bg-white p-3 items-center border border-primary/30 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]" viewBox="0 0 30 30">
                        <path d="M 25.154297 3.984375 C 24.829241 3.998716 24.526384 4.0933979 24.259766 4.2011719 C 24.010014 4.3016357 23.055766 4.7109106 21.552734 5.3554688 C 20.048394 6.0005882 18.056479 6.855779 15.931641 7.7695312 C 11.681964 9.5970359 6.9042108 11.654169 4.4570312 12.707031 C 4.3650097 12.746607 4.0439208 12.849183 3.703125 13.115234 C 3.3623292 13.381286 3 13.932585 3 14.546875 C 3 15.042215 3.2360676 15.534319 3.5332031 15.828125 C 3.8303386 16.121931 4.144747 16.267067 4.4140625 16.376953 C 5.3912284 16.775666 8.4218473 18.015862 8.9941406 18.25 C 9.195546 18.866983 10.29249 22.222526 10.546875 23.044922 C 10.714568 23.587626 10.874198 23.927519 11.082031 24.197266 C 11.185948 24.332139 11.306743 24.45034 11.453125 24.542969 C 11.511635 24.579989 11.575789 24.608506 11.640625 24.634766 L 11.644531 24.636719 C 11.659471 24.642719 11.67235 24.652903 11.6875 24.658203 C 11.716082 24.668202 11.735202 24.669403 11.773438 24.677734 C 11.925762 24.726927 12.079549 24.757812 12.216797 24.757812 C 12.80196 24.757814 13.160156 24.435547 13.160156 24.435547 L 13.181641 24.419922 L 16.191406 21.816406 L 19.841797 25.269531 C 19.893193 25.342209 20.372542 26 21.429688 26 C 22.057386 26 22.555319 25.685026 22.875 25.349609 C 23.194681 25.014192 23.393848 24.661807 23.478516 24.21875 L 23.478516 24.216797 C 23.557706 23.798129 26.921875 6.5273437 26.921875 6.5273438 L 26.916016 6.5507812 C 27.014496 6.1012683 27.040303 5.6826405 26.931641 5.2695312 C 26.822973 4.8564222 26.536648 4.4608905 26.181641 4.2480469 C 25.826669 4.0352506 25.479353 3.9700339 25.154297 3.984375 z M 24.966797 6.0742188 C 24.961997 6.1034038 24.970391 6.0887279 24.962891 6.1230469 L 24.960938 6.1347656 L 24.958984 6.1464844 C 24.958984 6.1464844 21.636486 23.196371 21.513672 23.845703 C 21.522658 23.796665 21.481573 23.894167 21.439453 23.953125 C 21.379901 23.91208 21.257812 23.859375 21.257812 23.859375 L 21.238281 23.837891 L 16.251953 19.121094 L 12.726562 22.167969 L 13.775391 17.96875 C 13.775391 17.96875 20.331562 11.182109 20.726562 10.787109 C 21.044563 10.471109 21.111328 10.360953 21.111328 10.251953 C 21.111328 10.105953 21.035234 10 20.865234 10 C 20.712234 10 20.506484 10.14875 20.396484 10.21875 C 18.963383 11.132295 12.671823 14.799141 9.8515625 16.439453 C 9.4033769 16.256034 6.2896636 14.981472 5.234375 14.550781 C 5.242365 14.547281 5.2397349 14.548522 5.2480469 14.544922 C 7.6958673 13.491784 12.47163 11.434667 16.720703 9.6074219 C 18.84524 8.6937992 20.838669 7.8379587 22.341797 7.1933594 C 23.821781 6.5586849 24.850125 6.1218894 24.966797 6.0742188 z"></path>
                    </svg>
                    </div>
                    <div className="items-center"> 
                        <p className="text-[18px] lg:text-[20px] text-left font-regular">pnk Банк в Telegram</p>
                        <p className="text-[14px] lg:text-[18px] text-left font-regular text-[#434C55]">Новости и предложения</p>
                    </div>
                    <div className="flex justify-center items-center ml-auto">
                        <ChevronRight size={20}/>
                    </div>
                </div>
                <div onClick={() => signOut({redirect: true, callbackUrl: "/login"})} className="flex cursor-pointer hover:bg-primary/5 rounded-[12px] p-2 justify-start items-center gap-3">
                    <div className="flex rounded-[16px] h-[55px] w-[55px] md:h-[60px] md:w-[60px] items-center justify-center border border-primary/30 bg-white p-3">
                        <LogOut className="w-[25px] h-[25px] md:w-[29px] md:h-[29px]" />
                    </div>
                    <div className="items-center"> 
                        <p className="text-[18px] lg:text-[20px] text-left font-regular">Выход</p>
                        <p className="text-[14px] lg:text-[18px] text-left font-regular text-[#434C55]">Выход из аккаунта</p>
                    </div>
                    <div className="flex justify-end items-end ml-auto">
                        <ChevronRight className="pr-auto" size={20}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}