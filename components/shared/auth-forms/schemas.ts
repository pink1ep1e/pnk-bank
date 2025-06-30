"use client";

import { z } from 'zod';

export const passwordSchema = z.string().min(3, { message: 'Введите корректный пароль' });

export const formLoginSchema = z.object({
  userName: z.string().min(3, { message: 'Введите корректный никнейм' }),
  password: passwordSchema,
});

export const formCreateUserSchema = z.object({
  userName: z.string().min(3, { message: 'Введите корректный никнейм' }),
});

export const formRegisterSchema = z.object({
  userName: z.string().min(2, {
    message: "Никнейм должен содержать минимум 2 символа",
  }),
  telegram: z.string().min(2, {
    message: "Telegram должен содержать минимум 2 символа",
  }),
  discord: z.string().min(2, {
    message: "Discord должен содержать минимум 2 символа",
  }),
});

export const formTransactionSchema = z.object({
  recipientUser: z.string().min(3, { message: 'Введите корректный никнейм' }),
  amount: z.string()
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 2, { message: 'Сумма должна быть не менее 2 ALM'})
    .refine((val) => val <= 100000, { message: 'Не больше 100.000 за операцию'}),
  message: z.string().max(150, { message: 'Слишком длинное сообщение, максимум 150 символов' }),
});

export type TFormLoginData = z.infer<typeof formLoginSchema>;
export type TFormTransactionData = z.infer<typeof formTransactionSchema>;
export type TFormRegisterData = z.infer<typeof formRegisterSchema>;
export type TFormCreateUserData = z.infer<typeof formCreateUserSchema>;
