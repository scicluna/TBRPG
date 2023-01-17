export class Monster {

    constructor(name, hp, attacks, loot){
        this.originalhp = hp
        this.name = name
        this.hp = hp
        this.attacks = attacks
        this.loot = loot
        this.reset()
    }

    reset(){
        this.hp = this.originalhp
    }

    attacks(){
        return this.attacks
    }

    drop(){
        return this.loot
    }

}

export function hpResets(){
    slime.reset()
    slime1.reset()
    bear.reset()
}

//is there really no better way to do this? Every slime in my entire game needs to be cloned once for each on screen?
const slime = new Monster("Slime", 10, ["slam"], ["potion"])
const slime1 = new Monster("Slime", 10, ["slam"], ["potion"])
const bear = new Monster("Bear", 15, ["bite", "claw"], [])

export const monsters = [[slime, slime1],[slime, bear], [slime, slime1, bear], [bear]]