import AdminLayout from "@/components/admin/Dashboard";
import { currentUser } from "@/lib/dal/user";

export default async function AdminDashboard() {
  const user = await currentUser();

  if (user?.role === "admin")
    return (
      <>
        <AdminLayout>
          <h1> Это ваша рабочая панель!</h1>
        </AdminLayout>
      </>
    );

  return <h1> not authorized </h1>;
}
