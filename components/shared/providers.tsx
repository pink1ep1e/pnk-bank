'use client';

import React, { useEffect } from "react"
import { SessionProvider } from "next-auth/react"
import NextTopLoader from "nextjs-toploader"
// import { Toaster } from 'react-hot-toast';
import { Toaster } from "@/components/ui/toaster"

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {

      useEffect(() => {
        fetch('/api/socket');
    }, []);
    return (
        <>
          <SessionProvider>{ children }</SessionProvider>
          <Toaster />
          <NextTopLoader />
        </>
    )
}