import { Component } from '@trixt0r/ecs'

export class Position implements Component {
  constructor(public x = 0, public y = 0) {}
  add = (x: number, y: number) => new Position(this.x + x, this.y + y)
  subtract = (x: number, y: number) => this.add(-x, -y)
  multiply = (factor: number) => new Position(this.x * factor, this.y * factor)
  distance = (other: Position) =>
    Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2)
  normalize = () => {
    const magnitude = Math.sqrt(this.x ** 2 + this.y ** 2)
    return new Position(this.x / magnitude, this.y / magnitude)
  }
  static get zero() {
    return new Position(0, 0)
  }
}
