"use client";

import { notFound, useParams } from "next/navigation";
import { usePokemonByIdQuery } from "@/app/entities/api";

export const PokemonDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = usePokemonByIdQuery(id as string);
  if (isLoading) return null;
  if (isError) return notFound();
  return <div>{data?.name}</div>;
};
