export enum TrainerClass {
  Rookie = 'ROOKIE',
  Trainer = 'TRAINER',
  GymLeader = 'GYM_LEADER',
  EliteFour = 'ELITE_FOUR',
  Champion = 'CHAMPION',
}

export interface User {
  id: string
  email: string
  username: string
  displayName: string
  avatarUrl: string | null
  trainerClass: TrainerClass
  trainerCode: string
  bio: string | null
  favoriteType: string | null
  totalBattles: number
  wins: number
  losses: number
  pokemonCaught: number
  createdAt: string
  updatedAt: string
}

export interface AuthPayload {
  accessToken: string
  refreshToken: string
  user: User
  expiresIn: number
}
