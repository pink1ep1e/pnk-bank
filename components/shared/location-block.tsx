'use client';

import { cn } from "@/lib/utils";
import React, { useState } from 'react';

interface Props {
    className?: string;
}

export const LocationBlock: React.FC<Props> = ({ className }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAnimation = () => {
        setIsAnimating(!isAnimating);
    };

    return (
       <div id="location-block" className={cn("flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 mt-8 md:mt-16", className)}>
            <div className="flex flex-col p-4 md:p-8 w-full md:w-[650px] h-fit gap-2 md:gap-4">
                    <p className="text-[24px] md:text-[36px] mt-2 font-bold">Офис нашего банка  </p>
                    <p className="text-[16px] md:text-[25px] mt-2">
                        Офис нашего банка находится по координатам -1000 24 1000 на спавне сервера. Здесь вы можете пополнить свой счет, 
                        оформить кредит или воспользоваться другими банковскими услугами. 
                        <br/><br/>Также вы можете вызвать курьера для пополнения счета 
                        в любом удобном для вас месте.
                    </p>
            </div>
            <div className="md:flex flex-col md:w-[700px] h-fit releative" onClick={handleAnimation}>
                <embed src="https://map.starsmp.fun/#minecraft_overworld;flat;-70,64,-35;5" className="w-[350px] h-[300px] md:w-[700px] md:h-[500px] rounded-[25px]"></embed>
            </div>
       </div>
    )
}