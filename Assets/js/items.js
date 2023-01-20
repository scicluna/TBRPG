import { monsters } from "./monster.js"
import { player, cE, actionAnimation } from "./script.js"

export let aoeItem=false

export const itemLibrary = {
    potion: (player)=>{

        let damage = -10

        if(player.hp+10 > player.maxhp){
            damage = player.hp-player.maxhp
            player.hp = player.maxhp
        } else player.hp -= damage

        actionAnimation(player, damage)
    },
    bomb: ()=>{
        monsters[cE].forEach(monster=>{
            aoeItem = true
            let damage = 5
            monster.hp -= damage
            actionAnimation(monster, damage)
            aoeItem = false
        })
    }
}