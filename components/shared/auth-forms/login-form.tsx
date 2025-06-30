'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Key, LogIn, User } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginData } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props {
    className?: string;
}

export const LoginForm: React.FC<Props> = ({ className }) => {
  const router = useRouter()
  
  const form = useForm<TFormLoginData>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      userName: '',
      password: '',
    },
  });

  const onSubmit = async (data: TFormLoginData) => {

    try {
      const resp = await signIn('credentials', {
        ...data, 
        redirect: false
      });

      if (!resp?.ok) {
        return  toast({
          variant: "destructive",
          title: "Неверный никнейм или пароль.",
          description: `Пожалуйста введите верные данные от аккаунта.`,   
        })
      }

      toast({
        title: "Вы успешно вошли в личный кабинет.",
        description: `Спасибо что пользуетесь нашими услугами!`,    
      })

      router.push('/cabinet')
    } catch (error) {
      console.log('Error [LOGIN]', error);
      toast({
        variant: "destructive",
        title: "О-о-о! Что-то пошло не так.",
        description: `${error}`,
      })
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-3", className)}>
        
        <FormField
          control={form.control}
          name="userName"  
          render={({ field }) => (
            <FormItem>
              <h1 className="text-[19px]">Введите логин или никнейм:</h1>
              <FormControl>
                <div className="flex justify-center items-center gap-2">
                  <Input className="h-[52px] rounded-[12px]" placeholder="pink1ep1e" {...field} />
                  <User className="hover:scale-110 transition-all cursor-pointer" size={35}/>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <h1 className="text-[19px]">Введите пароль:</h1>
              <FormControl>
                <div className="flex justify-center items-center gap-2">
                  <Input className="h-[52px] rounded-[12px]" type="password" placeholder="Введите ваш пароль" {...field} />
                  <Key className="hover:scale-110 transition-all cursor-pointer" size={35}/>
                </div>
              </FormControl>  
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2 justify-center items-center pt-[10px]">
          <Button className="h-[50px] w-[250px] md:w-[400px] rounded-[12px]" disabled={form.formState.isSubmitting} onClick={() => onSubmit} size={"lg"}>
            {form.formState.isSubmitting ? 'Вход...' : 'Войти в банк'}
            {form.formState.isSubmitting ? '' : <LogIn size={64}/>}
          </Button>
        </div>
      </form>
    </Form>
  );
};
