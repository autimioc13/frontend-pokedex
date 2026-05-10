import type { Pokemon } from './pokemon'

export enum BattleStatus {
  Waiting = 'WAITING',
  Active = 'ACTIVE',
  Finished = 'FINISHED',
  Abandoned = 'ABANDONED',
}

export enum MoveCategory {
  Physical = 'PHYSICAL',
  Special = 'SPECIAL',
  Status = 'STATUS',
}

export interface Move {
  id: number
  name: string
  nameEs: string
  type: string
  category: MoveCategory
  power: number | null
  accuracy: number | null
  pp: number
  priority: number
  description: string
}

export interface BattleParticipant {
  userId: string
  username: string
  avatarUrl: string | null
  team: Pokemon[]
  activePokemonIndex: number
  currentHp: number
}

export interface BattleRoom {
  id: string
  status: BattleStatus
  host: BattleParticipant
  challenger: BattleParticipant | null
  turn: number
  createdAt: string
  updatedAt: string
}

export interface BattleLogEntry {
  turn: number
  actorId: string
  action: string
  message: string
  timestamp: string
}
