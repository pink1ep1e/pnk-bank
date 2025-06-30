import { Transactions } from "@prisma/client";

export const calculateFees = (transactions: Transactions[]) => {
    const now = new Date();
    
    const dailyFees = transactions
      .filter((t) => new Date(t.createdAt).toDateString() === now.toDateString())
      .reduce((sum, t) => sum + (t.commission || 0), 0);
  
    // Комиссии за неделю
    const weeklyFees = transactions
      .filter((t) => {
        const transactionDate = new Date(t.createdAt);
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        return transactionDate >= startOfWeek;
      })
      .reduce((sum, t) => sum + (t.commission || 0), 0);
  
    // Комиссии за месяц
    const monthlyFees = transactions
      .filter((t) => {
        const transactionDate = new Date(t.createdAt);
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return transactionDate >= startOfMonth;
      })
      .reduce((sum, t) => sum + (t.commission || 0), 0);
    
    // За все время
    const AllTimeFees = transactions
      .reduce((sum, t) => sum + (t.commission || 0), 0);
  
    return { dailyFees, weeklyFees, monthlyFees, AllTimeFees };
};