'use client'

import { RegisterForm } from '@/components/shared/auth-forms/register-form';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegisterPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState(10);
  const [filledFields, setFilledFields] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const content = [
    { 
      title: 'Платежи и переводы', 
      description: 'до 100 000 ALM в месяц через систему платежей pnk Pay', 
      image: '/svg/arrows.svg' 
    },
    { 
      title: 'Быстрые переводы', 
      description: 'Мгновенные переводы между пользователями pnk Bank', 
      image: '/svg/king.svg' 
    },
    { 
      title: 'Безопасность данных', 
      description: 'Ваши данные защищены современными технологиями pnk Guard', 
      image: '/svg/pasport.svg' 
    },
  ];

  const updateProgress = (filledFieldsCount: number) => {
    let newProgress = filledFieldsCount * 35; // Например, 20% за каждое заполненное поле
    if (newProgress > 100) {
      newProgress = 100
    }
    setProgress(newProgress);
  };

  useEffect(() => {
    updateProgress(filledFields);
  }, [filledFields]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [content.length]);

  return (
    <div >
        <Link href="/">
          <div className='mt-8 mr-12 top-0 right-0 fixed z-1 bg-black p-3 rounded-[12px]'>
              <ArrowLeft className='text-white' />
          </div>
        </Link>
          <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
            <div className='flex shadow-lg rounded-[20px] border bg-gray-100 w-[370px] md:w-[1100px]'>
              <div className='bg-gray-100 rounded-l-[20px] w-[370px] p-[15px] md:p-[25px] md:w-[450px]'>
                <div className='px-[30px]'>
                  <div className="relative w-full h-[200px] perspective cursor-pointer select-none">
                      <div
                          className={`absolute w-full h-full rounded-[20px] px-[20px] py-[15px] bg-black text-white transition-transform duration-500 transform-style-3d ${
                              isFlipped ? 'rotate-y-180' : ''
                          }`}
                          onClick={() => setIsFlipped(!isFlipped)}
                      >
                          {/* Передняя сторона */}
                          <div className={`w-full h-full ${isFlipped ? 'delayed-hidden' : 'delayed-block'}`}>
                              <div className='flex items-center justify-between'>
                                <p className='font-semibold text-[35px]'>pnk банк</p>
                                <svg width="32" height="32" viewBox="0 0 12 12"><g opacity="0.5"><path d="M6 3C4.48899 3 3.23814 4.11756 3.03037 5.57106C2.99469 5.82063 2.7788 6.00461 2.52673 6.00023C2.51784 6.00008 2.50893 6 2.5 6C1.67157 6 1 6.67157 1 7.5C1 8.32843 1.67157 9 2.5 9H10C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7C9.86912 7 9.74526 7.02489 9.63204 7.06973C9.4638 7.13636 9.27268 7.10689 9.13233 6.99267C8.99198 6.87846 8.92429 6.69732 8.95535 6.51905C8.98466 6.35078 9 6.17739 9 6C9 4.34315 7.65686 3 6 3ZM2.11882 5.02888C2.55292 3.28889 4.12557 2 6 2C8.20914 2 10 3.79086 10 6C11.1046 6 12 6.89543 12 8C12 9.10457 11.1046 10 10 10H2.5C1.11929 10 0 8.88071 0 7.5C0 6.24889 0.919024 5.21243 2.11882 5.02888Z" fill="white"></path></g></svg>
                              </div>
                              <div className='flex justify-between items-center h-full'>
                                  <p className='font-semibold text-[30px]'>Start</p>
                                  <p className='font-semibold text-[30px]'>•••• 0000</p>
                              </div>
                          </div>
                          {/* Задняя сторона */}
                          <div className={`w-full h-full rotate-y-180 ${isFlipped ? 'delayed-block' : 'delayed-hidden'}`}>
                              <div className='w-full h-[60px] rounded-[8px] bg-white/10'>

                              </div>
                              <p className='font-semibold text-[30px] mt-2'>pink1ep1e</p>
                          </div>
                      </div>
                  </div>
                </div>
                <div className='bg-white mt-6 w-full shadow-sm border rounded-[20px] px-[20px] py-[15px]'>
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.1 }}
                      className='flex justify-center items-center'
                    >
                      <div className='mb-auto mr-4'>
                        <Image 
                          src={content[currentIndex].image}
                          alt="ICON"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className='text-black w-full'>
                        <h1 className='text-[19px] font-semibold'>{content[currentIndex].title}</h1>
                        <p className='text-[16px]'>{content[currentIndex].description}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <div className='rounded-[20px] border bg-white w-[370px] p-[20px] md:p-[35px] md:w-[650px]'>
                <div className='mb-6'>
                    <div className='flex justify-between items-center'>
                      <h1 className='text-[18px]'>Уже заполнено</h1>
                      <p>{progress}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
                        <div className="bg-black h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                        <div className="bg-black/20 h-2.5 rounded-full absolute top-0 left-0 transition-all duration-500" style={{ width: `${
                          progress*4 < 80 ? 
                          progress*4 
                          :  
                          progress*1.5 > 100 ? 
                          95 
                          : 
                          progress*1.5
                          }%` }}>
                        </div>
                    </div>
                </div>
                <RegisterForm onFieldChange={(filledFieldsCount) => setFilledFields(filledFieldsCount)} />
              </div>
          </div>
          <div>
            
          </div>
        </div>
    </div>
  );
}
