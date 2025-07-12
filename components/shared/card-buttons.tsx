'use client';

import React, { useState } from "react"
import { CreditCard, ArrowBigUpDash, ScanQrCode } from 'lucide-react';
import { useRouter } from "next/navigation";
import { QrScanner } from "./qr-scanner"
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
}
export const CardButtons: React.FC<Props> = ({ className }) => {
    const router = useRouter();

    const [isScannerOpen, setIsScannerOpen] = useState(false);

    const handleScan = (data: string) => {
        console.log('Scanned data:', data);
        // Здесь можно добавить логику обработки отсканированного QR-кода
    };

    const handleCloseScanner = () => {
        setIsScannerOpen(false);
    };
    return (
            <div className={cn("flex justify-center items-center mt-2 gap-8", className)}>
                    <a className="hover:transform hover:-translate-y-0.5 transition-all will-change-transform" href="/cabinet/replenish">
                        <div className="flex flex-col justify-center items-center h-[100px] w-[105px] text-center leading-tight">
                            <div className="p-1 bg-black rounded-[18px] h-[50px] w-[105px] text-white flex justify-center items-center">
                                <CreditCard size={32}/>
                            </div>
                            <p className="mt-2 font-medium text-black text-[16px]">Пополнение карты</p>
                        </div>
                    </a>
                    <a onClick={() => router.push('/cabinet/level')} className="hover:transform hover:-translate-y-0.5 transition-all will-change-transform" href="#">
                        <div className="flex flex-col justify-center items-center h-[100px] w-[105px] text-center leading-tight">
                            <div className="p-1 bg-black rounded-[18px] h-[50px] w-[105px] text-white flex justify-center items-center">
                                <ArrowBigUpDash size={32}/>
                            </div>
                            <p className="mt-2 font-medium text-[17px]">Уровень счета</p>
                        </div>
                    </a>
                    <a className="hover:transform hover:-translate-y-0.5 transition-all will-change-transform" href="#" onClick={() => setIsScannerOpen(true)}>
                        <div className="flex flex-col justify-center items-center h-[100px] w-[105px] text-center leading-tight">
                            <div className="p-1 bg-black rounded-[18px] h-[50px] w-[105px] text-white flex justify-center items-center">
                                <ScanQrCode size={32}/>
                            </div>
                            <p className="mt-2 font-medium text-[16px]">Сканировать QR-код</p>
                        </div>
                    </a>
                {isScannerOpen && <QrScanner onScan={handleScan} onClose={handleCloseScanner} />}
            </div>
                    
    )
}