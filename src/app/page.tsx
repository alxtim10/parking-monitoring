import Navbar from "@/components/Navbar";
import Nearby from "@/components/Nearby";
import Places from "@/components/Places";

export default function Home() {
  return (
    <section className="p-5 pb-10">
      <Navbar />
      <Nearby />
      <Places />
    </section>
  );
}
