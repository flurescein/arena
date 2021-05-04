import { Component } from '@trixt0r/ecs'
import { Entity } from '../entity'
import { Position } from './position'

export class Target implements Component {
  constructor(
    public entity: Entity | undefined,
    public distance: number,
    public direction: Position
  ) {}
}
