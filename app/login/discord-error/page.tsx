import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function LoginPage({}) {


  return (
    <div>
          <div className='bg-slate-50'>
            <Link href="/">
              <div className='mt-8 mr-12 top-0 right-0 fixed z-1 bg-black p-3 rounded-[12px]'>
                  <ArrowLeft className='text-white' />
              </div>
            </Link>
            <Image className="mt-8 ml-8 fixed z-1" src={'/pnk-id.png'} alt="PNK ID" width={105} height={35} priority />
            <div className="flex items-center justify-center h-screen">
                <div className={'border border-red-400 bg-red-50 shadow-xl rounded-[20px] space-y-3 w-[370px] p-[30px] md:p-[55px] md:w-[650px]'}>
                    <div className='text-center text-[18px]'>
                        <p>Ваш аккаунт Discord не привязан к Star SMP. Пожалуйста, сначала зайдите на сервер и выполните привязку Discord. После этого вернитесь на страницу входа. Если возникнут вопросы, обратитесь в поддержку: DISCORD: pnk_bank</p>
                    </div>
                </div>
            </div>
          </div>
    </div>
  );
}
