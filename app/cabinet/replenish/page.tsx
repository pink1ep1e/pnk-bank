import { getUserSession } from "@/lib/get-user-session"
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import { Replenish } from "@/components/shared/replenish";

export default async function AccountReplenish() {
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

  const getCouriers = await prisma.courier.findMany({});


  return (
    <div className="bg-slate-50">
        <Replenish couriers={getCouriers} />
    </div>
  );
}
