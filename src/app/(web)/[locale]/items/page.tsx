import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import {
  fetchPokemonList,
  POKEMON_QUERY_KEY,
} from "@/app/entities/api/pokemon/pokemon.api";
import { PokemonListModule } from "@/app/modules/pokemon-list";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600;

const PokemonItemsPage = async () => {
  const t = await getTranslations("library");
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: POKEMON_QUERY_KEY,
    queryFn: ({ pageParam }) => fetchPokemonList(pageParam as number),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1 className="text-5xl">{t("title")}</h1>
      <PokemonListModule />
    </HydrationBoundary>
  );
};
export default PokemonItemsPage;
