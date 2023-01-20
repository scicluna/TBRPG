class Monster {

    constructor(name, hp, attacks, loot){
        this.maxhp = hp
        this.name = name
        this.hp = hp
        this.attacks = attacks
        this.loot = loot
        this.reset()
    }

    reset(){
        this.hp = this.maxhp
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
    bear1.reset()
    tiger1.reset()
}

//is there really no better way to do this? Every slime in my entire game needs to be cloned once for each on screen?
const slime = new Monster("Slime", 10, ["slam"], ["potion"])
const slime1 = new Monster("Slime", 10, ["slam"], ["potion"])
const slime2 = new Monster("Slime", 10, ["slam"], ["potion"])
const bear = new Monster("Bear", 15, ["bite", "claw"], ["potion", "bomb"])
const bear1 = new Monster("Bear", 15, ["bite", "claw"], ["potion", "bomb"])
const tiger = new Monster("Tiger", 15, ["claw"], [])
const tiger1 = new Monster("Tiger", 15, ["claw"], [])

export const monsters = [
    [slime, slime1, slime2],
    [slime, slime1], 
    [slime, slime1, bear], 
    [bear, bear1, tiger]
]