import { AuthModal } from '@/components/shared/auth-forms/auth-modal';
import { AuthSession } from '@/components/shared/auth-forms/auth-session';
import { LoginButton } from '@/components/shared/auth-forms/login-button';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string }>
}) {
  const resolvedSearchParams = await searchParams;
  const other = resolvedSearchParams?.other || '';

  const session = await getUserSession();

  if (!session) {
    return (
        <div className='bg-slate-50'>
          <Link href="/">
            <div className='mt-8 mr-12 top-0 right-0 fixed z-1 bg-black p-3 rounded-[12px]'>
                <ArrowLeft className='text-white' />
            </div>
          </Link>
          <Image className="mt-8 ml-8 fixed z-1" src={'/pnk-id.png'} alt="PNK ID" width={105} height={35} priority />
          <div className="flex items-center justify-center h-screen">
              <AuthModal />
          </div>
        </div>
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(session?.id),
    }
  });


  return (
    <div>
        {
          !other ? (
          <div className='bg-slate-50'>
            <Link href="/">
              <div className='mt-8 mr-12 top-0 right-0 fixed z-1 bg-black p-3 rounded-[12px]'>
                  <ArrowLeft className='text-white' />
              </div>
            </Link>
            <Image className="mt-8 ml-8 fixed z-1" src={'/pnk-id.png'} alt="PNK ID" width={105} height={35} priority />
            <div className="flex items-center justify-center h-screen">
                <div className={'border bg-white shadow-xl rounded-[20px] space-y-3 w-[370px] p-[30px] md:p-[55px] md:w-[650px]'}>
                  <AuthSession userName={user?.userName} />
  
                  <div className="flex justify-center items-center pt-[15px]">
                    <LoginButton />
                  </div>
  
                  <div className="text-center text-[16px] text-black pt-3">
                    <p>Если вы не помните пароль, пожалуйста обратитесь в поддержку.</p>
                    <p className="text-gray-600">При входе в аккаунт вы подтверждаете свое согласие с <a href="/offer" className="text-primary underline">условиями использования сервиса</a>.</p>
                  </div>
                </div>
            </div>
          </div>
          )
          :
          <div className='bg-slate-50'>
            <Link href="/">
              <div className='mt-8 mr-12 top-0 right-0 fixed z-1 bg-black p-3 rounded-[12px]'>
                  <ArrowLeft className='text-white' />
              </div>
            </Link>
            <Image className="mt-8 ml-8 fixed z-1" src={'/pnk-id.png'} alt="PNK ID" width={105} height={35} priority />
            <div className="flex items-center justify-center h-screen">
                <AuthModal />
            </div>
          </div>
        }
        
    </div>
  );
}
