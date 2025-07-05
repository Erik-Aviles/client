import CategoryList from "@/components/frontend/CategoryList";
import CommunityTraining from "@/components/frontend/CommunityTraining";
import Hero from "@/components/frontend/Hero";
import MarketList from "@/components/frontend/MarketList";
import { getData } from "@/lib/getData";
import Link from "next/link";

export default async function Home() {
  const categories = await getData("categories", 3);
  return (
    <div className="min-h-screen ">
      <Hero />
      <MarketList />
      {categories.map((category) => {
        return <CategoryList key={category?.id} category={category} />;
      })}
      <CommunityTraining />

      <Link className="my-4 underline" href="/register-supplier">
        Convertirse en proveedor
      </Link>
    </div>
  );
}
// Registrar a un  proveedor
