import { Engine } from '@trixt0r/ecs'
import { TargetSystem } from './systems/target'
import { loop } from './helpers/loop'
import { RenderSystem } from './systems/render'
import { MoveSystem } from './systems/move'
import { AttackSystem } from './systems/attack'
import { DieSystem } from './systems/die'
import { SpawnSystem } from './systems/spawn'
import { sizeFromRatio } from './helpers/util'

const engine = new Engine()
const svg = document.querySelector('svg')

const ratio = window.innerHeight / window.innerWidth
const size = sizeFromRatio(ratio, 300)

engine.systems.add(
  new TargetSystem(),
  new RenderSystem(svg, size),
  new MoveSystem(),
  new AttackSystem(),
  new DieSystem({
    evil: document.querySelector('.evil.count'),
    good: document.querySelector('.good.count')
  }),
  new SpawnSystem({ spawnZone: size, maxCount: 30 })
)

loop(delta => {
  const deltaInSeconds = delta / 1000
  if (deltaInSeconds < 10) {
    engine.run(deltaInSeconds)
  }
})
