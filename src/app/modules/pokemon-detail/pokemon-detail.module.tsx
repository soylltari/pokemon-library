"use client";

import { useParams } from "next/navigation";
import { usePokemonByIdQuery } from "@/app/entities/api";

export const PokemonDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = usePokemonByIdQuery(id as string);
  return <div>{data?.name}</div>;
};
