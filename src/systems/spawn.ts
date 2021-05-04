import { Aspect, Engine, System } from '@trixt0r/ecs'
import { Kills } from '../components/kills'
import { Position } from '../components/position'
import { Side, SideValue } from '../components/side'
import { createWarrior, between, Size } from '../helpers/util'

export interface SpawnSystemOptions {
  spawnZone: Size
  maxCount: number
}

export class SpawnSystem extends System {
  private aspect: Aspect

  constructor(private options: SpawnSystemOptions, priority: number = 0) {
    super(priority)
  }

  onAddedToEngine(engine: Engine) {
    this.aspect = Aspect.for(engine).all(Position, Kills, Side)
  }

  process() {
    if (this.aspect.entities.length < this.options.maxCount) {
      const { goods, evils } = this.aspect.entities.reduce(
        ({ goods, evils }, entity) =>
          entity.components.get(Side).value === SideValue.Evil
            ? { goods, evils: evils + 1 }
            : { goods: goods + 1, evils },
        { goods: 0, evils: 0 }
      )

      const side = goods > evils ? SideValue.Evil : SideValue.Good

      const warrior = createWarrior({
        position: {
          x: between(0, this.options.spawnZone.width),
          y: between(0, this.options.spawnZone.height)
        },
        attack: between(40, 60),
        speed: between(10, 30),
        side
      })

      this.engine.entities.add(warrior)
    }
  }
}
