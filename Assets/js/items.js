import { monsters } from "./monster.js"
import { player, cE } from "./script.js"

export const itemLibrary = {
    potion: ()=>{
        player.hp += 5
    },
    bomb: ()=>{
        monsters[cE].forEach(monster=>{
            monster.hp -= 5
        })
    }
}