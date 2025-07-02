'use client';

import { Card, User } from "@prisma/client";
import React, { useState, useEffect, useRef } from 'react'
import { cn } from "@/lib/utils";
import confetti from 'canvas-confetti';
import { Button } from "@/components/ui/button";
import { Title } from "../title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { formTransactionSchema, TFormTransactionData } from "../auth-forms/schemas";
import { createTransaction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { checkPremium } from "@/lib/check-premium";
import { SuccessPaymentModal } from "../success-payment-modal";
import { Banknote, ChevronRight, Landmark, Mail, UsersRound, Wallet, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";


interface Props {
    data: User
    card: Card;
    className?: string;
}

export const TransactionDetails: React.FC<Props> = ({ card, data, className }) => {
    const { toast } = useToast()
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [focused, setFocused] = React.useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [clickCount, setClickCount] = useState(0);
    const [isPremium, setIsPremium] = useState(false);

    const [ isUserFinded, setIsUserFound ] = useState(false);

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const form = useForm<TFormTransactionData>({
        resolver: zodResolver(formTransactionSchema),
        defaultValues: {
          recipientUser: '',
          amount: Number(""),
          message: '',
        },
      });
    
      const amount = Number(form.watch('amount'));

      const [recipientName, setRecipientName] = useState('')
      const [isAmount, setAmount] = useState(0)
      const [isMessage, setMessage] = useState('')
    
      const [formattedAmount, setFormattedAmount] = useState('');

      const onSubmit = async (dataForm: TFormTransactionData) => {
        try {
            await createTransaction({
                recipientName: dataForm.recipientUser,
                amount: dataForm.amount,
                message: dataForm.message,
            })

            setRecipientName(dataForm.recipientUser)
            setAmount(dataForm.amount)
            setMessage(dataForm.message)
            
            setIsUserFound(false);
            setIsSuccessModalOpen(true);
            form.reset();

        } catch (error) {
          console.log('Error [TRANSACTION]', error);
          toast({
            variant: "destructive",
            title: "О-о-о! Что-то пошло не так.",
            description: `${error}`,
          })
        }
      };

    useEffect(() => {
        if (searchTerm.length > 0) {
            fetch(`/api/search-users?query=${searchTerm}`)
                .then(response => response.json())
                .then(data => setUsers(data))
                .catch(error => console.error('Ошибка при поиске пользователей:', error));
        } else {
            setUsers([]); 
        }
    }, [searchTerm]);

    useEffect(() => {
        const checkPremiumStatus = async () => {
            const premiumStatus = await checkPremium(data.id);
            setIsPremium(premiumStatus);
        };
        checkPremiumStatus();
    }, [data.id]);

    useEffect(() => {
        if (data.isGov == true) {
            if (amount <= 100000) { 
                setFormattedAmount("Перевести " + amount.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, '|').replace(/\./g, ',').replace(/\|/g, '.'));
            } else {
                setFormattedAmount('До 100 000.00');
            }
            if (amount <= 0) {
                setFormattedAmount('Не менее 2.00');
            }
        }
        else {
            if (amount <= 10000) {
                if (amount > 100 && !isPremium) {
                    setFormattedAmount("Перевести " + (amount + amount * 0.02).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, '|').replace(/\./g, ',').replace(/\|/g, '.'));
                } else {
                    setFormattedAmount("Перевести " + amount.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, '|').replace(/\./g, ',').replace(/\|/g, '.'));
                }
            } else {
                setFormattedAmount('До 10 000.00');
            }
            if (amount <= 0) {
                setFormattedAmount('Не менее 2.00');
            }
        }
    }, [amount, isPremium, data.isGov]);

    // Обработчик клика вне области
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setFocused(false); // Скрываем dropdown
            }
        };

        // Добавляем обработчик
        document.addEventListener("mousedown", handleClickOutside);

        // Удаляем обработчик при размонтировании
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClick = () => {
        setClickCount(prev => prev + 1);

        if (clickCount + 1 === 3) {
            confetti({
                particleCount: 100,
                spread: 200,
                origin: { y: 0.6 },
            });
            setClickCount(0); // Сброс счетчика после запуска конфетти
        }
    };

    return (
        <>  <div className="shadow-md border-primary bg-white rounded-[20px] border border-slate-200 w-full h-fit pt-[20px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[30px] lg:pb-[30px] lg:pr-[45px] lg:pl-[45px]">
                <Title className="font-extrabold" text="Переводы" size='md'/>
                <div>
                    <p className="text-[15px] text-slate-600 mt-2">СЧЕТ СПИСАНИЯ</p>
                    <div className="rounded-[20px] bg-primary/5 pt-[16px] pb-[16px] pr-[25px] pl-[25px] lg:pt-[18px] lg:pb-[18px] lg:pr-[22px] lg:pl-[22px] mt-1">
                        <div className="grid grid-cols-2 gap-5 items-center"> 
                            <div>
                                <h1 className="text-[#434C55] text-[17px] lg:text-[22px]">Алмазный счет</h1>
                                <div className="flex m-auto">
                                    {
                                        card.balance > 1000000 ?
                                        <p className="font-bold text-[16px] lg:text-[25px] pr-[5px]">{card.balance.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, '|').replace(/\./g, ',').replace(/\|/g, '.')}</p>
                                        :
                                        <p className="font-bold text-[20px] lg:text-[25px] pr-[5px]">{card.balance.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, '|').replace(/\./g, ',').replace(/\|/g, '.')}</p>
                                    }
                                    <p className="text-[16px] lg:text-[20px]">ALM</p>
                                </div>
                            </div>
                            <div className="flex justify-end items-end">
                                <div 
                                    className="relative bg-black rounded-[12px] w-[110px] h-[70px] p-[9px] cursor-pointer select-none"
                                    onClick={handleClick}
                                    >
                                    <div className="font-bold text-white w-full">
                                        <p>pnk бaнк</p>
                                        <p className="text-[14px] font-semibold absolute bottom-2 right-2">{String(card.cardNumber).slice(-4)}</p>
                                    </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={cn("mt-3", className)}>
                            
                            <FormField
                            control={form.control}
                            name="recipientUser"  
                            render={({ field }) => (
                                <FormItem>
                                <h1 className="text-[15px] text-[#434C55]">ПОЛУЧАТЕЛЬ</h1>
                                <FormControl>
                                        {
                                            isUserFinded ?
                                            (
                                                <div className="bg-primary/5 rounded-[12px] p-3 cursor-pointer transition-all">   
                                                    <div className="flex justify-start p-0.5 items-center gap-2.5">
                                                        {
                                                            field.value == 'government' ?
                                                            <div className="w-[50px] h-[50px] rounded-[8px] bg-black">
                                                                <div className="w-[50px] h-[50px] p-1 flex justify-center items-center">
                                                                    <Landmark color="#fff" size={28}/>
                                                                </div>
                                                            </div>
                                                            :
                                                            field.value == 'bank' ?
                                                            <div className="w-[50px] h-[50px] rounded-[8px] bg-black">
                                                                <div className="w-[50px] h-[50px] p-1 flex justify-center items-center">
                                                                    <Wallet color="#fff" size={28}/>
                                                                </div>
                                                            </div>
                                                            :
                                                            <Image 
                                                                src={`https://minotar.net/avatar/${field.value}`}
                                                                alt="TRANSACTION ICON"
                                                                width={52}
                                                                height={52}
                                                                className="rounded-[8px]"
                                                            />
                                                        }
        
                                                        <div className="flex flex-col">
                                                            <p className="text-[20px]">{field.value}</p>
                                                            <p className="text-[16px] text-gray-700">Перевод средств через pnk банк</p>
                                                        </div>
                                                        <div className="flex ml-auto pr-2">
                                                            <X 
                                                                className="cursor-pointer hover:scale-110 transition-all"
                                                                onClick={() => {
                                                                    setIsUserFound(false); 
                                                                    field.onChange(''); 
                                                                    setSearchTerm('')
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex justify-center items-center gap-3 transition-all">
                                                    <Input
                                                        placeholder="pink1ep1e"
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e); 
                                                            setSearchTerm(e.target.value); 
                                                        }}
                                                        type="text"
                                                        className="rounded-[12px] h-[52px]"
                                                        onFocus={() => setFocused(true)}
                                                    />
                                                    <UsersRound 
                                                        size={30} 
                                                        className="hover:scale-110 cursor-pointer transition-all text-slate-800" 
                                                    />
                                                </div>
                                            )
                                        }
                                </FormControl>
                                {/* Список найденных пользователей */}
                                {focused && (
                                    <div 
                                        ref={dropdownRef} 
                                        className={`border absolute w-[342px] bg-white rounded-xl shadow-md transition-all duration-200 z-30 ${
                                            focused ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                        }`}
                                    >
                                        {
                                            users.length === 0 && (
                                                <div className="p-4 text-center">
                                                    {/* <h1 className="text-[18px] font-semibold">Идет поиск пользователей</h1> */}
                                                    <p className="text-gray-600">Продолжайте вводить никнейм пользователя</p>
                                                    <div className="flex items-center space-x-4 mt-2">
                                                        <Skeleton className="h-[50px] w-[50px] rounded-[8px]" />
                                                        <div className="space-y-2">
                                                            <Skeleton className="h-4 w-[120px]" />
                                                            <Skeleton className="h-4 w-[200px]" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {
                                            users.length > 0 && (
                                                <div className="pt-4 text-center">
                                                    {/* <h1 className="text-[18px] font-semibold">Идет поиск пользователей</h1> */}
                                                    <p className="text-gray-600">Найденно несколько пользователей</p>
                                                </div>
                                            )
                                        }
                                        {users.map((user, index) => (
                                            <div key={index} className="space-y-1 px-2 transition-all">
                                                <div
                                                className="px-3 text-[20px] hover:rounded-[10px] py-2 hover:bg-primary/5 cursor-pointer" 
                                                onClick={() => {
                                                    field.onChange(user.userName); 
                                                    setUsers([]); 
                                                    setFocused(false);
                                                    setIsUserFound(true);
                                                }}
                                                >   
                                                    <div className="flex justify-start p-0.5 items-center gap-2">
                                                        {
                                                            user.userName == 'government' ?
                                                            <div className="w-[45px] h-[45px] rounded-[8px] bg-black">
                                                                <div className="w-[45px] h-[45px] p-1 flex justify-center items-center">
                                                                    <Landmark color="#fff" size={28}/>
                                                                </div>
                                                            </div>
                                                            :
                                                            user.userName == 'bank' ?
                                                            <div className="w-[45px] h-[45px] rounded-[8px] bg-black">
                                                                <div className="w-[45px] h-[45px] p-1 flex justify-center items-center">
                                                                    <Wallet color="#fff" size={28}/>
                                                                </div>
                                                            </div>
                                                            :
                                                            <Image 
                                                                src={`https://minotar.net/avatar/${user.userName}`}
                                                                alt="TRANSACTION ICON"
                                                                width={45}
                                                                height={45}
                                                                className="rounded-[8px]"
                                                            />
                                                        }
                                                        <div className="flex flex-col">
                                                            <p className="text-[20px]">{user.userName}</p>
                                                            <p className="text-[15px] text-slate-700">Нажми, чтобы выбрать</p>
                                                        </div>
                                                        <div className="flex ml-auto">
                                                            <ChevronRight size={20}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr className="border-[#F5F7FA] pb-1"/>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                <h1 className="text-[15px] text-[#434C55] mt-4">ВВЕДИТЕ СУММУ СПИСАНИЯ</h1>
                                <FormControl>
                                    <div className="flex justify-center items-center gap-3">
                                        <Input 
                                            type="number" 
                                            className="rounded-[12px] h-[52px]"
                                            placeholder="Введите сумму" 
                                            value={field.value === 0 ? '' : field.value.toString()} 
                                            onChange={(e) => field.onChange(e.target.value === '' ? '' : e.target.value)} 
                                            
                                        />
                                        <Banknote  size={30} className="hover:scale-110 cursor-pointer transition-all text-slate-800" />
                                    </div>
                                </FormControl>  
                                    <FormDescription>
                                        До 100 ALM без комиссии в 2%
                                    </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                <h1 className="text-[15px] text-[#434C55] mt-4">ВВЕДИТЕ ВАШЕ СООБЩЕНИЕ (НЕОБЯЗАТЕЛЬНО)</h1>
                                <FormControl>
                                    <div className="flex justify-center items-center gap-3">
                                        <Input type="text" placeholder="Введите сообщение" {...field} className="rounded-[12px] h-[52px]" />
                                        <Mail size={30} className="hover:scale-110 cursor-pointer transition-all text-slate-800" />
                                    </div>
                                </FormControl>  
                                </FormItem>
                            )}
                            />
                            <div className="flex justify-center items-center pt-[25px]">
                            <Button 
                                className="w-[300px] lg:w-[350px] h-[50px]" 
                                disabled={form.formState.isSubmitting || data.isGov ? amount > 100000 && true : amount > 10000 || amount == 0 || amount < 0} 
                                size={"lg"}
                            >
                                {form.formState.isSubmitting 
                                    ? 'Выполнение операции...'
                                    : amount == 0 
                                    ? 'Введите сумму'
                                    : `${formattedAmount} ALM`
                                }
                            </Button>
                            </div>
                        </form>
                    </Form>
                </div>
                <SuccessPaymentModal 
                    recipient={recipientName}
                    amount={isAmount}
                    sender={data.userName}
                    comission={ data.isGov || isPremium || isAmount <= 100 ? 0 : parseFloat((isAmount * 0.02).toFixed(2))}
                    message={isMessage}
                    date={new Date()}
                    isOpen={isSuccessModalOpen} 
                    onClose={() => setIsSuccessModalOpen(false)} 
                />
            </div>
        </>
    )
}