import AdminLayout from "@/components/admin/Dashboard";
import { currentUser } from "@/lib/dal/user";
import UserList from "@/components/admin/UserList";
import prisma from "@/lib/prisma/client";

export default async function UsersPage() {
  const user = await currentUser();

  if (!user) return null;

  const users = await prisma.user.findMany({
    include: {
      citas: true,
      registraciones: true,
      cmedicos: true,
      passports: true,
      fingerPrints: true,
      visas: true,
      visaPayments: true,
    },
  });

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Users</h1>
        <div className="bg-white rounded-lg shadow p-6"></div>
        <UserList users={users} />
      </div>
    </AdminLayout>
  );
}
