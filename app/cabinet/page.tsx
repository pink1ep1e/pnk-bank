import { Cabinet } from "@/components/shared/cabinet";
import { getUserSession } from "@/lib/get-user-session";
import { LastVisitHandler } from "@/components/shared/last-visit-handler";
import { UpdateLvl } from "@/lib/update-lvl";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";

export default async function CabinetPage() {
  const session = await getUserSession();
  let admin = false;

  if (!session) {
    return redirect('/login');
  }

  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(session?.id),
    }
  })

  if (!user) {
    console.log(user)
    return redirect('/login');
  }

  const cards = await prisma.card.findFirst({
    where: {
      ownerId: parseInt(session?.id),
    }
  })

  if (!cards) {
    return redirect('/login');
  }

  const transactions = await prisma.transactions.findMany({
    where: { OR: [{ transactionSenderId: user.id }, { transactionRecipientId: user.id }] },
    orderBy: { createdAt: 'desc' },
  });

  const notifications = await prisma.notification.findMany({
    where: {
      recipientId: user.id
    }
  })

  UpdateLvl(user.id);

  if (user.role === 'ADMIN' || user.role === 'MODER') {
    admin = true;
  }

  return (
    <div className="bg-slate-50">
        <Cabinet transaction={transactions} data={user} card={cards} notifications={notifications} admin={admin}/>

        <LastVisitHandler userId={user.id} />
    </div>
  )
}
