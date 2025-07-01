'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mails, User, ShieldAlert, ArrowLeft, Smile } from "lucide-react";
import { useForm } from "react-hook-form";
import { formRegisterSchema, TFormRegisterData } from "./schemas";
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
import { createApplication } from "@/app/actions";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Title } from "../title";

interface Props {
    className?: string;
    onFieldChange: (filledFieldsCount: number) => void;
}

export const RegisterForm = ({ className, onFieldChange }: Props) => {
  const [agreementChecked, setAgreementChecked] = useState(false);
  const router = useRouter()
  const [status, setStatus] = useState(1);
  
  const form = useForm<TFormRegisterData>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      userName: '',
      telegram: '',
      discord: '',
    },
  });

  useEffect(() => {
    const values = form.watch();
    const filledFieldsCount = Object.values(values).filter(value => value !== '').length;
    onFieldChange(filledFieldsCount);
  }, [form.watch()]);

  const onSubmit = async (data: TFormRegisterData) => {

    if (!agreementChecked) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Пожалуйста, подтвердите согласие с публичной офертой и политикой обработки персональных данных",
      });
      return;
    }
    
    try {
      await createApplication({
        userName: data.userName,
        telegram: data.telegram,
        discord: data.discord
      })

      setStatus(2);

    } catch (error) {
      console.log('Error [REGISTER]', error);
      setStatus(3);
    }
  };

  return (
    <div>  
        <div className={`flex-col justify-center items-center h-[525px] ${status === 3 ? "flex" : "hidden"}`}>
            <ShieldAlert size={100}/>
            <Title className="font-extrabold" text="О-о-о! Что-то пошло не так." size='md'/>
            <div className="text-center">
                <h1 className="text-[16px] text-gray-600">
                  Произошла ошибка при попытке создания аккаунта. Возможно, вы уже зарегистрировались ранее. Если это не так, пожалуйста, свяжитесь с нашей службой поддержки для получения помощи.
                </h1>
            </div>
        </div>
        <div className={`flex-col justify-center items-center h-[525px] ${status === 2 ? "flex" : "hidden"}`}>
          <Smile size={120}/>
          <div className="text-center">
            <Title className="font-extrabold mt-3" text="Ваша заявка успешно создана" size='lg'/>
              <h1 className="mt-3 text-[18px] text-gray-600">
                  Спасибо, что хотите стать клиентом нашего банка! 
                  Напоминаем, что вы должны открыть личные сообщения в Discord или Telegram, 
                  чтобы с вами смог связаться представитель банка для обсуждения деталей оформления счета. 
                  Если вы заполнили что-то не верно, пожалуйста, обратитесь в поддержку.
              </h1>
            <p className="mt-3 text-[18px]">Мы свяжемся с вами в течение 24 часов для подтверждения заявки.</p>
          </div>
        </div>
        <div className={`flex-col justify-center items-center h-[525px] ${status === 1 ? "flex" : "hidden"}`}>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
                <div className="text-center">
                    <h1 className="text-[16px] text-gray-600">
                        Пожалуйста, откройте личные сообщения 
                        (если вы игрок StarSMP - убедитесь, что личные сообщения для этого сервера включены). 
                        Мы свяжемся с вами для подтверждения заявки и дальнейших инструкций.
                    </h1>
                </div>
              <FormField
              control={form.control}
              name="userName"  
              render={({ field }) => (
                  <FormItem>
                  <h1 className="text-[20px]">Введите никнейм:</h1>
                  <FormControl>
                      <div className="flex justify-center items-center gap-2">
                        <Input className="h-[52px] rounded-[12px]" placeholder="pink1ep1e" {...field} />
                        <User className="cursor-pointer hover:scale-110 transition-all" size={35} />
                      </div>
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="telegram"
              render={({ field }) => (
                  <FormItem>
                  <h1 className="text-[20px]">Введите ваш Telegram:</h1>
                  <FormControl>
                    <div className="flex justify-center items-center gap-2">
                      <Input className="h-[52px] rounded-[12px]" placeholder="Введите ваш Telegram" {...field} />
                      <svg className="cursor-pointer hover:scale-110 transition-all" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 24 24">
                        <path d="M 20.302734 2.984375 C 20.013769 2.996945 19.748583 3.080055 19.515625 3.171875 C 19.300407 3.256634 18.52754 3.5814726 17.296875 4.0976562 C 16.06621 4.61384 14.435476 5.2982348 12.697266 6.0292969 C 9.2208449 7.4914211 5.314238 9.1361259 3.3125 9.9785156 C 3.243759 10.007156 2.9645852 10.092621 2.65625 10.328125 C 2.3471996 10.564176 2.0039062 11.076462 2.0039062 11.636719 C 2.0039062 12.088671 2.2295201 12.548966 2.5019531 12.8125 C 2.7743861 13.076034 3.0504903 13.199244 3.28125 13.291016 C 3.9563403 13.559857 6.0424892 14.392968 6.9492188 14.755859 C 7.2668647 15.707799 8.0129251 17.950071 8.1875 18.501953 L 8.1855469 18.501953 C 8.3275588 18.951162 8.4659791 19.243913 8.6582031 19.488281 C 8.7543151 19.610465 8.8690398 19.721184 9.0097656 19.808594 C 9.0637596 19.842134 9.1235454 19.868148 9.1835938 19.892578 C 9.191962 19.896131 9.2005867 19.897012 9.2089844 19.900391 L 9.1855469 19.894531 C 9.2029579 19.901531 9.2185841 19.911859 9.2363281 19.917969 C 9.2652427 19.927926 9.2852873 19.927599 9.3242188 19.935547 C 9.4612233 19.977694 9.5979794 20.005859 9.7246094 20.005859 C 10.26822 20.005859 10.601562 19.710938 10.601562 19.710938 L 10.623047 19.695312 L 12.970703 17.708984 L 15.845703 20.367188 C 15.897113 20.439837 16.308174 20.998047 17.261719 20.998047 C 17.829844 20.998047 18.280978 20.718791 18.568359 20.423828 C 18.855741 20.128866 19.034757 19.82706 19.115234 19.417969 L 19.115234 19.414062 L 19.115234 19.412109 C 19.171124 19.121728 21.931641 5.265625 21.931641 5.265625 L 21.925781 5.2890625 C 22.01148 4.9067181 22.036735 4.5369631 21.935547 4.1601562 C 21.834358 3.7833495 21.561271 3.4156252 21.232422 3.2226562 C 20.903572 3.0296874 20.591699 2.9718046 20.302734 2.984375 z M 19.908203 5.1738281 C 19.799749 5.7182284 17.343164 18.059965 17.183594 18.878906 L 14.328125 16.240234 C 13.59209 15.559749 12.44438 15.535812 11.679688 16.181641 L 10.222656 17.414062 L 11 14.375 C 11 14.375 16.362547 8.9468594 16.685547 8.6308594 C 16.945547 8.3778594 17 8.2891719 17 8.2011719 C 17 8.0841719 16.939781 8 16.800781 8 C 16.675781 8 16.506016 8.1197812 16.416016 8.1757812 C 15.267511 8.8918132 10.350132 11.694224 7.96875 13.048828 C 7.8792978 12.995267 7.7913128 12.939666 7.6933594 12.900391 C 6.9119785 12.587666 5.4101276 11.985551 4.53125 11.634766 C 6.6055146 10.76177 10.161156 9.2658083 13.472656 7.8730469 C 15.210571 7.142109 16.840822 6.4570977 18.070312 5.9414062 C 19.108158 5.5060977 19.649538 5.2807035 19.908203 5.1738281 z M 17.152344 19.023438 C 17.152344 19.023438 17.154297 19.023438 17.154297 19.023438 C 17.154234 19.023761 17.152444 19.03095 17.152344 19.03125 C 17.154024 19.022709 17.151187 19.029588 17.152344 19.023438 z"></path>
                      </svg>
                    </div>
                  </FormControl>  
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="discord"
              render={({ field }) => (
                  <FormItem>
                  <h1 className="text-[20px]">Введите ваш Discord:</h1>
                  <FormControl>
                    <div className="flex justify-center items-center gap-2">
                      <Input className="h-[52px] rounded-[12px]" placeholder="Введите ваш Discord" {...field} />
                      <svg className="cursor-pointer hover:scale-110 transition-all" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 32 32">
                        <path d="M 12.65625 4.90625 L 11.875 5 C 11.875 5 8.371094 5.382813 5.8125 7.4375 L 5.78125 7.4375 L 5.75 7.46875 C 5.175781 7.996094 4.925781 8.644531 4.53125 9.59375 C 4.136719 10.542969 3.714844 11.753906 3.34375 13.09375 C 2.601563 15.777344 2 19.027344 2 22 L 2 22.25 L 2.125 22.5 C 3.050781 24.125 4.695313 25.160156 6.21875 25.875 C 7.742188 26.589844 9.058594 26.96875 9.96875 27 L 10.5625 27.03125 L 10.875 26.5 L 11.96875 24.5625 C 13.128906 24.824219 14.464844 25 16 25 C 17.535156 25 18.871094 24.824219 20.03125 24.5625 L 21.125 26.5 L 21.4375 27.03125 L 22.03125 27 C 22.941406 26.96875 24.257813 26.589844 25.78125 25.875 C 27.304688 25.160156 28.949219 24.125 29.875 22.5 L 30 22.25 L 30 22 C 30 19.027344 29.398438 15.777344 28.65625 13.09375 C 28.285156 11.753906 27.863281 10.542969 27.46875 9.59375 C 27.074219 8.644531 26.824219 7.996094 26.25 7.46875 L 26.21875 7.4375 L 26.1875 7.4375 C 23.628906 5.382813 20.125 5 20.125 5 L 19.34375 4.90625 L 19.0625 5.625 C 19.0625 5.625 18.773438 6.355469 18.59375 7.1875 C 17.460938 7.035156 16.535156 7 16 7 C 15.464844 7 14.539063 7.035156 13.40625 7.1875 C 13.226563 6.355469 12.9375 5.625 12.9375 5.625 Z M 11.28125 7.1875 C 11.324219 7.328125 11.367188 7.449219 11.40625 7.5625 C 10.113281 7.882813 8.734375 8.371094 7.46875 9.15625 L 8.53125 10.84375 C 11.125 9.234375 14.851563 9 16 9 C 17.148438 9 20.875 9.234375 23.46875 10.84375 L 24.53125 9.15625 C 23.265625 8.371094 21.886719 7.882813 20.59375 7.5625 C 20.632813 7.449219 20.675781 7.328125 20.71875 7.1875 C 21.652344 7.375 23.433594 7.804688 24.90625 8.96875 C 24.898438 8.972656 25.28125 9.550781 25.625 10.375 C 25.976563 11.222656 26.367188 12.351563 26.71875 13.625 C 27.394531 16.066406 27.925781 19.039063 27.96875 21.65625 C 27.339844 22.617188 26.171875 23.484375 24.9375 24.0625 C 23.859375 24.566406 23.007813 24.75 22.5 24.84375 L 22 24 C 22.296875 23.890625 22.589844 23.769531 22.84375 23.65625 C 24.382813 22.980469 25.21875 22.25 25.21875 22.25 L 23.90625 20.75 C 23.90625 20.75 23.34375 21.265625 22.03125 21.84375 C 20.71875 22.421875 18.714844 23 16 23 C 13.285156 23 11.28125 22.421875 9.96875 21.84375 C 8.65625 21.265625 8.09375 20.75 8.09375 20.75 L 6.78125 22.25 C 6.78125 22.25 7.617188 22.980469 9.15625 23.65625 C 9.410156 23.769531 9.703125 23.890625 10 24 L 9.5 24.84375 C 8.992188 24.75 8.140625 24.566406 7.0625 24.0625 C 5.828125 23.484375 4.660156 22.617188 4.03125 21.65625 C 4.074219 19.039063 4.605469 16.066406 5.28125 13.625 C 5.632813 12.351563 6.023438 11.222656 6.375 10.375 C 6.71875 9.550781 7.101563 8.972656 7.09375 8.96875 C 8.566406 7.804688 10.347656 7.375 11.28125 7.1875 Z M 12.5 14 C 11.726563 14 11.042969 14.441406 10.625 15 C 10.207031 15.558594 10 16.246094 10 17 C 10 17.753906 10.207031 18.441406 10.625 19 C 11.042969 19.558594 11.726563 20 12.5 20 C 13.273438 20 13.957031 19.558594 14.375 19 C 14.792969 18.441406 15 17.753906 15 17 C 15 16.246094 14.792969 15.558594 14.375 15 C 13.957031 14.441406 13.273438 14 12.5 14 Z M 19.5 14 C 18.726563 14 18.042969 14.441406 17.625 15 C 17.207031 15.558594 17 16.246094 17 17 C 17 17.753906 17.207031 18.441406 17.625 19 C 18.042969 19.558594 18.726563 20 19.5 20 C 20.273438 20 20.957031 19.558594 21.375 19 C 21.792969 18.441406 22 17.753906 22 17 C 22 16.246094 21.792969 15.558594 21.375 15 C 20.957031 14.441406 20.273438 14 19.5 14 Z M 12.5 16 C 12.554688 16 12.625 16.019531 12.75 16.1875 C 12.875 16.355469 13 16.648438 13 17 C 13 17.351563 12.875 17.644531 12.75 17.8125 C 12.625 17.980469 12.554688 18 12.5 18 C 12.445313 18 12.375 17.980469 12.25 17.8125 C 12.125 17.644531 12 17.351563 12 17 C 12 16.648438 12.125 16.355469 12.25 16.1875 C 12.375 16.019531 12.445313 16 12.5 16 Z M 19.5 16 C 19.554688 16 19.625 16.019531 19.75 16.1875 C 19.875 16.355469 20 16.648438 20 17 C 20 17.351563 19.875 17.644531 19.75 17.8125 C 19.625 17.980469 19.554688 18 19.5 18 C 19.445313 18 19.375 17.980469 19.25 17.8125 C 19.125 17.644531 19 17.351563 19 17 C 19 16.648438 19.125 16.355469 19.25 16.1875 C 19.375 16.019531 19.445313 16 19.5 16 Z"></path>
                      </svg>
                    </div>
                  </FormControl>  
                  <FormMessage />
                  </FormItem>
              )}
              />
              
              <div className="flex items-center justify-center space-x-4 pt-2 ml-4">
                <Checkbox 
                  id="agreement" 
                  className="w-[24px] h-[24px] rounded-[6px]"
                  checked={agreementChecked} 
                  onCheckedChange={(checked: boolean | "indeterminate") => setAgreementChecked(checked as boolean)} 
                />
                <label
                  htmlFor="agreement" 
                  className="text-[16px] text-gray-600 leading-tight cursor-pointer"
                >
                  Я соглашаюсь с <a href="/offer" className="text-primary underline">публичной офертой</a> и <a href="/privacy" className="text-primary underline">политикой обработки персональных данных</a>
                </label>
              </div>
              
              <div className="flex justify-center items-center pt-[10px]">
                <Button 
                  disabled={form.formState.isSubmitting || !agreementChecked} 
                  onClick={() => onSubmit} 
                  size={"lg"}
                >
                    {form.formState.isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
                    {form.formState.isSubmitting ? '' : <Mails size={64}/>}
                </Button>
              </div>
          </form>
          </Form>
        </div>
    </div>
  );
};
