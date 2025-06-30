'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const LoginButton = () => {
  const router = useRouter();
  
  const onOtherAccountClick = () => {
    router.push('/login?other=true');
  };
  
  return (
    <Button onClick={onOtherAccountClick} size={"lg"} className="ml-3 rounded-[12px] h-[50px]">
      Войти в другой аккаунт
    </Button>
  );
}; 