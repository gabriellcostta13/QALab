import DashboardClient, { type View } from "./dashboard-client";

const views: View[] = ["dashboard", "tests", "bugs"];

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const params = await searchParams;
  const requestedView = params.view as View | undefined;
  const initialView = requestedView && views.includes(requestedView) ? requestedView : "dashboard";

  return <DashboardClient initialView={initialView} />;
}
