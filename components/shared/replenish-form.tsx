'use client';

import React, { useState } from "react"
import { Button } from "../ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { createNewReplenish } from "@/app/actions";

interface Props {
    className?: string;
}

export const ReplenishForm: React.FC<Props> = ({ className }) => {
    const [action, setAction] = useState<"replenish" | "withdraw" | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [method, setMethod] = useState<string | null>(null);
    const [coordinates, setCoordinates] = useState("");
    const [amount, setAmount] = useState("");
    const [comment, setComment] = useState("");

    const isFormValid = action && method && coordinates.trim() && amount.trim();

    const handleSubmit = () => {
        setIsLoading(true);
        createNewReplenish(action, method, coordinates, Number(amount), comment).then(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }).catch((error) => {
            setIsLoading(false);
            console.error("Ошибка при создании заявки:", error);
        });
    }

    return (
        <div className={cn("flex flex-col items-center justify-center mt-6", className)}>
            {!isSubmitted ? (
                <>
                    <div className="flex flex-col justify-start items-start w-full">
                        <p className="text-[18px]">Выберите действие по счету:</p>
                        <Select onValueChange={(value) => setAction(value as "replenish" | "withdraw")}>
                            <SelectTrigger className="w-full h-[50px] text-[17px] px-5 border-black focus:border-black focus:ring-black">
                                <SelectValue placeholder="Выберите действие" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="replenish" className="text-[17px] px-4 py-2">Пополнение средств</SelectItem>
                                <SelectItem value="withdraw" className="text-[17px] px-4 py-2">Снятие средств</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {action && (
                        <div className="slide-down w-full">
                            <div className="flex flex-col justify-start items-start w-full mt-4">
                                <p className="text-[18px]">Выберите способ {action === "replenish" ? "пополнения" : "снятия"}:</p>
                                <Select onValueChange={(value) => setMethod(value)}>
                                    <SelectTrigger className="w-full h-[50px] text-[17px] px-5 border-black focus:border-black focus:ring-black">
                                        <SelectValue placeholder="Выберите способ" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="meet" className="text-[17px] px-4 py-2">Личная встреча</SelectItem>
                                        <SelectItem value="chest" className="text-[17px] px-4 py-2">Положить в сундук</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col justify-start items-start w-full mt-4">
                                <p className="text-[18px]">Введите координаты встречи/сундука по аду:</p>
                                <Input 
                                    type="text" 
                                    className="w-full h-[50px] text-[15px] px-5"
                                    placeholder="Пример: 100, 64, -200" 
                                    value={coordinates}
                                    onChange={(e) => setCoordinates(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col justify-start items-start w-full mt-4">
                                <p className="text-[18px]">Введите кол-во {action === "replenish" ? "пополнения" : "снятия"}:</p>
                                <div className="flex justify-center items-center w-full gap-2">
                                    <Input 
                                        type="number" 
                                        className="w-full h-[50px] text-[15px] px-5"
                                        placeholder="Пример: 150" 
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                    <p className="text-[20px]">ALM</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-start items-start w-full mt-4">
                                <p className="text-[18px]">Комментарий для курьера (необязательно):</p>
                                <Input 
                                    type="text" 
                                    className="w-full h-[50px] text-[15px] px-5"
                                    placeholder="Введите комментарий" 
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col justify-center items-center w-full mt-6">
                                <Button 
                                    className="w-full mt-2 h-[50px]" 
                                    size={"lg"}
                                    onClick={handleSubmit}
                                    disabled={!isFormValid || isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-6 w-6 animate-spin" />
                                    ) : (
                                        action === "replenish" ? "Заказать пополнение" : "Заказать снятие"
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col justify-start items-start w-full">
                    <p className="mt-4 text-[20px] font-semibold">Подождите совсем немного!</p>
                    <p className="mt-1 text-gray-600 text-[17px]">
                        Ваша заявка ожидает назначения сотрудника<span className="loading-dots"></span>
                    </p>
                </div>
            )}
        </div>
    )
}