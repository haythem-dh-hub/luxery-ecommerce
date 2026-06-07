import AdminDashboard from "@/components/admin/AdminDashboard";
import { getAdminSnapshot } from "@/lib/store";

export const metadata = {
  title: "Admin | Toxic Man",
};

export default async function AdminPage() {
  const snapshot = await getAdminSnapshot();
  return <AdminDashboard snapshot={snapshot} />;
}
