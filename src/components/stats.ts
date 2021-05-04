import { SingleValueComponent } from '../helpers/SingleValueComponent'

export interface StatsValue {
  maxHP: number
  attack: number
  attackDistance: number
  defense: number
  speed: number
}

export class Stats extends SingleValueComponent<StatsValue> {}
