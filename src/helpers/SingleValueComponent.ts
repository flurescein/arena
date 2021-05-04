import { Component } from '@trixt0r/ecs'

export abstract class SingleValueComponent<Value> implements Component {
  constructor(public value: Value) {}
}
