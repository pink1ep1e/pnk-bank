'use client';

import { Application } from "@prisma/client";
import React, { useEffect, useState, useRef } from "react"
import { Title } from "../title";
import { ApplicationItem } from "../application-item";
import { AlertTriangle, AudioLines, Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface Props {
    initialApplications: Application[];
}

export const ApplicationDashboard: React.FC<Props> = ({ initialApplications }) => {
    const [applications, setApplications] = useState<Application[]>(initialApplications);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const savedSoundEnabled = localStorage.getItem('soundEnabled');
        if (savedSoundEnabled === 'true') {
            setSoundEnabled(true);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('soundEnabled', soundEnabled.toString());
    }, [soundEnabled]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch('/api/applications');
                const data = await response.json();
                
                // Проверяем, что данные являются массивом
                if (Array.isArray(data)) {
                    if (data.length > applications.length && soundEnabled) {
                        audioRef.current?.play().catch(error => {
                            console.error('Failed to play sound:', error);
                        });
                    }
                    setApplications(data);
                } else {
                    console.error('Expected an array but got:', data);
                }
            } catch (error) {
                console.error('Failed to fetch applications:', error);
            }
        };

        const interval = setInterval(fetchApplications, 15000);
        return () => clearInterval(interval);
    }, [applications, soundEnabled]);

    return (
        <div className="shadow-md border-primary bg-white rounded-[20px] border border-slate-200 w-full h-fit pt-[20px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[30px] lg:pb-[30px] lg:pr-[45px] lg:pl-[45px]">        
            <div className="flex">
                <div className="flex flex-col justify-start items-start">
                    <Title className="font-extrabold" text="Заявки на создание личного кабинета" size='md'/>
                    <p className="font-regular text-start text-sm sm:text-base lg:text-lg">Заявки на создание счета.</p>
                </div>
                {!soundEnabled && (
                    <div className="mt-2 flex justify-end items-center ml-auto">
                        <Button className="px-8 py-4 text-[18px]" onClick={() => setSoundEnabled(true)}>
                            Разрешить звук <Bell className="h-[50px] w-[50px]"/>
                        </Button>
                    </div>
                )}
                {soundEnabled && (
                    <div className="mt-2 flex justify-end items-center ml-auto gap-2">
                        <AudioLines />
                        <p className="text-[20px]">Звук разрешен</p>
                    </div>
                )}
            </div>
            <div className="text-[18px] mt-2">
                <ScrollArea className="h-[500px] pr-3">
                    {
                        applications.length === 0 ? (
                            <div className="flex justify-center items-center mt-4">
                                <div className="justify-center items-center text-center">
                                    <p className="text-[#434C55] text-[16px] font-medium">
                                        К сожалению, на данный момент нет активных заявок на создание личного кабинета.
                                    </p>
                                    <AlertTriangle className="m-auto" color="#434C55" size={128}/>
                                </div>
                            </div>
                        ) : (
                        Array.isArray(applications) && applications
                            .sort((a, b) => {
                                if (a.STATUS === 'WAITING' && b.STATUS !== 'WAITING') return -1;
                                if (b.STATUS === 'WAITING' && a.STATUS !== 'WAITING') return 1;
                                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                            })
                            .map((item) => (
                            <ApplicationItem 
                                key={item.id}
                                id={item.id}
                                userName={item.userName}
                                telegram={item.telegram}
                                discord={item.discord}
                                status={item.STATUS}
                                createdAt={item.createdAt}
                            />
                        )))
                    }
                </ScrollArea>
            </div>
            <audio ref={audioRef} src="/sounds/notification.mp3" preload="auto" />
        </div>
    )
}