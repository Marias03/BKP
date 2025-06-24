import AdminLayout from "@/components/admin/Dashboard";
import AppointmentList from "@/components/admin/ApointmentList";
import prisma from "@/lib/prisma/client";
import { currentUser } from "@/lib/dal/user";

export default async function AppointmentsPage() {
  const user = await currentUser();

  if (!user) return null;

  const citas = await prisma.cita.findMany({
    include: {
      cliente: true,
    },
  });

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <AppointmentList citas={citas} />
        </div>
      </div>
    </AdminLayout>
  );
}
