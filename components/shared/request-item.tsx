'use client';

import React, { useState, useEffect } from "react"
import Image from 'next/image';
import { Button } from "../ui/button";
import { OPERATION_METHOD, OPERATION_TYPE, REPLENISH_STATUS } from "@prisma/client";
import { Input } from "../ui/input";
import { CancelRequest, SuccessRequest, TakeRequest } from "@/app/actions";


interface Props {
    id: number;
    recipient: string;
    courier?: string;
    operationType: OPERATION_TYPE;
    operationMethod: OPERATION_METHOD;
    coordinates: string;
    amount: number;
    comment?: string;
    waitingTime?: Date;
    runTime?: number;
    createdAt: Date;
    status: REPLENISH_STATUS;
    className?: string;
}

export const RequestItem: React.FC<Props> = ({
    id, 
    recipient,
    courier,
    operationType,
    operationMethod,
    coordinates,
    amount,
    comment,
    waitingTime,
    runTime,
    createdAt,
    status
}) => {
    const [isLoading, setIsLoading] = useState(false); 
    const [showInput, setShowInput] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [isConfirmDisabled, setIsConfirmDisabled] = React.useState(true);
    const [remainingTime, setRemainingTime] = useState<string>('N/A'); 
    const [waitingDuration, setWaitingDuration] = useState<string>('N/A'); 

    useEffect(() => {
        if (waitingTime && runTime) {
            const interval = setInterval(() => {
                const waitingTimeInMs = new Date(waitingTime).getTime();
                const runTimeInMs = runTime * 60 * 1000;
                const totalTimeInMs = waitingTimeInMs + runTimeInMs;
                const remainingMs = totalTimeInMs - Date.now();

                if (remainingMs > 0) {
                    const minutes = Math.floor(remainingMs / (1000 * 60));
                    const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
                    setRemainingTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
                } else {
                    setRemainingTime('00:00');
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval); 
        }
    }, [waitingTime, runTime]);

    useEffect(() => {
        if (createdAt) {
            const interval = setInterval(() => {
                const createdAtInMs = new Date(createdAt).getTime();
                const currentTimeInMs = Date.now();
                const elapsedMs = currentTimeInMs - createdAtInMs;

                if (elapsedMs > 0) {
                    const minutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((elapsedMs % (1000 * 60)) / 1000);
                    setWaitingDuration(
                        `${minutes}:${seconds < 10 ? '0' : ''}${seconds} минут`
                    );
                } else {
                    setWaitingDuration('00:00:00');
                }
            }, 1000);

            return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
        }
    }, [createdAt]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsConfirmDisabled(e.target.value === '');
    };

    const handleConfirm = async (id: number, runTime: number) => {
        setIsLoading(true); // Включаем лоадер перед началом операции
        setTimeout(() => {
            setIsLoading(false); // Выключаем лоадер через 10 секунд
        }, 10000); // 10 секунд

        try {
            await TakeRequest(id, Number(runTime));
            // Обновление состояния или другие действия после успешного подтверждения
        } catch (error) {
            console.error('Ошибка при подтверждении заявки:', error);
        }
    };

    const handleCancel = async (id: number) => {
        setIsLoading(true); // Включаем лоадер перед началом операции
        setTimeout(() => {
            setIsLoading(false); // Выключаем лоадер через 10 секунд
        }, 10000); // 10 секунд

        try {
            await CancelRequest(id);
            // Обновление состояния или другие действия после успешного подтверждения
        } catch (error) {
            console.error('Ошибка при подтверждении заявки:', error);
        } 

    };

    const handleSuccess = async (id: number) => {
        setIsLoading(true); // Включаем лоадер перед началом операции
        setTimeout(() => {
            setIsLoading(false); // Выключаем лоадер через 10 секунд
        }, 10000); // 10 секунд

        try {
            await SuccessRequest(id);
            // Обновление состояния или другие действия после успешного подтверждения
        } catch (error) {
            console.error('Ошибка при подтверждении заявки:', error);
        } 

    };

    return (
        <div className={`bg-white p-6 rounded-[20px] w-full shadow-sm border border-slate-200 relative ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-lg z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
                </div>
            )}
            <div className="flex justify-start items-start gap-6 w-full">
                <div className="flex-shrink-0">
                    <Image 
                        src={`https://minotar.net/avatar/${recipient}`}
                        alt="AVATAR ICON"
                        width={120}
                        height={120}
                        className="rounded-[20px]"
                    />
                </div>
                <div className="flex flex-col justify-center items-start w-full gap-4">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-3">
                            <p className="text-[28px] font-semibold">{recipient}</p>
                            <div className="bg-black text-white px-3 py-1 text-[18px] rounded-full">
                                #{id}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            { status === REPLENISH_STATUS.WAITING ?
                                <div className="flex gap-2">
                                    <div className="bg-black text-white px-3 py-1 text-[18px] rounded-full">
                                    Выполняет {courier}
                                    </div>
                                    <div className="bg-emerald-500 text-white px-3 py-1 text-[18px] rounded-full">
                                        Время {remainingTime} минут
                                    </div>
                                </div>
                            :
                            <div className="flex gap-2">
                                <div className="bg-black text-white px-3 py-1 text-[18px] rounded-full">
                                Ожидание {waitingDuration}
                                </div>
                                <div className="bg-orange-400 text-white px-3 py-1 text-[18px] rounded-full">
                                    Ожидает назначения
                                </div>
                            </div>
                        } 
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="flex flex-col gap-2">
                            <p className="text-[18px] text-gray-600">Действие:</p>
                            <div className="bg-primary/10 text-primary px-4 py-2 text-[18px] rounded-lg">
                                { operationType === OPERATION_TYPE.REPLENISHMENT ? "Пополнение на счет" : "Снятие со счета"}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[18px] text-gray-600">Способ:</p>
                            <div className="bg-primary/10 text-primary px-4 py-2 text-[18px] rounded-lg">
                                { operationMethod === OPERATION_METHOD.MEET ? "Личная встреча" : "Из сундука"}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[18px] text-gray-600">Координаты:</p>
                            <div className="bg-primary/10 text-primary px-4 py-2 text-[18px] rounded-lg">
                                {coordinates.split(' ').map((coord, index) => (
                                    <span key={index}>
                                        {index === 0 ? `X: ${coord}` : index === 1 ? `Y: ${coord}` : `Z: ${coord}`}
                                        {index < 2 ? ', ' : ''}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[18px] text-gray-600">Сумма:</p>
                            <div className="bg-primary/10 text-primary px-4 py-2 text-[18px] rounded-lg">
                                {amount} ALM
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <p className="text-[18px] text-gray-600">Комментарий:</p>
                        <div className="bg-primary/10 text-primary px-4 py-2 text-[18px] rounded-lg">
                            { comment == null ? "Комментарий не был оставлен" : comment}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center gap-4 mt-6">
                {
                    status === REPLENISH_STATUS.WAITING ?
                    <div className="flex gap-4">
                        <Button 
                            className="text-[20px] px-12 h-[50px]" 
                            size={"lg"}
                            variant="outline"
                            onClick={() => handleCancel(id)}
                        >
                            Отменить
                        </Button>
                        <Button 
                            className="text-[20px] px-12 h-[50px]" 
                            size={"lg"}
                            onClick={() => handleSuccess(id)}
                        >
                            Выполнить задание
                        </Button>
                    </div>
                :
                <div className="flex gap-4">
                    {showInput ? (
                        <>  
                                <Input
                                    type="number"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder="Введите время (минуты)"
                                    className="border border-gray-300 rounded-lg px-4 py-2 h-[50px] text-[18px]"
                                />
                            <Button 
                                className="text-[20px] px-12 h-[50px]" 
                                size={"lg"}
                                onClick={() => handleConfirm(id, Number(inputValue))}
                                disabled={isLoading || isConfirmDisabled}
                            >
                                Подтвердить
                            </Button>
                        </>
                    ) : (
                        <Button 
                            className="text-[20px] px-12 h-[50px]" 
                            size={"lg"}
                            onClick={() => setShowInput(true)}
                        >
                            Взяться за выполнение
                        </Button>
                    )}
                </div>
                }
            </div>
        </div>
                       
    )
}