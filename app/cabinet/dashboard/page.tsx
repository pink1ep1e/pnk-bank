import { getUserSession } from "@/lib/get-user-session"
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { AdminPanel } from "@/components/shared/admin-dashboard/admin-panel";

export default async function AccountDashboard() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/login');
  }

  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(session?.id),
    }
  });

  if (!user) {
    return redirect('/login');
  }

  if (user.role === 'USER' || 'MODER') {
    return redirect('/cabinet');
  }

  const Transactions = await prisma.transactions.findMany();

  const Users =  await prisma.user.findMany();

  const Applications =  await prisma.application.findMany();

  const Logs =  await prisma.logs.findMany();


  return (
    <div className="h-full bg-slate-50">
        <AdminPanel users={Users} transactions={Transactions} applications={Applications} sessionUser={user} logs={Logs}/>
    </div>
  );
}
