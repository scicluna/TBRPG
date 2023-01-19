import { monsters } from "./monster.js"
import { player, cE, attackAnimation } from "./script.js"

export const attackLibrary = 
{
    sword: (target)=>{
        let damage = 5
        target.hp -= damage
        attackAnimation(target, damage)
    },
    kick: (target)=>{
        target.hp -= 1
    },
    bite: (target)=>{
        let damage = 3
        target.hp -= damage
        attackAnimation(target, damage)
    },
    slam: (target)=>{
        let damage = 2
        target.hp -= damage
        attackAnimation(target, damage)
    },
    claw: (target)=>{
        let damage = 2
        target.hp -= damage
        attackAnimation(target, damage)
    },
    cleave: ()=>{
        monsters[cE].forEach(monster=>{
            let damage = 2
            monster.hp -= damage
            attackAnimation(monster, damage)
        })
    }
}