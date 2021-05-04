import { AbstractEntitySystem } from '@trixt0r/ecs'
import { HP } from '../components/HP'
import { Element } from '../components/Element'
import { Entity } from '../entity'
import { Side, SideValue } from '../components/side'
import { incNodeText } from '../helpers/util'

interface DieCountElements {
  evil: HTMLSpanElement
  good: HTMLSpanElement
}

export class DieSystem extends AbstractEntitySystem<Entity> {
  constructor(private countElements: DieCountElements, priority: number = 0) {
    super(priority, [HP, Element, Side])
  }

  processEntity(entity: Entity) {
    const hp = entity.components.get(HP).value
    if (hp <= 0) {
      const side = entity.components.get(Side).value
      if (side === SideValue.Good) {
        incNodeText(this.countElements.evil)
      } else {
        incNodeText(this.countElements.good)
      }

      entity.components.get(Element).value.remove()
      this.engine.entities.remove(entity)
    }
  }
}
