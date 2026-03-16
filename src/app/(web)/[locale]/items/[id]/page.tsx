import type { Metadata } from "next";
import { PokemonDetail } from "@/app/modules/pokemon-detail";
import { fetchPokemonById } from "@/app/entities/api";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const t = await getTranslations("metadata");

  try {
    const pokemon = await fetchPokemonById(id);
    const capitalizedName =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    return {
      title: `${capitalizedName} - ${t("appName")}`,
      description: `${t("descriptionPrefix")} #${String(pokemon.id).padStart(3, "0")} - ${capitalizedName}`,
    };
  } catch {
    return {
      title: t("notFound.title"),
      description: t("notFound.description"),
    };
  }
};

const PokemonDetailPage = () => {
  return <PokemonDetail />;
};

export default PokemonDetailPage;
