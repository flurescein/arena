import { AbstractEntity } from '@trixt0r/ecs'

let id = 0

export class Entity extends AbstractEntity {
  constructor() {
    super(id++)
  }
}
