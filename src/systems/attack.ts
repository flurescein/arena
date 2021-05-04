import { Aspect, Engine, System } from '@trixt0r/ecs'
import { HP } from '../components/HP'
import { Kills } from '../components/kills'
import { Stats } from '../components/stats'
import { Target } from '../components/target'

export class AttackSystem extends System {
  private aspect: Aspect

  constructor(priority: number = 0) {
    super(priority)
  }

  onAddedToEngine(engine: Engine) {
    this.aspect = Aspect.for(engine).all(Stats, HP, Kills, Target)
  }

  process(delta: number) {
    this.aspect.entities.forEach(entity => {
      const target = entity.components.get(Target)
      const targetHp = target.entity.components.get(HP)
      const targetDefense = target.entity.components.get(Stats).value.defense

      const stats = entity.components.get(Stats)

      if (
        target.entity &&
        target.distance <= stats.value.attackDistance &&
        targetHp.value > 0
      ) {
        targetHp.value -= Math.max(
          0,
          (stats.value.attack - targetDefense) * delta
        )
        if (targetHp.value <= 0) {
          target.entity = undefined
          entity.components.get(Kills).value++
          const hp = entity.components.get(HP)
          hp.value = Math.min(
            hp.value + stats.value.maxHP / 2,
            stats.value.maxHP
          )
          stats.value.attack += 10
        }
      }
    })
  }
}
