'use client';

import { Input } from "@/components/ui/input";
import React, { useState } from "react"
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"

import { formCreateUserSchema, TFormCreateUserData } from "../auth-forms/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { createUser } from "@/app/actions";
import { Title } from "../title";

interface Props {
    className?: string
}

export const RegisterUsersDashboard: React.FC<Props> = ({ className }) => {

    const form = useForm<TFormCreateUserData>({
        resolver: zodResolver(formCreateUserSchema),
        defaultValues: {
          userName: '',
        },
      });

      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [dialogData, setDialogData] = useState<{ user: { userName: string }, password: string } | null>(null);

      const openDialog = (user: { userName: string }, password: string) => {
        setDialogData({ user, password });
        setIsDialogOpen(true);
      }

      const onSubmit = async (data: TFormCreateUserData) => {
        try {
            const { createUser: createdUser, generatePassword: genPassword } = await createUser(data.userName);

            if (!createdUser) {
                throw new Error("Пользователь не был создан.");
            }
            
            openDialog(createdUser, genPassword);
        
            toast({
                title: "Операция выполнена успешно.",
                description: `Вы успешно зарегистрировали пользователя ${data.userName}.`,   
            });

            form.reset();
    
        } catch (error) {
            console.log('Error [REGISTER]', error);
            toast({
                variant: "destructive",
                title: "О-о-о! Что-то пошло не так.",
                description: `${error}`,
            });
        }
      };
    return (
        <>
            <div className="border border-primary mt-4 bg-white rounded-[20px] border-black w-full h-fit pt-[30px] pb-[30px] pr-[45px] pl-[45px]">        
                <Title className="font-extrabold" text="Регистрация новых пользователей" size='md'/>
                <div className="flex gap-6">
                    <p className="font-regular text-sm sm:text-base lg:text-lg">
                        При регистрации новых пользователей будьте внимательны, так как исправление ошибок ложится на наши плечи. 
                        Помните, что от вашей ответственности зависит безопасность и удобство работы пользователей с системой.
                    </p>
                </div>  
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-6", className)}>
                            <div className="w-full rounded-[20px] p-3 bg-[#fff] mt-4 px-4 md:px-4 lg:px-[2rem]">
                                <FormField
                                    control={form.control}
                                    name="userName"  
                                    render={({ field }) => (
                                    <FormItem>
                                        <h1 className="text-[20px]">Введите логин или никнейм:</h1>
                                        <FormControl>
                                        <Input placeholder="pink1ep1e" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <div className="flex justify-center items-center pt-[15px]">
                                    <Button disabled={form.formState.isSubmitting} onClick={() => onSubmit} size={"lg"}>
                                        {form.formState.isSubmitting ? 'Регистрация...' : 'Зарегистрировать'}
                                        {form.formState.isSubmitting ? '' : <LogIn size={64}/>}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>

        {dialogData && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="font-semibold text-[20px]">Информация о пользователе</DialogTitle>
                        <DialogDescription className="text-[16px]">
                            Данные о новом пользователе:
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-1 text-[18px]">
                        <div className="flex gap-2">
                            <p>Имя пользователя:</p> <p className="text-[16px]">{dialogData.user.userName}</p>
                        </div>
                        <div className="flex gap-2">
                            <p>Пароль:</p> <p className="text-[16px]">{dialogData.password}</p>
                        </div>
                        <div className="flex text-[15px] mt-2">
                            <p className="text-[15px]">
                                После регистрации обязательно поменяйте пароль и код-слово. Для использования карты пополните её в любом офисе банка или у банкира. 
                                <br/>Убедитесь, что вы сохранили пароль в надежном месте, так как восстановить его будет невозможно. 
                                <br/>Если у вас возникнут вопросы, обратитесь в службу поддержки банка.
                            </p>
                        </div>
                        <div className="flex text-[15px] mt-2">
                            <p className="text-[15px]">
                                Спасибо что пользуетесь нашим банком!
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className="p-4 w-full text-[16px] " type="submit" onClick={() => setIsDialogOpen(false)}>Закрыть</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )}
        </>
    )
}