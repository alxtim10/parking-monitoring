import Navbar from "@/components/Navbar";
import Nearby from "@/components/Nearby";
import Places from "@/components/Places";

export default function Home() {
  return (
    <section className="">
      <Navbar />
      <Nearby />
      <Places />
    </section>
  );
}
