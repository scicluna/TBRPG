export class Player {

    constructor(name, hp, attacks){
        this.name = name
        this.hp = hp
        this.attacks = attacks
    }

    reset(){
        this.hp = hp
    }

    attacks(){
        return this.attacks
    }

}