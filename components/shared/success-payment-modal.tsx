'use client';

import { Check, ChevronRight, ReceiptText, Notebook, Forward } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { generateReceiptPDF } from '../../lib/generate-receipt-pdf'

interface Props {
    isOpen: boolean;
    recipient: string;
    comission: number;
    amount: number;
    message: string;
    sender: string;
    date: Date;
    onClose: () => void;
}

export const SuccessPaymentModal: React.FC<Props> = ({ isOpen, onClose, recipient, comission, amount, date, message, sender}) => {
    const [show, setShow] = useState(isOpen);
    const [showCheck, setShowCheck] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [isOpenDetails, setIsOpenDetails] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShow(true);
            setShowLoader(true);
            const timer = setTimeout(() => {
                setShowLoader(false);
                setShowCheck(true); 
            }, 2000); 
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const onCloseWindow = () => {
        setShowCheck(false); 
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div
                className="fixed inset-0 flex items-center justify-center z-50"
                style={{
                    opacity: show ? 1 : 0,
                    transform: show ? 'translateY(0)' : 'translateY(-50px)',
                    transition: 'opacity 0.3s, transform 0.3s',
                }}
            >
                <div className="bg-white rounded-[20px] w-[470px] shadow-lg text-center">
                    <div className='bg-primary/5 p-8 border rounded-[20px] h-[350px] flex flex-col items-center justify-center'>
                        <div className="relative w-[130px] h-[130px]">
                            {showLoader && (
                                <div 
                                    className="absolute inset-0 flex items-center justify-center"
                                    style={{
                                        opacity: showLoader ? 1 : 0,
                                        transform: showLoader ? 'scale(1)' : 'scale(0)',
                                        transition: 'opacity 0.1s, transform 0.1s',
                                    }}
                                >
                                    <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
                                </div>
                            )}
                            {!showLoader && (
                                <div 
                                    className="absolute inset-0"
                                    style={{
                                        opacity: showCheck ? 1 : 0,
                                        transform: showCheck ? 'scale(1)' : 'scale(0)',
                                        transition: 'opacity 0.1s, transform 0.1s',
                                    }}
                                >
                                    <div className='bg-gray-300/50 p-6 m-1 rounded-[28px]'>
                                        <div className='bg-gray-500/50 p-4 rounded-[20px]'>
                                            <div className='bg-black/40 p-2 rounded-[12px]'>
                                                <Check className="w-full h-full text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <h2 className="text-[25px] font-bold pb-1 pt-3">Перевод доставлен</h2>
                        <div className='flex items-center justify-center gap-2'>
                            <p className='text-[42px] font-bold leading-none'>-{amount.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, '|').replace(/\./g, ',').replace(/\|/g, '.')}</p>
                            <p className='text-[30px] font-bold mb-3'>ALM</p>
                        </div>
                        <p className="font-semibold text-[25px] -mt-2 pb-4">{recipient}</p>
                    </div>
                    <div className='bg-white rounded-[30px] border p-2 -mt-10 pt-2'>
                        <div className="rounded-[20px] gap-4 p-[10px] lg:p-[20px]">
                            <div onClick={() => generateReceiptPDF(recipient, amount, comission, date, message, sender)} className="flex cursor-pointer hover:bg-primary/5 rounded-[12px] p-4 justify-start items-center gap-4">
                                <ReceiptText className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]"/>
                                <div className="items-center"> 
                                    <p className="text-[18px] lg:text-[20px] text-left font-regular">Сохранить чек</p>
                                </div>
                                <div className="flex justify-end items-end ml-auto">
                                    <ChevronRight className="pr-auto" size={20}/>
                                </div>
                            </div>
                            <div className="flex cursor-pointer hover:bg-primary/5 rounded-[12px] p-4 justify-start items-center gap-4">
                                <Forward className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]"/>    
                                <div className="items-center"> 
                                    <p className="text-[18px] lg:text-[20px] text-left font-regular">Поделиться</p>
                                </div>
                                <div className="flex justify-end items-end ml-auto">
                                    <ChevronRight className="pr-auto" size={20}/>
                                </div>
                            </div>
                            <div onClick={() => setIsOpenDetails(!isOpenDetails)} className="flex cursor-pointer hover:bg-primary/5 rounded-[12px] p-4 justify-start items-center gap-4">
                                <Notebook className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]"/>
                                <div className="items-center"> 
                                    <p className="text-[18px] lg:text-[20px] text-left font-regular">Подробности операции</p>
                                </div>
                                <div className="flex justify-end items-end ml-auto">
                                    <ChevronRight 
                                        className={`transform transition-transform ${isOpenDetails ? 'rotate-90' : 'rotate-0'}`} 
                                        size={20}
                                    />
                                </div>
                            </div>
                            <div 
                                className="h-[80px] overflow-hidden"
                                style={{
                                    height: isOpenDetails ? '90px' : '0px',
                                    opacity: isOpenDetails ? 1 : 0,
                                    transition: 'height 0.3s, opacity 0.3s',
                                }}
                            >
                                <div className="p-4 rounded-[12px] text-[17px]">
                                    <p>Комиссия: {comission.toFixed(2)} ALM</p>
                                    <p>Сообщение: {message === '' ? 'Пусто' : message}</p>
                                    <p>Дата: {date.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        <Button onClick={onCloseWindow} className="pt-3 pb-2.5 pr-20 pl-20 mt-12 mb-6 text-[20px]">
                            Вернуться на главную
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}; 
