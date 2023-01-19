import { monsters } from "./monster.js"
import { player, cE, attackAnimation } from "./script.js"

export let aoeItem=false

export const itemLibrary = {
    potion: (player)=>{
        let damage = -10
        player.hp -= damage
        attackAnimation(player, damage)
    },
    bomb: ()=>{
        monsters[cE].forEach(monster=>{
            aoeItem = true
            let damage = 5
            monster.hp -= damage
            attackAnimation(monster, damage)
            aoeItem = false
        })
    }
}