'use client'

import { Suspense } from 'react';
import { RegisterSuccess } from '@/components/shared/auth-forms/register-success';
import { notFound, useSearchParams } from 'next/navigation';

function RegisterSuccessContent() {
  const searchParams = useSearchParams();

  // Достаем данные из query параметров
  const userName = searchParams.get('userName');
  const telegram = searchParams.get('telegram');
  const discord = searchParams.get('discord');

  if (!userName || !telegram || !discord) {
    return notFound();
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
        {/* Заголовок */}
        <div className="flex items-center justify-center font-semibold text-[48px] gap-2 select-none">
          <h1>pnk</h1>
          <h1>банк</h1>
        </div>
        <RegisterSuccess userName={userName} telegram={telegram} discord={discord} />
      </div>
    </div>
  );
}

export default function RegisterSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterSuccessContent />
    </Suspense>
  );
}
