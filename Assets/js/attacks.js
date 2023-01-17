import { monsters } from "./monster.js"
import { player, cE } from "./script.js"

export const attackLibrary = 
{
    sword: (target)=>{
        target.hp -= 5
    },
    kick: (target)=>{
        target.hp -= 1
    },
    bite: (target)=>{
        target.hp -= 4
    },
    slam: (target)=>{
        target.hp -= 3
    },
    claw: (target)=>{
        target.hp -= 5
    },
    cleave: ()=>{
        monsters[cE].forEach(monster=>{
            monster.hp -= 3
        })
    }
}