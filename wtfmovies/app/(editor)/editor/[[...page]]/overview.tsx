import AdminDashboard from "~/components/AdminDashboard";
import { getNumberStatistical } from "~/libs/getData/admin";
export default async function OverView() {

    const numStatistical = await getNumberStatistical();

    return <AdminDashboard numStatistical={numStatistical} />;
}