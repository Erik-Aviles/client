import Link from "next/link";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import Hero from "@/components/frontend/Hero";
import { authOptions } from "@/lib/authOptions";
import MarketList from "@/components/frontend/MarketList";
import CategoryList from "@/components/frontend/CategoryList";
import CommunityTraining from "@/components/frontend/CommunityTraining";

export default async function Home() {
  const categoriesData = await getData("categories");
  const categories = categoriesData.filter((category) => {
    if (!category) return false;
    const isActive = category.isActive ?? true;
    const productCount = category.products?.length ?? 0;
    return isActive && productCount >= 4;
  });

  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen">
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
