'use client';

import React from 'react';
import { Ban } from 'lucide-react';

export const QRCodeLogin: React.FC = () => {

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className='flex flex-col text-[20px] justify-center items-center'>
                <Ban size={150}/>
                <p className='mt-[20px]'>В разработке </p> 
            </div>
        </div>
    );
}; 