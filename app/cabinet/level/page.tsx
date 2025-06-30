import { AccountLvlDetails } from "@/components/shared/cabinet-details/account-lvl-details";
import { getUserSession } from "@/lib/get-user-session"
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";

export default async function AccountLvlPage() {
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

  const level = await prisma.level.findMany();

  const UserTopLvl = await prisma.user.findMany({
    select: {
      userName: true,
      lvl: true,
      xp: true,
    }
  });

  return (
    <div>
      <AccountLvlDetails user={user} level={level} userTopLvl={UserTopLvl}/>
    </div>
  );
}
