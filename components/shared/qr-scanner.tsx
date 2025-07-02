"use client";

import { Scanner } from '@yudiel/react-qr-scanner';
import { Maximize, X } from "lucide-react"

export const QrScanner = ({ onClose }: { onScan: (data: string) => void, onClose: () => void }) => {
//   const [error, setError] = useState<string | null>(null);

//   const handleScan = (data: string | null) => {
//     if (data) {
//       onScan(data);
//       onClose();
//     }
//   };

//   const handleError = (err: any) => {
//     setError(err.message || 'Ошибка при сканировании QR-кода');
//   };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
      <div className="bg-white p-1 rounded-lg">
        <div className='w-[520px] h-[800px] rounded-[20px] relative'>
            <Scanner 
                onScan={(result) => console.log(result)}
                components={{
                    finder: false,  // отключаем рамку сканера
                    onOff: false,   // отключаем кнопку вкл/выкл
                    torch: false,   // отключаем кнопку фонарика
                    zoom: false     // отключаем кнопку зума
                }}
                styles={{
                    container: {
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    margin: 0,
                    borderRadius: '17px'
                    },
                    video: {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                    }
                }}
                />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] text-white z-[999999]">
                <Maximize className='stroke-[0.5]' size={400}/>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-full w-[350px] h-[370px] z-[999999] flex justify-end items-start">
                <button onClick={onClose} className=" text-white">
                    <X size={35} />
                </button>
            </div>
        </div>
        {/* {error && <p className="text-white hidden">{error}</p>} */}
      </div>
    </div>
  );
};