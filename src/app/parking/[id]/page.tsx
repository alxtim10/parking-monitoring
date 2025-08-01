import ParkingDetail from "@/components/ParkingDetail";
interface PageProps {
  params: { id: string }; // Always string from Next.js
}

export default async function page(props: { params: Promise<{ id: string }> }) {

  const { id } = await props.params;

  return (
    <section>
      <ParkingDetail />
    </section>
  )
}
