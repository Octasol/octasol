import Header from "@/components/Header";
import Landing from "@/components/Landing";

export default function Home() {
  return (
    <main className="min-h-screen w-screen flex flex-col justify-center items-center bg-black">
      <Header />
      <Landing />
    </main>
  );
}
