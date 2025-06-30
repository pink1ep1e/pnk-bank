// 'use client';

// import { useSpring, animated } from '@react-spring/web';
// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { Plus } from 'lucide-react';

// interface Props {
//     isOpen: boolean;
//     onClose: () => void;
// }

// export const RemittanceModal: React.FC<Props> = ({ isOpen, onClose }) => {
//     const [show, setShow] = useState(isOpen);

//     const animation = useSpring({
//         opacity: show ? 1 : 0,
//         transform: show ? 'translateY(0)' : 'translateY(-50px)',
//         config: { tension: 100, friction: 8 },
//     });

//     useEffect(() => {
//         if (isOpen) {
//             setShow(true);
//         }
//     }, [isOpen]);

//     const onCloseWindow = () => {
//         setShow(false);
//         onClose();
//     }

//     if (!isOpen) return null;

//     return (
//         <div 
//             className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
//             onClick={onCloseWindow}
//         >
//             <animated.div
//                 style={animation}
//                 className="fixed  flex items-center justify-center "
//                 onClick={(e: React.MouseEvent) => e.stopPropagation()}
//             >
//                 <div className='flex flex-col'>
//                     <div className="flex justify-center bg-white rounded-[20px] w-[1200px] shadow-lg p-8 mb-6">
//                         <div className='h-full w-[450px]'>
//                             <h1 className="text-[25px] font-bold mb-4">Пополнение счета</h1>
//                             <p className="text-[18px] lg:text-[18px] text-left font-regular">
//                                 Для пополнения счета вы можете договориться с банкиром о встрече или посетить офис банка. 
//                                 <br/>Также вы можете оставить алмазы в сундуке, чтобы банкир забрал их и пополнил ваш счет. 
//                                 <br/>Вызов банкира на место оплачивается в размере 5 ALM. 
//                                 <br/>Если вы не оставили оплату для банкира, он изымет плату из вашего пополнения.
//                             </p>
//                             <p className="text-[18px] lg:text-[18px] text-left font-regular">
//                                 В случае возникновения проблем с пополнением счета, пожалуйста, обратитесь к любому из доступных банкиров или в службу поддержки. Мы постараемся решить вашу проблему в кратчайшие сроки.
//                             </p>
//                         </div>
//                         <div className='w-[800px] min-h-[300px]'>
//                             <h1 className="text-[25px] font-bold mb-4">Банкиры pnk банка</h1>
//                             <div className='grid grid-cols-4 gap-10 items-center'>
//                                 <div className='flex items-center justify-center flex-col'>
//                                     <Image 
//                                         src={`https://minotar.net/avatar/pink1ep1e`}
//                                         alt="AVATAR ICON"
//                                         width={100}
//                                         height={100}
//                                         className="rounded-[12px]"
//                                     />
//                                     <h1 className='text-[25px] font-bold'>pink1ep1e</h1>
//                                     <p className='text-[20px] font-regular'>pink1e_pie.</p>
//                                 </div>
//                                 <div className='flex items-center justify-center flex-col'>
//                                     <Image 
//                                         src={`https://minotar.net/avatar/cLown`}
//                                         alt="AVATAR ICON"
//                                         width={100}
//                                         height={100}
//                                         className="rounded-[12px]"
//                                     />
//                                     <h1 className='text-[25px] font-bold'>cLown</h1>
//                                     <p className='text-[20px] font-regular'>cLown_aaaaa</p>
//                                 </div>
//                                 <div className='flex items-center justify-center flex-col'>
//                                     <Image 
//                                         src={`https://minotar.net/avatar/re1nly`}
//                                         alt="AVATAR ICON"
//                                         width={100}
//                                         height={100}
//                                         className="rounded-[12px]"
//                                     />
//                                     <h1 className='text-[25px] font-bold'>re1nly</h1>
//                                     <p className='text-[20px] font-regular'>re1nly.i</p>
//                                 </div>
//                                 <div className='flex items-center justify-center flex-col'>
//                                     <Image 
//                                         src={`https://minotar.net/avatar/tester`}
//                                         alt="AVATAR ICON"
//                                         width={100}
//                                         height={100}
//                                         className="rounded-[12px]"
//                                     />
//                                     <h1 className='text-[25px] font-bold'>tester</h1>
//                                     <p className='text-[20px] font-regular'>tester</p>
//                                 </div>
//                                 <div className='flex items-center justify-center flex-col cursor-pointer hover:scale-105 select-none transition-transform duration-200'>
//                                     <div className='w-[100px] h-[100px] bg-[#F5F7FA] rounded-[20px] flex items-center justify-center'>
//                                         <Plus width={50} height={50}/>
//                                     </div>
//                                     <h1 className='text-[18px] font-regular mt-4'>Cтать банкиром</h1>
//                                     {/* <p className='text-[20px] font-regular'>банкиром</p> */}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div onClick={onCloseWindow} className="flex items-start justify-center bg-white rounded-[20px] w-[1200px] shadow-lg p-10 gap-4">
//                         <div className="flex flex-col w-full">
//                             <p className="text-[24px] md:text-[25px] mt-2 font-bold">Офис нашего банка  </p>
//                             <p className="text-[16px] md:text-[18px] mt-2">
//                                 Офис нашего банка находится по координатам -1000 24 1000 на спавне сервера. Здесь вы можете пополнить свой счет, 
//                                 оформить кредит или воспользоваться другими банковскими услугами. 
//                                 <br/><br/>Также вы можете вызвать курьера для пополнения счета 
//                                 в любом удобном для вас месте.
//                             </p>
//                         </div>
//                         <div className="md:flex flex-col md:w-[600px] h-fit releative">
//                             <embed src="https://map.starsmp.fun/#minecraft_overworld;flat;-70,64,-35;5" className="w-[250px] h-[200px] md:w-[550px] md:h-[300px] rounded-[25px]"></embed>
//                         </div>
//                     </div>
//                 </div>
//             </animated.div>
//         </div>
//     );
// }; 
