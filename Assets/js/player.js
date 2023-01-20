export class Player {

    constructor(name, hp, attacks){
        this.name = name
        this.maxhp = hp
        this.hp = hp
        this.attacks = attacks
        this.reset()
    }

    reset(){
        this.items = ["potion", "bomb"]
    }

    attacks(){
        return this.attacks
    }

    items(){
        return this.items
    }

}