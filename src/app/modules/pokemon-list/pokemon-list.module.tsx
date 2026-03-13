"use client";

import { useCallback } from "react";

import { usePokemonListQuery } from "@/app/entities/api";
import { useIntersection } from "@/app/shared/hooks";

import { PokemonCard } from "./elements";

const getPokemonId = (url: string): number => {
  const parts = url.split("/").filter(Boolean);
  return Number(parts[parts.length - 1]);
};

export const PokemonListModule = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePokemonListQuery();

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useIntersection(handleIntersect);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-muted-foreground">Loading Pokemon...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-destructive">
          Failed to load Pokemon. Please try again.
        </p>
      </div>
    );
  }

  const pokemon = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {pokemon.map(({ name, url }) => {
          const id = getPokemonId(url);
          return <PokemonCard key={name} id={id} name={name} />;
        })}
      </div>

      <div ref={sentinelRef} className="mt-8 flex justify-center py-6">
        {isFetchingNextPage && (
          <p className="text-sm text-muted-foreground">Loading more...</p>
        )}
        {!hasNextPage && pokemon.length > 0 && (
          <p className="text-sm text-muted-foreground">
            All {pokemon.length} Pokemon loaded
          </p>
        )}
      </div>
    </div>
  );
};
