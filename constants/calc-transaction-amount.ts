import { Transactions } from "@prisma/client";

export const transactionAmount = (transactions: Transactions[]) => {
    const now = new Date();
    
    const dailyTransaction = transactions
      .filter((t) => new Date(t.createdAt).toDateString() === now.toDateString())
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  
    const weeklyTransaction = transactions
      .filter((t) => {
        const transactionDate = new Date(t.createdAt);
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        return transactionDate >= startOfWeek;
      })
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  
    const monthlyTransaction = transactions
      .filter((t) => {
        const transactionDate = new Date(t.createdAt);
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return transactionDate >= startOfMonth;
      })
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    
    const AllTimeTransaction = transactions
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  
    return { dailyTransaction, weeklyTransaction, monthlyTransaction, AllTimeTransaction  };
}
  