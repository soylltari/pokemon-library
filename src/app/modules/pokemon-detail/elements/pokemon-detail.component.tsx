import { useTranslations } from 'next-intl'

import { IPokemonStat } from '@/app/entities/models/pokemon.model'
import { CardContent } from '@/pkg/theme/ui/card'
import { Card } from '@/pkg/theme/ui/card'

export const StatBlock = ({ stat }: { stat: IPokemonStat }) => {
  const t = useTranslations('detail.stats')
  const label = t(stat.stat.name)
  return (
    <Card size='sm' className='flex flex-col gap-1'>
      <CardContent className='pt-3'>
        <p className='text-2xl font-bold'>{stat.base_stat}</p>
        <p className='text-muted-foreground mt-0.5'>{label}</p>
      </CardContent>
    </Card>
  )
}
