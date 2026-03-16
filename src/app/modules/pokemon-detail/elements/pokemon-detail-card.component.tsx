import { CardContent } from "@/app/shared/ui/elements/card";

import { IPokemonStat } from "@/app/entities/models/pokemon.model";
import { Card } from "@/app/shared/ui/elements/card";

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

export const StatBlock = ({ stat }: { stat: IPokemonStat }) => {
  const label = STAT_LABELS[stat.stat.name] ?? stat.stat.name;
  return (
    <Card size="sm" className="flex flex-col gap-1">
      <CardContent className="pt-3">
        <p className="text-2xl font-bold">{stat.base_stat}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </CardContent>
    </Card>
  );
};
