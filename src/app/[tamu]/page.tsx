import InvitationPage from "@/components/InvitationPage";

export default async function GuestPage({ params }: { params: Promise<{ tamu: string }> }) {
  const { tamu } = await params;
  const decoded = decodeURIComponent(tamu);
  return <InvitationPage tamu={decoded} />;
}
