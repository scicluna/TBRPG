export class Player {

    constructor(element, hp, attacks){
        this.element = element
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