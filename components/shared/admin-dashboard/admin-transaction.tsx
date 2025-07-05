'use client';

import { User } from "@prisma/client";
import React, { useState, useEffect, useRef } from 'react'
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Title } from "../title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { formTransactionSchema, TFormTransactionData } from "../auth-forms/schemas";
import { createAdminTransaction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { SuccessPaymentModal } from "../success-payment-modal";
import { Banknote, ChevronRight, Landmark, UsersRound, Wallet, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";


interface Props {
    className?: string;
}

export const AdminTransaction: React.FC<Props> = ({ className }) => {
    const { toast } = useToast()
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [focused, setFocused] = React.useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
    

      const onSubmit = async (dataForm: TFormTransactionData) => {
        try {
            await createAdminTransaction({
                recipientName: dataForm.recipientUser,
                amount: dataForm.amount
            })

            setRecipientName(dataForm.recipientUser)
            setAmount(dataForm.amount)
            setMessage(`Перевод от ${new Date().toLocaleString()}`)
            
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

    return (
        <>  <div className="shadow-md border-primary bg-white rounded-[20px] border border-slate-200 w-full h-fit pt-[20px] pb-[15px] pr-[25px] pl-[25px] lg:pt-[30px] lg:pb-[30px] lg:pr-[45px] lg:pl-[45px]">
                <Title className="font-extrabold" text="Пополнение счетов пользователей" size='md'/>
                <p className="text-[16px]">Пополнение счетов — это процесс зачисления средств на баланс пользователя. В нашем банке пополнение осуществляется быстро и безопасно.</p>
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
                                <h1 className="text-[15px] text-[#434C55] mt-4">ВВЕДИТЕ СУММУ ПОПОЛНЕНИЯ</h1>
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
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            
                            <div className="flex justify-center items-center pt-[25px]">
                            <Button 
                                className="w-[300px] lg:w-[350px] h-[50px]" 
                                disabled={amount == 0 || amount < 0 || amount > 100000} 
                                size={"lg"}
                            >
                                {"Пополнить " + amount.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, '|').replace(/\./g, ',').replace(/\|/g, '.') + " ALM"}
                            </Button>
                            </div>
                        </form>
                    </Form>
                </div>
                <SuccessPaymentModal 
                    recipient={recipientName}
                    amount={isAmount}
                    sender={'bank'}
                    comission={0}
                    message={isMessage}
                    date={new Date()}
                    isOpen={isSuccessModalOpen} 
                    onClose={() => setIsSuccessModalOpen(false)} 
                />
            </div>
        </>
    )
}

