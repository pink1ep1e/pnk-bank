export const fetchLastOperations = async (userId: number) => {

    const response = await fetch(`/api/operations?userId=${userId}`);
    if (!response.ok) {
        throw new Error('Ошибка при получении операций');
    }
    return response.json();
};