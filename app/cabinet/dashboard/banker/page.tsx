import { Banker } from "@/components/shared/banker";
import { getUserSession } from "@/lib/get-user-session"
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
// import { AdminPanel } from "@/components/shared/admin-dashboard/admin-panel";

export default async function DashboardBanker() {
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

  if (user.role === 'USER') {
    return redirect('/cabinet');
  }

//   const Transactions = await prisma.transactions.findMany();

//   const Users =  await prisma.user.findMany();

//   const Applications =  await prisma.application.findMany();

  const Logs =  await prisma.logs.findMany();

  const bankerProfile = await prisma.courier.findFirst({
    where: {
      courierName: user.userName,
    }
  });

  if (!bankerProfile) {
    return redirect('/login');
  }

  const statistic = await prisma.replenish.findMany();


  return (
    <div className="h-full bg-slate-50" style={{ backgroundImage: "url('/landing/background.svg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <Banker logs={Logs} user={user} banker={bankerProfile} statistic={statistic}/>
    </div>
  );
}
