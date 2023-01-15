export class Monster {

    constructor(name, hp, attacks){
        this.name = name
        this.hp = hp
        this.attacks = attacks

    }

    name(){
        const monsterName = document.querySelector(".monstername")
        monsterName.innerText = this.name
    }

    attacks(){
        return this.attacks
    }

}

const slime = new Monster("Slime", 10, ["slam"])
const bear = new Monster("Bear", 15, ["bite", "claw"])

export const monsters = [slime, bear]