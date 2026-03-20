"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/pkg/theme/ui/card";
import { Badge } from "@/pkg/theme/ui/badge";
import { StatBlock, TYPE_COLORS } from "./elements";
import { Link } from "@/pkg/locale";
import { Button } from "@/pkg/theme/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { IPokemonDetails } from "@/app/entities/models/pokemon.model";

interface IPokemonDetailProps {
  pokemon: IPokemonDetails;
}

export const PokemonDetail = ({ pokemon }: IPokemonDetailProps) => {
  const t = useTranslations("detail");

  const artwork =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default;

  return (
    <div className="px-4 md:px-10 py-4 md:py-6 max-w-7xl mx-auto">
      <div className="mb-4">
        <Link href="/items">
          <Button
            variant="ghost"
            size="sm"
            className="px-2 gap-1.5 text-muted-foreground"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>{t("back")}</span>
          </Button>
        </Link>
      </div>

      <section className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="relative shrink-0 flex items-center justify-center w-72 h-72 md:w-96 md:h-96">
          <div className="absolute inset-0 rounded-full bg-accent" />
          {artwork && (
            <Image
              src={artwork}
              alt={pokemon.name}
              width={320}
              height={320}
              className="relative z-10 object-contain w-full h-full drop-shadow-xl"
              priority
            />
          )}
        </div>

        <div className="flex flex-col gap-6 flex-1 min-w-0">
          <div>
            <p className="font-medium text-muted-foreground mb-1">
              #{String(pokemon.id).padStart(3, "0")}
            </p>
            <h1>{pokemon.name}</h1>

            {pokemon.types && (
              <div className="flex gap-2 mt-3">
                {pokemon.types.map(({ type }) => (
                  <Badge
                    key={type.name}
                    variant="outline"
                    className={`capitalize px-2.5 py-0.5 border ${TYPE_COLORS[type.name] ?? ""}`}
                  >
                    {type.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Card size="sm">
              <CardContent className="pt-3">
                <p className="text-2xl font-bold">{pokemon.height / 10}m</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {t("height")}
                </p>
              </CardContent>
            </Card>
            <Card size="sm">
              <CardContent className="pt-3">
                <p className="text-2xl font-bold">{pokemon.weight / 10}kg</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {t("weight")}
                </p>
              </CardContent>
            </Card>
            <Card size="sm">
              <CardContent className="pt-3">
                <p className="text-2xl font-bold">{pokemon.base_experience}</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {t("baseExperience")}
                </p>
              </CardContent>
            </Card>
          </div>

          {pokemon.stats && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium uppercase tracking-wider">
                    {t("baseStats")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {pokemon.stats.map((stat) => (
                      <StatBlock key={stat.stat.name} stat={stat} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {pokemon.abilities && (
            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium uppercase tracking-wider">
                  {t("abilities")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map(({ ability, is_hidden }) => (
                    <Badge
                      key={ability.name}
                      variant="outline"
                      className="capitalize"
                    >
                      {ability.name}
                      {is_hidden && (
                        <span className="ml-1 text-muted-foreground text-[10px]">
                          {t("hiddenLabel")}
                        </span>
                      )}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};
