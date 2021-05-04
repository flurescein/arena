import { AbstractEntitySystem } from '@trixt0r/ecs'
import { HP } from '../components/HP'
import { Position } from '../components/position'
import { Side } from '../components/side'
import { Target } from '../components/target'
import { Entity } from '../entity'
import { randomFromArray } from '../helpers/util'

export class TargetSystem extends AbstractEntitySystem<Entity> {
  constructor(private chooseCount: number = 3, priority: number = 0) {
    super(priority, [Position, Target, Side])
  }

  processEntity(entity: Entity) {
    const target = entity.components.get(Target)
    const position = entity.components.get(Position)

    if (!target.entity || target.entity.components.get(HP).value <= 0) {
      const side = entity.components.get(Side).value

      const nearest = this.aspect.entities
        .filter(
          other => entity !== other && side !== other.components.get(Side).value
        )
        .map(other => {
          const otherPosition = other.components.get(Position)
          return {
            entity: other,
            distance: position.distance(otherPosition),
            position: otherPosition
          }
        })
        .sort(({ distance: a }, { distance: b }) => a - b)
        .slice(0, this.chooseCount)

      const selected = randomFromArray(nearest)

      if (selected) {
        target.entity = selected.entity
        target.distance = selected.distance
        target.direction = selected.position
          .subtract(position.x, position.y)
          .normalize()
      } else {
        target.entity = undefined
        target.distance = 0
        target.direction = Position.zero
      }
    } else {
      const targetPosition = target.entity.components.get(Position)
      target.distance = position.distance(targetPosition)
      target.direction = targetPosition
        .subtract(position.x, position.y)
        .normalize()
    }
  }
}
