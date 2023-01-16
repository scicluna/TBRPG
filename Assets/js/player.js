export class Player {

    constructor(name, hp, attacks){
        this.name = name
        this.hp = hp
        this.attacks = attacks
        this.reset()
    }

    reset(){
        this.items = ["potion"]
    }

    attacks(){
        return this.attacks
    }

    items(){
        return this.items
    }

}