import { HP } from '../components/HP'
import { Kills } from '../components/kills'
import { Position } from '../components/position'
import { Side, SideValue } from '../components/side'
import { Stats } from '../components/stats'
import { Target } from '../components/target'
import { Entity } from '../entity'
import { Element } from '../components/Element'

interface WarriorOptions {
  position?: { x: number; y: number }
  hp?: number
  side?: SideValue
  attack?: number
  attackDistance?: number
  defense?: number
  speed?: number
}

export function createWarrior({
  position = { x: 0, y: 0 },
  hp = 100,
  side = SideValue.Evil,
  attack = 10,
  attackDistance = 15,
  defense = 3,
  speed = 10
}: WarriorOptions = {}) {
  const warrior = new Entity()

  const element = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  element.setAttribute('text-anchor', 'middle')
  element.setAttribute('alignment-baseline', 'middle')
  element.classList.add(side)

  warrior.components.add(
    new Position(position.x, position.y),
    new HP(hp),
    new Stats({
      maxHP: hp,
      attack,
      attackDistance,
      defense,
      speed
    }),
    new Side(side),
    new Kills(0),
    new Target(undefined, Infinity, Position.zero),
    new Element(element)
  )

  return warrior
}

export function between(min: number, max: number) {
  return min + ~~((max - min) * Math.random())
}

export function randomFromArray<T>(array: T[]) {
  return array[~~(array.length * Math.random())]
}

export function incNodeText(node: Node) {
  node.textContent = (Number(node.textContent) + 1).toString()
}

export interface Size {
  width: number
  height: number
}

export function sizeFromRatio(ratio: number, width: number): Size {
  return { width, height: width * ratio }
}
