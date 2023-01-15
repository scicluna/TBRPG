import { Player } from "./player.js"
import { monsters } from "./monster.js"
import { attackLibrary } from "./attacks.js"

//DOMS
const playerName = document.getElementById("playername")
const playerHP = document.getElementById("playerhp")
const playerOptions = document.getElementById("playeroptions")
const monsterHP = document.getElementById("monsterhp")
const monsterName = document.getElementById("monstername")
const monsterOptions = document.getElementById("monsteroptions")

let player = new Player(playerName.innerText, playerHP.innerText, ["sword", "kick"])

let current = 0
let currentMonster = monsters[current]


function init(){
    pickMonster(current)
    console.log(currentMonster)
    displayAttacks(player)
    displayAttacks(currentMonster)
}
init()

function displayAttacks(character){
    let char = character.name.toLowerCase()
    let attacks = character.attacks

    if (char === "player"){
        playerOptions.innerHTML = ""
    } else monsterOptions.innerHTML = ""

    for (let i=0; i<attacks.length; i++){
        let btn = document.createElement("button")
        let btnContent = attacks[i]
        btn.innerText = btnContent 
        btn.classList.add(`${char}Attack`)
        btn.addEventListener("click", attack)

        if (char === "player"){
        playerOptions.appendChild(btn)
        } else monsterOptions.appendChild(btn)
    }
}

function attack(e){
    let attacker = e.target.classList.value.split("A").splice(0,1).join()
    let attackName = e.target.innerText.toLowerCase()
    let target;

    //determining the target will be more tricky when i introduce multiple enemies
    if (attacker === "player"){
        for (let i=0; i<monsters.length; i++){
            if (monsters[i].name === monsterName.innerText){
                target = monsters[i]
            }
        }
    } else target = player

    console.log(target)

    target.hp -= attackLibrary[attackName]
    hpUpdate()

}

function hpUpdate(){
    playerHP.innerText = player.hp
    monsterHP.innerText = currentMonster.hp

    if(player.hp < 1){
        console.log("You died!")
    } 

    if(currentMonster.hp <1){
        console.log("You killed the monster!")
        current++
        init()
    }
}

function pickMonster(current){
    if(monsters[current] !== undefined){
    monsterName.innerText = monsters[current].name
    monsterHP.innerText = monsters[current].hp
    currentMonster = monsters[current]
    }
}