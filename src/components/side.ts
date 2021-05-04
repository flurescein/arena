import { SingleValueComponent } from '../helpers/SingleValueComponent'

export enum SideValue {
  Good = 'good',
  Evil = 'evil'
}

export class Side extends SingleValueComponent<SideValue> {}
