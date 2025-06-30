import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

export const generateReceiptPDF = async (recipient: string, amount: number, comission: number, date: Date, message: string, sender: string) => {
    try {
        const fontUrl = '/fonts/GTEesti.otf'; 
        const fontResponse = await fetch(fontUrl);

        const fontUrlBold = '/fonts/GTEestiBold.otf'; 
        const fontResponseBold = await fetch(fontUrlBold);
        
        if (!fontResponse.ok) {
            throw new Error(`Ошибка загрузки шрифта: ${fontResponse.statusText}`);
        }
        
        const fontBytes = await fontResponse.arrayBuffer();
        const fontBytesBold = await fontResponseBold.arrayBuffer();

        // Загружаем логотип
        const logoUrl = '/logo-dark.png'; // Укажите URL логотипа
        const logoBytes = await fetch(logoUrl).then(res => res.arrayBuffer());

        const pechatUrl = '/pechat_no_text.png'; // Укажите URL логотипа
        const pechatBytes = await fetch(pechatUrl).then(res => res.arrayBuffer());

        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit);

        // Встраиваем шрифт с указанием кодировки
        const customFont = await pdfDoc.embedFont(fontBytes, {
            customName: 'Nunito'
        });

        const customFontBold = await pdfDoc.embedFont(fontBytesBold, {
            customName: 'GTESTI_BOLD'
        });

        const logoImage = await pdfDoc.embedPng(logoBytes);
        const pechatImage = await pdfDoc.embedPng(pechatBytes);

        const page = pdfDoc.addPage([350, 580]);

        page.drawImage(logoImage, {
            x: 50,
            y: 480,
            width: 250,
            height: 75,
        });

        page.drawText('Перевод', {
            x: 25,
            y: 440,
            size: 14,
            font: customFont,
            color: rgb(0.3, 0.3, 0.3),
        });

        page.drawText(`${date.toLocaleDateString('ru-RU')}`, {
            x: page.getWidth() - 120,
            y: 440,
            size: 14,
            font: customFont,
            color: rgb(0.3, 0.3, 0.3),
        });
        page.drawText(`${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`, {
            x: page.getWidth() - 50,
            y: 440,
            size: 14,
            font: customFont,
            color: rgb(0.3, 0.3, 0.3),
        });

        page.drawText('Итого', {
            x: 25,
            y: 407,
            size: 20,
            font: customFontBold,
            color: rgb(0, 0, 0),
        });
        
        page.drawText(`-${amount} ALM`, {
            x: page.getWidth() - 87 - customFontBold.widthOfTextAtSize(`-${amount} ALM`, 20) + 65,
            y: 407,
            size: 20,
            font: customFontBold,
        });

        page.drawLine({
            start: { x: 25, y: 390 },
            end: { x: page.getWidth() - 25, y: 390 },
            thickness: 3,
            color: rgb(0, 0, 0),
        });

        page.drawText('Статус', {
            x: 25,
            y: 365,
            size: 14,
            font: customFont,
            color: rgb(0, 0, 0),
        });

        page.drawText(`Успешно`, {
            x: page.getWidth() - 87 - customFontBold.widthOfTextAtSize(`Успешно`, 20) + 85,
            y: 365,
            size: 14,
            font: customFont,
        });

        page.drawText('Счет зачисления', {
            x: 25,
            y: 340,
            size: 14,
            font: customFont,
            color: rgb(0, 0, 0),
        });

        page.drawText(`Алмазный счет`, {
            x: page.getWidth() - 87 - customFontBold.widthOfTextAtSize(`Алмазный счет`, 20) + 105,
            y: 340,
            size: 14,
            font: customFont,
        });

        page.drawText('Сумма', {
            x: 25,
            y: 315,
            size: 14,
            font: customFont,
            color: rgb(0, 0, 0),
        });

        page.drawText(`${amount} ALM`, {
            x: page.getWidth() - 87 - customFontBold.widthOfTextAtSize(`-${amount} ALM`, 20) + 92,
            y: 315,
            size: 14,
            font: customFont,
        });

        page.drawText('Комиссия', {
            x: 25,
            y: 290,
            size: 14,
            font: customFont,
            color: rgb(0, 0, 0),
        });
        if (comission == 0) {
            page.drawText(`Без комиссии`, {
                x: page.getWidth() - 87 - customFontBold.widthOfTextAtSize(`Без комиссии`, 20) + 96,
                y: 290,
                size: 14,
                font: customFont,
            });
        } else {
            page.drawText(`${comission} ALM`, {
                x: page.getWidth() - 87 - customFontBold.widthOfTextAtSize(`${comission} ALM`, 20) + 72,
                y: 290,
                size: 14,
                font: customFont,
            });
        }

        page.drawText('Отправитель', {
            x: 25,
            y: 265,
            size: 14,
            font: customFont,
            color: rgb(0, 0, 0),
        });

        page.drawText(`${sender}`, {
            x: page.getWidth() - 87 - customFontBold.widthOfTextAtSize(`${sender}`, 20) + 85,
            y: 265,
            size: 14,
            font: customFont,
        });

        page.drawText('Получатель', {
            x: 25,
            y: 240,
            size: 14,
            font: customFont,
            color: rgb(0, 0, 0),
        });

        page.drawText(`${recipient}`, {
            x: page.getWidth() - 87 - customFontBold.widthOfTextAtSize(`${recipient}`, 20) + 73,
            y: 240,
            size: 14,
            font: customFont,
        });

        page.drawText('Банк получателя', {
            x: 25,
            y: 215,
            size: 14,
            font: customFont,
            color: rgb(0, 0, 0),
        });

        page.drawText(`pnk Банк`, {
            x: page.getWidth() - 87 - customFontBold.widthOfTextAtSize(`pnk Банк`, 20) + 85,
            y: 215,
            size: 14,
            font: customFont,
        });

        const documentNumber = Math.floor(Math.random() * 1000000000);

        page.drawText('ID операции', {
            x: 25,
            y: 190,
            size: 14,
            font: customFont,
            color: rgb(0, 0, 0),
        });

        page.drawText(`${documentNumber}`, {
            x: page.getWidth() - 87 - customFontBold.widthOfTextAtSize(`${documentNumber}`, 20) + 90,
            y: 190,
            size: 14,
            font: customFont,
        });

        page.drawLine({
            start: { x: 25, y: 175 },
            end: { x: page.getWidth() - 25, y: 175 },
            thickness: 3,
            color: rgb(0, 0, 0),
        });

        page.drawText('По вопросам зачисления средств обращаться в поддержку', {
            x: 15,
            y: 150,
            size: 12,
            font: customFont,
            color: rgb(0.3, 0.3, 0.3),
        });

        page.drawText('Служба поддержки pnk Банка: @pnk_support', {
            x: 45,
            y: 135,
            size: 12,
            font: customFont,
            color: rgb(0.3, 0.3, 0.3),
        });

        page.drawText('ОУО pnk Банк', {
            x: 115,
            y: 80,
            size: 18,
            font: customFontBold,
            color: rgb(0, 0, 0),
        });

        page.drawText('Операция выполнена', {
            x: 102,
            y: 55,
            size: 15,
            font: customFont,
            color: rgb(0, 0, 0),
        });

        page.drawText('Банк не является реальным', {
            x: 78,
            y: 35,
            size: 15,
            font: customFont,
            color: rgb(0, 0, 0),
        });

        page.drawImage(pechatImage, {
            x: 60,
            y: -50,
            width: 230,
            height: 230,
        });
        
        // Сохраняем PDF
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        // Открываем PDF в новой вкладке
        window.open(url, '_blank');
    } catch (error) {
        console.error('Ошибка при генерации PDF:', error);
    }
};