import { Aspect, Engine, System } from '@trixt0r/ecs'
import { Position } from '../components/position'
import { Stats } from '../components/stats'
import { Target } from '../components/target'

export class MoveSystem extends System {
  private aspect: Aspect

  constructor(priority: number = 0) {
    super(priority)
  }

  onAddedToEngine(engine: Engine) {
    this.aspect = Aspect.for(engine).all(Position, Stats, Target)
  }

  process(delta: number) {
    this.aspect.entities.forEach(entity => {
      const { entity: target, distance, direction } = entity.components.get(
        Target
      )
      const { attackDistance, speed } = entity.components.get(Stats).value

      if (target && distance > attackDistance) {
        const move = direction.multiply(speed * delta)
        const position = entity.components.get(Position)
        position.x += move.x
        position.y += move.y
      }
    })
  }
}
