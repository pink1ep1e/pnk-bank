'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { CircleHelp, CircleUserRound, Shield, HandCoins, Menu, Nfc, PanelBottomOpen, Star, User, Wallet, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function LandingPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hint, setHint] = useState<string>('');

  const hints = [
    "Откройте карту без комиссий!",
    "Пользуйтесь услугами банка 24/7.",
    "Переводите деньги без комиссий.",
    "Оплачивайте услуги через приложение.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * hints.length);
      setHint(hints[randomIndex]);
    }, 2000); // Меняем подсказку каждые 5 секунд
  
    return () => clearInterval(interval);
  }, [hints]);

  const download = () => {
    toast({
        variant: "destructive",
        title: "О-о-о! Что-то пошло не так.",
        description: `В разработке...`,
      })
  }

    const activeClick = (id: string) => {
        setBackgroundColor(id)
    };

    const handleButtonClick = (route: string) => {
        setIsLoading(true);
        router.push(route)
      };
      useEffect(() => {
        AOS.init({
          duration: 800, // Длительность анимации
          once: false, // Анимация только один раз
        });
      }, []);

  return (
    <div style={{overflow: 'hidden'}}>
        {isLoading && (
            <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-[9999]">
                <div className='flex flex-col items-center justify-center'>
                    <div className="flex items-center font-semibold text-[45px] md:text-[80px] gap-2 select-none">
                        <h1>pnk</h1>
                        <h1>банк</h1>
                    </div>
                    <div className="animate-spin rounded-full mt-10 h-32 w-32 border-t-4 border-b-4 border-black"></div>
                    <div className="mt-16 text-xl text-center">
                        {hint}
                    </div>
                </div>
            </div>
        )}
        <div className={`mx-auto m-auto items-center justify-center flex flex-col p-12`} style={{ backgroundImage: "url('/landing/background.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="flex justify-center fixed top-5 left-0 right-0 z-50 w-full md:h-24 transition-all">
                <div className='flex flex-col md:flex-row w-fit border bg-white bg-gradient-to-br from-black/5 to-black/0 rounded-[22px] justify-between md:justify-center md:gap-10 items-center p-[13px] md:px-20 md:py-[13px] text-black transition-all'>
                    <div className='flex items-center justify-between px-[10px] w-[350px] md:w-full'>
                        <div className="flex items-center font-semibold text-[28px] md:text-[42px] gap-1 md:gap-2 select-none">
                            <h1>pnk</h1>
                            <h1>банк</h1>
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            className="md:hidden p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu size={28} />
                        </button>
                        
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-center border gap-1 text-center bg-white p-1.5 rounded-[20px] text-black transition-all font-medium md:text-[18px]">
                        <a className={`flex justify-center items-center text-black py-[8px] px-5 rounded-[14px] transition-all ${backgroundColor === 'main-block' ? 'bg-black text-white hover:bg-black/100' : 'hover:bg-black/10'}`}  onClick={() => activeClick('main-block')} href="#main-block">Главная</a>
                        <a className={`flex justify-center items-center text-black py-[8px] px-5 rounded-[14px] transition-all ${backgroundColor === 'info-block' ? 'bg-black text-white hover:bg-black/100' : 'hover:bg-black/10'}`} onClick={() => activeClick('info-block')} href="#info-block" >Информация</a>
                        <a className={`flex justify-center items-center text-black py-[8px] px-5 rounded-[14px] transition-all ${backgroundColor === 'card-block' ? 'bg-black text-white hover:bg-black/100' : 'hover:bg-black/10'}`} onClick={() => activeClick('card-block')} href="#card-block" >Получение</a>
                        <a className={`flex justify-center items-center text-black py-[8px] px-5 rounded-[14px] transition-all ${backgroundColor === 'application-block' ? 'bg-black text-white hover:bg-black/100' : 'hover:bg-black/10'}`} onClick={() => activeClick('application-block')} href="#application-block" >Приложение</a>
                    </div>
                    
                    {/* Mobile Navigation */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden mt-2 transition-all w-[350px]"  >
                            <hr />
                            <div className="flex flex-col gap-2 transition-all justify-center text-center text-[16px] leading-none" data-aos="fade-up" data-aos-duration="400">
                                <a className={`text-black py-[8px] px-5 rounded-[14px] transition-all ${backgroundColor === 'main-block' ? 'bg-black text-white hover:bg-black/100' : 'hover:bg-black/10'}`}  onClick={() => activeClick('main-block')} href="#main-block">Главная</a>
                                <a className={`text-black py-[8px] px-5 rounded-[14px] transition-all ${backgroundColor === 'info-block' ? 'bg-black text-white hover:bg-black/100' : 'hover:bg-black/10'}`} onClick={() => activeClick('info-block')} href="#info-block">Информация</a>
                                <a className={`text-black py-[8px] px-5 rounded-[14px] transition-all ${backgroundColor === 'card-block' ? 'bg-black text-white hover:bg-black/100' : 'hover:bg-black/10'}`} onClick={() => activeClick('card-block')} href="#card-block">Получение</a>
                                <a className={`text-black py-[8px] px-5 rounded-[14px] transition-all ${backgroundColor === 'application-block' ? 'bg-black text-white hover:bg-black/100' : 'hover:bg-black/10'}`} onClick={() => activeClick('application-block')} href="#application-block">Приложение</a>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2 mt-4">
                                <Button onClick={() => handleButtonClick('/register')} className="flex items-center justify-center h-[45px] text-[18px] px-6 bg-[#1e1e1e] rounded-[16px]"  data-aos="fade-left" data-aos-duration="400">Стать клиентом <Wallet width={24} height={24} /></Button>
                                <Button onClick={() => handleButtonClick('/login')} className="flex items-center justify-center h-[45px] text-[18px] rounded-[16px]" variant={'outline'} data-aos="fade-right" data-aos-duration="400">Войти <CircleUserRound width={24} height={24}/></Button>
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="hidden md:flex gap-2">
                        <Button onClick={() => handleButtonClick('/register')} className=" h-[45px] text-[18px] px-6 bg-[#1e1e1e] rounded-[16px]" >Стать клиентом <Wallet width={24} height={24} /></Button>
                        <Button onClick={() => handleButtonClick('/login')} className="h-[45px] text-[18px] rounded-[16px]" variant={'outline'}>Войти <CircleUserRound width={24} height={24}/></Button>
                    </div>
                </div>
            </div>
            <div data-aos="fade-up" id='main-block'>
                <div className='text-center leading-none mt-[120px]'>
                    <p className='text-[20px] md:text-[45px] text-black drop-shadow-lg mb-2'>Оформляй карту без комиссий</p>
                    <h1 className='text-[60px] md:mt-0 mt-4 md:text-[180px] font-bold text-black drop-shadow-lg'>Начни новую финансовую эпоху с нами!</h1>
                    <p className='text-[20px] md:mt-0 mt-8 md:text-[45px] text-black drop-shadow-lg mb-2'>Доступно с 06.06</p>
                </div>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center leading-none'>
                    <div className="w-[500px] h-[500px] bg-gradient-to-br from-white/60 to-gray-800/10 rounded-full blur-[100px]"></div>
                </div>
            </div>
        </div>

        <div>
            <div data-aos="fade-up" className='container text-[50px] md:text-[140px] font-semibold px-[20px] mt-[60px] mb-[40px] md:mt-[100px] md:mb-[80px] md:px-[250px] flex flex-col leading-none justify-start'>
                <h1>Наши</h1>
                <h1 id='info-block' className='text-white [text-shadow:_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black]'>преимущества</h1>
            </div>

            <div className='container m-auto mt-12 px-[20px] md:px-[180px] flex flex-col md:flex-row leading-none justify-start gap-12'>
                <div data-aos="fade-right" className='w-full h-[450px] md:h-[500px] bg-gradient-to-tr from-black/90 to-black/70 rounded-[25px]'>
                    <div className='p-5 md:p-8 text-white flex flex-col justify-center items-center h-full'>
                        <div className='flex-col text-center w-full'>
                            <p className='text-[20px] md:text-[25px]'>Новые условия</p>
                            <p className='text-[40px] md:text-[50px] font-bold'>Бесплатно</p>
                        </div>
                        <div className='flex flex-col  md:w-[450px]'>
                            <div className='flex justify-center items-center gap-6 mt-8 w-full'>
                                <div className='md:w-[45px] w-[35px]'>
                                    <Wallet width={45} height={45} className='md:w-[45px] w-[35px]'/>
                                </div>
                                <div className=''>
                                    <p className='text-[20px] md:text-[25px] font-semibold mb-1'>Открытие и обслуживание</p>
                                    <p className='text-[18px] md:text-[20px] text-gray-50/90'>Все полностью бесплатно и без комиссий</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center gap-6 mt-8 w-full'>
                                <div className='w-[45px]'>
                                    <User width={45} height={45} className='md:w-[45px] w-[35px]'/>
                                </div>
                                <div className=''>
                                    <p className='text-[20px] md:text-[25px] font-semibold mb-1'>Использование карты</p>
                                    <p className='text-[18px] md:text-[20px] text-gray-50/90'>Пользуйтесь без ограничений где угодно и когда угодно</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center gap-6 mt-8 w-full'>
                                <div className='w-[45px]'>
                                    <HandCoins width={45} height={45} className='md:w-[45px] w-[35px]'/>
                                </div>
                                <div className=''>
                                    <p className='text-[20px] md:text-[25px] font-semibold mb-1'>Оплата в магазинах и сервисах</p>
                                    <p className='text-[18px] md:text-[20px] text-gray-50/90'>Оплачивайте штрафы и услуги без комиссий</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-aos="fade-left" className='hidden md:flex w-full h-[500px] rounded-[25px] bg-center'>
                    <div className="relative w-full h-full flex justify-center items-center">
                        <div className="absolute bg-white w-[200px] h-[200px] blur-[100px] rounded-full"></div>
                        <div className="absolute rounded-full">
                            <div className='bg-gradient-to-br from-black/5 to-black/0 border border-black  mb-4 -rotate-12 rounded-full h-[70px] w-[450px]'></div>
                            <div className='bg-gradient-to-tr from-black/5 to-black/0 border border-black mb-4 -rotate-12 rounded-full h-[70px] w-[450px]'></div>
                            <div className='bg-gradient-to-br from-black/5 to-black/0 border border-black mb-4 -rotate-12 rounded-full h-[70px] w-[450px]'></div>
                        </div>
                        <Image 
                            src={`/landing/safe.svg`}
                            alt="AVATAR ICON"
                            width={500}
                            height={500}
                            className="relative w-full h-full"
                        />
                    </div>
                </div>
            </div>
            
            {/* БЛОК 2 */}
            <div className='container m-auto mt-12 px-[20px] md:px-[180px] flex flex-col md:flex-row leading-none justify-start gap-12'>
                <div data-aos="fade-right" className='hidden md:flex w-full h-[500px] rounded-[25px] bg-center'>
                    <div className="relative w-full h-full flex justify-center items-center">
                        <div className="absolute bg-white w-[200px] h-[200px] blur-[100px] rounded-full"></div>
                        <div className="absolute rounded-full">
                            <div className='bg-gradient-to-br from-black/90 to-black/70 mb-4 rotate-12 rounded-full h-[70px] w-[450px]'></div>
                            <div className='bg-gradient-to-br from-black/70 to-black/60 mb-4 rotate-12 rounded-full h-[70px] w-[450px]'></div>
                            <div className='bg-gradient-to-br from-black/60 to-black/90 rotate-12 rounded-full h-[70px] w-[450px]'></div>
                        </div>
                        <Image 
                            src={`/landing/pay-terminal.svg`}
                            alt="AVATAR ICON"
                            width={500}
                            height={500}
                            className="relative w-full h-full"
                        />
                    </div>
                </div>
                <div data-aos="fade-left" className='w-full h-fit md:h-[500px] border border-black bg-gradient-to-br from-black/5 to-black/0 rounded-[25px]'>
                    <div className='py-10 md:py-0 p-5 md:p-8 text-black flex flex-col justify-center items-center h-full'>
                        <div className='flex-col text-center w-full'>
                            <p className='text-[20px] md:text-[25px]'>Новые условия</p>
                            <p className='text-[40px] md:text-[50px] font-bold'>Без переплат</p>
                        </div>
                        <div className='flex flex-col  md:w-[450px]'>
                            <div className='flex justify-center items-center gap-6 mt-8 w-full'>
                                <div className='md:w-[45px] w-[35px]'>
                                    <CircleHelp width={45} height={45} className='md:w-[45px] w-[35px]'/>
                                </div>
                                <div className=''>
                                    <p className='text-[20px] md:text-[25px] font-semibold mb-1'>Поддержка и обслуживание</p>
                                    <p className='text-[18px] md:text-[20px] text-black/80'>Задавайте вопросы в поддержку в любое время</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center gap-6 mt-8 w-full'>
                                <div className='w-[45px]'>
                                    <Nfc width={45} height={45} className='md:w-[45px] w-[35px]'/>
                                </div>
                                <div className='text-start'>
                                    <p className='text-[20px] md:text-[25px] font-semibold mb-1'>Оплачивайте услуги в mодуле</p>
                                    <p className='text-[18px] md:text-[20px] text-black/80'>Используя личный кабинет где бы вы не находились можете оплатить услуги</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center gap-6 mt-8 w-full'>
                                <div className='w-[45px]'>
                                    <Star width={45} height={45} className='md:w-[45px] w-[35px]'/>
                                </div>
                                <div className=''>
                                    <p className='text-[20px] md:text-[25px] font-semibold mb-1'>А с услугами Premium </p>
                                    <p className='text-[18px] md:text-[20px] text-black/80'>Все станет еще проще, переводы без комиссий до 10 000, услуги без ограничений</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* БЛОК 3 */}
            <div className='container m-auto mt-12 px-[20px] md:px-[180px] flex flex-col md:flex-row leading-none justify-start gap-12'>
                <div data-aos="fade-right" className='w-full h-[500px] md:h-[500px] bg-gradient-to-tr from-black/90 to-black/70 rounded-[25px]'>
                    <div className='p-5 md:p-8 text-white flex flex-col justify-center items-center h-full'>
                        <div className='flex-col text-center w-full'>
                            <p className='text-[20px] md:text-[25px]'>Новые условия</p>
                            <p className='text-[40px] md:text-[50px] font-bold'>Удобно и просто</p>
                        </div>
                        <div className='flex flex-col  md:w-[450px]'>
                            <div className='flex justify-center items-center gap-6 mt-8 w-full'>
                                <div className='md:w-[45px] w-[35px]'>
                                    <PanelBottomOpen width={45} height={45} className='md:w-[45px] w-[35px]'/>
                                </div>
                                <div className=''>
                                    <p className='text-[20px] md:text-[25px] font-semibold mb-1'>Повышайте уровень</p>
                                    <p className='text-[18px] md:text-[20px] text-gray-50/90'>Переводите средства друзьям, повышайте уровень, и соревнуйтесь</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center gap-6 mt-8 w-full'>
                                <div className='w-[45px]'>
                                    <Shield width={45} height={45} className='md:w-[45px] w-[35px]'/>
                                </div>
                                <div className=''>
                                    <p className='text-[20px] md:text-[25px] font-semibold mb-1'>Безопастно переводите средства</p>
                                    <p className='text-[18px] md:text-[20px] text-gray-50/90'>Удобная система поиска по получателю не даст вам потерять деньги</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center gap-6 mt-8 w-full'>
                                <div className='w-[45px]'>
                                    <Settings width={45} height={45} className='md:w-[45px] w-[35px]'/>
                                </div>
                                <div className=''>
                                    <p className='text-[20px] md:text-[25px] font-semibold mb-1'>Настваивайте все под себя</p>
                                    <p className='text-[18px] md:text-[20px] text-gray-50/90'>Настройте подходящие условия для вашего бизнеса</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-aos="fade-left" className='hidden md:flex w-full h-[500px] rounded-[25px] bg-center'>
                    <div className="relative w-full h-full flex justify-center items-center">
                        <div className="absolute bg-white w-[200px] h-[200px] blur-[100px] rounded-full"></div>
                        <div className="absolute rounded-full">
                            <div className='bg-gradient-to-br from-black/5 to-black/0 border border-black mb-4 -rotate-12 rounded-full h-[70px] w-[450px]'></div>
                            <div className='bg-gradient-to-tr from-black/5 to-black/0 border border-black mb-4 -rotate-12 rounded-full h-[70px] w-[450px]'></div>
                            <div className='bg-gradient-to-bl from-black/5 to-black/0 border border-black -rotate-12 rounded-full h-[70px] w-[450px]'></div>
                        </div>
                        <Image 
                            src={`/landing/chart.svg`}
                            alt="AVATAR ICON"
                            width={500}
                            height={500}
                            className="relative w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </div>

       <div>
            <div data-aos="fade-up" className='container text-[140px] mt-[150px] mb-[80px] font-semibold px-[250px] flex flex-col leading-none justify-start'>
                <h1>Заказ</h1>
                <h1 id='card-block'>дебетовой</h1>
                <h1 className='text-white [text-shadow:_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black]'>pnk Карты</h1>
            </div>

            <div className='container m-auto mt-12 px-[180px] flex leading-none justify-start gap-12'>
                {/* БЛОК 1 */}
                <div data-aos="fade-right" className='w-full h-[500px] bg-gradient-to-bl from-black/90 to-black/70 rounded-[25px] relative'>
                    <div className='px-8 flex-col text-[42px] text-black py-6 flex justify-center items-center h-full'>
                        <div className='absolute -top-1/3 left-0 w-full h-full flex justify-center items-center'>
                        <Image 
                            src={`/landing/calc.svg`}
                            alt="AVATAR ICON"
                            width={400}
                            height={400}
                            className="w-[400px] object-cover"
                        />
                        </div>
                        <div className='flex flex-col justify-end items-center h-full relative z-10'>
                            <div className='flex justify-center items-center px-10 py-2 bg-white rounded-[20px]'>
                                <h1 className='font-semibold pt-1 text-[30px]'>1 шаг</h1>
                            </div>
                            <div className='flex flex-col justify-center items-center text-center pt-6'>
                                <h1 className='text-[45px] font-bold px-4 text-white'>Заполнить анкету</h1>
                                <p className='text-[20px] mt-2 text-white/90'>Заполните анкету в приложении
                                банка и получите карту в течение 24 часов
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* БЛОК 2 */}
                <div data-aos="fade-up" className='w-full h-[500px] border border-black bg-gradient-to-br from-black/5 to-black/0 rounded-[25px] relative'>
                    <div className='px-8 flex-col text-[42px] text-black py-6 flex justify-center items-center h-full'>
                        <div className='absolute -top-1/3 left-0 w-full h-full flex justify-center items-center'>
                            <Image 
                                src={`/landing/ingot.svg`}
                                alt="AVATAR ICON"
                                width={400}
                                height={400}
                                className="w-[400px] object-cover"
                            />
                        </div>
                        <div className='flex flex-col justify-end items-center h-full relative z-10'>
                            <div className='flex justify-center items-center px-10 py-2 bg-gradient-to-bl from-black/90 to-black/70 rounded-[20px]'>
                                <h1 className='font-semibold pt-1 text-[30px] text-white'>2 шаг</h1>
                            </div>
                            <div className='flex flex-col justify-center items-center text-center pt-6'>
                                <h1 className='text-[45px] font-bold px-4 text-black'>Выбрать время</h1>
                                <p className='text-[20px] mt-2 text-black/70'>Закажите pnk Карту. Доставим
                                в офис банка или курьером в любое удобное для вас время
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* БЛОК 3 */}
                <div data-aos="fade-left" className='w-full h-[500px] bg-gradient-to-bl from-black/90 to-black/70 rounded-[25px] relative'>
                    <div className='px-8 flex-col text-[42px] text-black py-6 flex justify-center items-center h-full'>
                        <div className='absolute -top-1/3 left-0 w-full h-full flex justify-center items-center'>
                            <Image 
                                src={`/landing/atm.svg`}
                                alt="AVATAR ICON"
                                width={400}
                                height={400}
                                className="w-[400px] object-cover"
                            />
                        </div>
                        <div className='flex flex-col justify-end items-center h-full relative z-10'>
                            <div className='flex justify-center items-center px-10 py-2 bg-white rounded-[20px]'>
                                <h1 className='font-semibold pt-1 text-[30px]'>3 шаг</h1>
                            </div>
                            <div className='flex flex-col justify-center items-center text-center pt-6'>
                                <h1 className='text-[45px] font-bold px-4 text-white'>Личный кабинет</h1>
                                <p className='text-[20px] mt-2 text-white/90'>Зайдите в личный кабинет и
                                пользуйтесь нашими услугами в любое время в любом месте
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div data-aos="fade-up" className='container text-[140px] mt-[150px] mb-[80px] font-semibold px-[250px] flex flex-col leading-none justify-start'>
                <h1>Мобильное</h1>
                <h1 id='application-block'>приложение</h1>
                <h1 className='text-white [text-shadow:_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black]'>pnk банка</h1>
            </div>

            <div className='container m-auto mt-12 px-[180px] flex leading-none justify-start gap-12'>
                {/* БЛОК 1 */}
                <div data-aos="fade-down" className='w-full h-[500px] border border-black bg-gradient-to-br from-black/5 to-black/0 rounded-[30px] relative'>
                    <div className='flex text-[42px] text-black h-full'>
                        <div className='flex flex-col justify-start items-start px-12 py-10'>
                            <Image 
                                src={`/logo-pnk-bank.png`}
                                alt="AVATAR ICON"
                                width={120}
                                height={120}
                                className="w-[120px] rounded-[22px] mb-12"
                            />
                            <h1 className='text-[45px] font-semibold text-black'>Мобильное приложение pnk банка</h1>
                            <p className='text-[22px] text-black/80 mt-4'>Проверяйте баланс, оплачивайте услуги, получайте помощь в чате 24/7</p>
                            <div className='flex items-center gap-4 mt-6'>
                                <Button onClick={() => download()} className="pt-0.5 h-[50px] text-[22px] rounded-[12px] px-10 bg-black" >
                                    <div className='w-[40px]'>
                                        <Image 
                                            src={`/landing/android-os.svg`}
                                            alt="AVATAR ICON"
                                            width={40}
                                            height={40}
                                            className="w-[40px]"
                                        />
                                    </div>
                                    android
                                </Button>
                                <Button onClick={() => download()} className="pt-0.5 h-[50px] text-[22px] rounded-[12px] px-10 bg-black" >
                                    <div className='w-[35px]'>
                                        <Image 
                                            src={`/landing/ios.svg`}
                                            alt="AVATAR ICON"
                                            width={35}
                                            height={35}
                                            className="w-[35px]"
                                        />
                                    </div>
                                    iOS
                                </Button>
                            </div>   
                        </div>
                        <div className='flex justify-end items-end w-[820px]'>
                            <Image 
                                src={`/landing/pnkbank-app.png`}
                                alt="AVATAR ICON"
                                width={820}
                                height={820}
                                className="w-[820px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id='developer-block'>
            <div data-aos="fade-up" className='container text-[140px] mt-[150px] mb-[80px] font-semibold px-[250px] flex flex-col leading-none justify-start'>
                <h1>Наши</h1>
                <h1 className='text-white [text-shadow:_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black,_0_0_2px_black]'>сотрудники</h1>
            </div>
            
            <div className='container m-auto mt-12 px-[180px] flex leading-none justify-start gap-12'>
                {/* БЛОК 1 */}
                <div data-aos="fade-right" className='w-full h-[500px] bg-gradient-to-bl from-black/90 to-black/70 rounded-[30px] relative'>
                    <Image 
                        src={`/landing/star-black.png`}
                        alt="AVATAR ICON"
                        width={500}
                        height={500}
                        className="absolute w-[500px] object-cover z-0"
                    />
                    <div className='px-8 flex-col text-[42px] text-white py-6 flex justify-center items-center h-full'>
                        <div className='absolute -top-36 left-0 w-full h-full flex justify-center items-center'>
                        </div>
                        <div className='flex flex-col justify-end items-center h-full relative z-10'>
                            <div className='mb-8 bg-white p-2 rounded-[30px]'>
                                <Image
                                    src={`https://minotar.net/avatar/cLown`}
                                    alt="AVATAR ICON"
                                    width={180}
                                    height={180}
                                    className="rounded-[30px]"
                                />
                            </div>
                            <div className='flex justify-center items-center px-10 py-2 bg-white text-black rounded-[20px]'>
                                <h1 className='font-bold pt-1 text-[30px]'>Deputy CEO</h1>
                            </div>
                            <div className='flex flex-col justify-center items-center text-center pt-6'>
                                <h1 className='text-[45px] font-bold px-4 text-white'>cLown</h1>
                                <p className='text-[20px] mt-2 text-white/75'>
                                    Разработчик Android
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* БЛОК 2 */}
                <div data-aos="fade-up" className='w-full -top-12 h-[500px] border border-black bg-gradient-to-br from-black/5 to-black/0 rounded-[30px] relative'>
                    <Image 
                        src={`/landing/star.png`}
                        alt="AVATAR ICON"
                        width={500}
                                    height={500}
                        className="absolute w-[500px] object-cover z-0"
                    />
                    <div className='px-8 flex-col text-[42px] text-white py-6 flex justify-center items-center h-full'>
                        <div className='absolute -top-40 left-0 w-full h-full flex justify-center items-center'>
                            <div className="absolute bg-white/50 w-[200px] h-[200px] blur-[50px] rounded-full z-30"></div>
                        </div>
                        <div className='flex flex-col justify-end items-center h-full relative z-10'>
                            <div className='mb-8 bg-black p-2 rounded-[30px]'>
                                <Image
                                    src={`https://minotar.net/avatar/pink1ep1e`}
                                    alt="AVATAR ICON"
                                    width={180}
                                    height={180}
                                    className="rounded-[30px]"
                                />
                            </div>
                            <div className='flex justify-center items-center px-10 py-2 bg-gradient-to-bl from-black/90 to-black/70 rounded-[20px]'>
                                <h1 className='font-bold pt-1 text-[30px]'>CEO</h1>
                            </div>
                            <div className='flex flex-col justify-center items-center text-center pt-6'>
                                <h1 className='text-[45px] font-bold px-4 text-black'>pink1ep1e</h1>
                                <p className='text-[20px] mt-2 text-black/80'>
                                    Разработчик WEB
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* БЛОК 3 */}
                <div data-aos="fade-left" className='w-full h-[500px] border border-black bg-gradient-to-bl from-black/90 to-black/70 rounded-[30px] relative'>

                    <Image 
                        src={`/landing/star-black-2.png`}
                        alt="AVATAR ICON"
                        width={500}
                        height={500}
                        className="absolute w-[500px] object-cover z-0"
                    />
                    <div className='px-8 flex-col text-[42px] text-white py-6 flex justify-center items-center h-full'>
                        <div className='absolute -top-36 left-0 w-full h-full flex justify-center items-center'>
                        </div>
                        <div className='flex flex-col justify-end items-center h-full relative z-10'>
                            <div className='mb-8 bg-white p-2 rounded-[30px]'>
                                <Image
                                    src={`https://minotar.net/avatar/rainblow`}
                                    alt="AVATAR ICON"
                                    width={180}
                                    height={180}
                                    className="rounded-[30px]"
                                />
                            </div>
                            <div className='flex justify-center items-center px-10 py-2 bg-white text-black rounded-[20px]'>
                                <h1 className='font-bold pt-1 text-[30px]'>Developer</h1>
                            </div>
                            <div className='flex flex-col justify-center items-center text-center pt-6'>
                                <h1 className='text-[45px] font-bold px-4 text-white'>rainblow</h1>
                                <p className='text-[20px] mt-2 text-white/75'>
                                    Разработчик WEB
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className='px-[250px] mt-[150px]'>
            <div className='border border-black bg-gradient-to-br from-black/5 to-black/0 rounded-t-[30px] px-[40px] py-[25px] flex leading-none '>
                <div className='flex flex-col'>
                    <div className='flex gap-4'>
                            <Image 
                                src='/pnk-id.png'
                                alt="AVATAR ICON"
                                width={120}
                                height={120}
                                className="rounded-[20px"
                            />
                        <div className="flex items-center md:flex-row font-semibold text-[30px] gap-1.5 select-none">
                            <h1>pnk</h1>
                            <h1>банк</h1>
                        </div>
                    </div>
                    <div className='text-[19px] mt-4'>
                        <p>
                        Данный сайт использует файлы «cookie», с целью персонализации сервисов и повышения удобства пользования веб-сайтом. «Cookie» представляют собой небольшие файлы, содержащие информацию о предыдущих посещениях веб-сайта. Если вы не хотите использовать файлы «cookie», измените настройки браузера.
                        </p>
                    </div>
                    <div className='text-[20px] mt-4 flex flex-col gap-1.5'>
                        <p className='text-[19px]'>Поддержка клиентов работает с 14:00 по 20:00, обращаться в @pnk_support (Telegram)</p>
                    </div>
                    <div className='text-[20px] mt-4 font-semibold'>
                        <p>Данный банк не являеться реальным, финансовые операции производяться по внутреигровой валюте.</p>
                    </div>
                    <div className='text-[20px] mt-16'>
                        <p>
                        2025 «ПНК Банк»
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = e.currentTarget as HTMLAnchorElement;
        const element = document.querySelector(target.getAttribute('href')!);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    });
});