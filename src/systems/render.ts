import { AbstractEntitySystem } from '@trixt0r/ecs'
import { Element } from '../components/Element'
import { Kills } from '../components/kills'
import { Position } from '../components/position'
import { Entity } from '../entity'
import { Size } from '../helpers/util'

export class RenderSystem extends AbstractEntitySystem<Entity> {
  constructor(
    private svg: SVGSVGElement,
    private size: Size,
    priority: number = 0
  ) {
    super(priority, [Element, Position, Kills])
    this.svg.setAttribute('viewBox', `0 0 ${size.width} ${size.height}`)
  }

  processEntity(entity: Entity) {
    const element = entity.components.get(Element).value

    if (!this.svg.contains(element)) {
      this.svg.appendChild(element)
    }

    const position = entity.components.get(Position)
    const kills = entity.components.get(Kills).value
    element.setAttribute('x', position.x.toString())
    element.setAttribute('y', position.y.toString())
    element.textContent = kills.toString()
  }
}
