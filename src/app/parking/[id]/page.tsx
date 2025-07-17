import ParkingDetail from "@/components/ParkingDetail";
import { places } from "@/constants";
import { ArrowLeft } from "lucide-react";


export default function page({ params }: { params: { id: number } }) {

  let { id } = params;

  return (
    <section>
      {id && (
        <ParkingDetail id={id} />
      )}
    </section>
  )
}
