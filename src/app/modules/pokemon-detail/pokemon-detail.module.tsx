"use client";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { usePokemonByIdQuery } from "@/app/entities/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/shared/ui/elements/card";
import { Badge } from "@/app/shared/ui/elements/badge";
import { StatBlock, TYPE_COLORS } from "./elements";
import { Link } from "@/i18n/navigation";
import { Button } from "@/app/shared/ui/elements/button";
import { ArrowLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export const PokemonDetail = () => {
  const { id } = useParams();
  const t = useTranslations("detail");
  const { data, isLoading, isError } = usePokemonByIdQuery(id as string);

  if (isLoading) return null;
  if (isError) return notFound();
  if (!data) return null;

  const artwork =
    data.sprites.other["official-artwork"].front_default ??
    data.sprites.front_default;

  return (
    <div className="px-4 md:px-10 py-6 md:py-8">
      <div className="mb-4">
        <Link href="/items">
          <Button
            variant="ghost"
            size="sm"
            className="px-2 gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>{t("back")}</span>
          </Button>
        </Link>
      </div>

      <section className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="relative shrink-0 flex items-center justify-center w-72 h-72 md:w-96 md:h-96">
          <div className="absolute inset-0 rounded-full bg-muted" />
          {artwork && (
            <Image
              src={artwork}
              alt={data.name}
              width={320}
              height={320}
              className="relative z-10 object-contain w-full h-full drop-shadow-xl"
              priority
            />
          )}
        </div>

        <div className="flex flex-col gap-6 flex-1 min-w-0">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              #{String(data.id).padStart(3, "0")}
            </p>
            <h1 className="capitalize text-4xl md:text-5xl font-bold tracking-tight">
              {data.name}
            </h1>

            {data.types && (
              <div className="flex gap-2 mt-3">
                {data.types.map(({ type }) => (
                  <Badge
                    key={type.name}
                    variant="outline"
                    className={`capitalize text-xs px-2.5 py-0.5 border ${TYPE_COLORS[type.name] ?? ""}`}
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
                <p className="text-2xl font-bold">{data.height / 10}m</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t("height")}
                </p>
              </CardContent>
            </Card>
            <Card size="sm">
              <CardContent className="pt-3">
                <p className="text-2xl font-bold">{data.weight / 10}kg</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t("weight")}
                </p>
              </CardContent>
            </Card>
            <Card size="sm">
              <CardContent className="pt-3">
                <p className="text-2xl font-bold">{data.base_experience}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t("baseExperience")}
                </p>
              </CardContent>
            </Card>
          </div>

          {data.stats && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    {t("baseStats")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {data.stats.map((stat) => (
                      <StatBlock key={stat.stat.name} stat={stat} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {data.abilities && (
            <Card size="sm">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                  {t("abilities")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {data.abilities.map(({ ability, is_hidden }) => (
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
