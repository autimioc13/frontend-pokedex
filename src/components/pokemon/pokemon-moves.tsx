import { TypeBadge } from '@/components/ui/type-badge'

const DAMAGE_CLASS_LABEL: Record<string, string> = {
  physical: 'Físico',
  special: 'Especial',
  status: 'Estado',
}

interface Move {
  level: number
  pokemon_v2_move: {
    name: string
    power: number | null
    accuracy: number | null
    pp: number | null
    pokemon_v2_type: { name: string } | null
    pokemon_v2_movedamageclass: { name: string } | null
  }
}

interface PokemonMovesProps {
  moves: Move[]
}

export function PokemonMoves({ moves }: PokemonMovesProps) {
  const seen = new Set<string>()
  const unique = moves.filter(({ pokemon_v2_move: m }) => {
    if (seen.has(m.name)) return false
    seen.add(m.name)
    return true
  })

  if (unique.length === 0) return null

  return (
    <section aria-label="Movimientos">
      <h2 className="mb-3 text-xs font-semibold tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
        Movimientos
      </h2>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full min-w-120 text-sm">
          <caption className="sr-only">Movimientos aprendidos</caption>
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
              {['Nv.', 'Movimiento', 'Tipo', 'Cat.', 'POD', 'PREC', 'PP'].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500 last:text-right nth-[n+5]:text-right dark:text-zinc-400"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {unique.map(({ level, pokemon_v2_move: m }) => (
              <tr
                key={m.name}
                className="bg-white hover:bg-zinc-50/50 dark:bg-zinc-950 dark:hover:bg-zinc-900/50"
              >
                <td className="px-4 py-2.5 font-mono text-xs text-zinc-500 tabular-nums">
                  {level === 0 ? '—' : level}
                </td>
                <td className="px-4 py-2.5 font-medium text-zinc-900 capitalize dark:text-zinc-100">
                  {m.name.replace(/-/g, ' ')}
                </td>
                <td className="px-4 py-2.5">
                  {m.pokemon_v2_type && (
                    <TypeBadge type={m.pokemon_v2_type.name} size="sm" />
                  )}
                </td>
                <td className="px-4 py-2.5 text-xs text-zinc-500 dark:text-zinc-400">
                  {m.pokemon_v2_movedamageclass
                    ? (DAMAGE_CLASS_LABEL[m.pokemon_v2_movedamageclass.name] ??
                      m.pokemon_v2_movedamageclass.name)
                    : '—'}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-xs text-zinc-700 tabular-nums dark:text-zinc-300">
                  {m.power ?? '—'}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-xs text-zinc-700 tabular-nums dark:text-zinc-300">
                  {m.accuracy != null ? `${m.accuracy}%` : '—'}
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-xs text-zinc-700 tabular-nums dark:text-zinc-300">
                  {m.pp ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
