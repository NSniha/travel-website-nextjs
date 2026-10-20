import { notFound } from "next/navigation";
import TripHero from "@/components/trip/TripHero";
import TripCategories from "@/components/trip/TripCategories";
import TripExplorer from "@/components/trip/TripExplorer";
import Footer from "@/components/layout/Footer";
import { tripCategories } from "@/data/tripPage";

export function generateStaticParams() {
  return tripCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = tripCategories.find((item) => item.slug === slug);

  if (!category) return { title: "Category Not Found | WAYLUME" };

  return {
    title: `${category.title} | WAYLUME`,
    description: category.description,
  };
}

export default async function TripCategoryPage({ params }) {
  const { slug } = await params;
  const category = tripCategories.find((item) => item.slug === slug);

  if (!category) notFound();

  return (
    <main>
      <TripHero title={category.title} description={category.description} image={category.image} imageAlt={category.alt} />
      <TripCategories activeCategoryId={category.id} />
      <TripExplorer categoryId={category.id} heading={`${category.title} Journeys`} />
      <Footer />
    </main>
  );
}