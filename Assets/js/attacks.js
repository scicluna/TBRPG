import { monsters } from "./monster.js"
import { player, cE, actionAnimation} from "./script.js"

export let aoeAttack=false

export const attackLibrary = 
{
    sword: (target)=>{
        let damage = 5
        target.hp -= damage
        actionAnimation(target, damage)
    },
    testsword: (target)=>{
        let damage = 15
        target.hp -= damage
        actionAnimation(target, damage)
    },
    kick: (target)=>{
        target.hp -= 1
    },
    bite: (target)=>{
        let damage = 3
        target.hp -= damage
        actionAnimation(target, damage)
    },
    slam: (target)=>{
        let damage = 2
        target.hp -= damage
        actionAnimation(target, damage)
    },
    claw: (target)=>{
        let damage = 2
        target.hp -= damage
        actionAnimation(target, damage)
    },
    cleave: ()=>{
        monsters[cE].forEach(monster=>{
            aoeAttack = true
            let damage = 2
            monster.hp -= damage
            actionAnimation(monster, damage)
            aoeAttack = false
        })
    }
}
