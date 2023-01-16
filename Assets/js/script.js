import { Player } from "./player.js"
import { monsters, hpResets } from "./monster.js"
import { attackLibrary } from "./attacks.js"
import { itemLibrary } from "./items.js"

//DOMS
const playerName = document.getElementById("playername")
const playerHP = document.getElementById("playerhp")
const playerOptions = document.getElementById("playeroptions")
const monsterHP = document.querySelectorAll("#monsterhp")
const monsterName = document.querySelectorAll("#monstername")
const monsterOptions = document.querySelectorAll("#monsteroptions")
const playerItems = document.getElementById("playeritems")


export let player = new Player("Player", 10, ["sword", "kick"])

let cE = 0 //creature encounter
let mC = 0 //monster count

function init(){
    hpResets()
    pickMonster(cE)
    cleanAttacks()
    displayAttacks(player)
    displayItems(player)
    mC = 0
    if(!monsters[cE]){console.log("out of enemies")}
    monsters[cE].forEach(monster=>{
        displayAttacks(monster)
        mC++
    })
    initMonsters()
}
init()

function displayAttacks(character){
    let char = character.name.toLowerCase()
    let attacks = character.attacks

    if (char !== "player"){

            for (let j=0; j<attacks.length; j++){
                let btn = document.createElement("button")
                let btnContent = attacks[j]
                btn.innerText = btnContent 
                btn.classList.add(`${char}Attack`)
                btn.addEventListener("click", attack)
                monsterOptions[mC].appendChild(btn)
            }
        
    }
        
    if (char === "player"){
        for (let j=0; j<attacks.length; j++){
            let btn = document.createElement("button")
            let btnContent = attacks[j]
            btn.innerText = btnContent 
            btn.classList.add(`${char}Attack`)
            btn.addEventListener("click", attack)
            playerOptions.appendChild(btn)
    }
}
}

function attack(e){
    let attacker = e.target.classList.value.split("A").splice(0,1).join()
    let attackName = e.target.innerText.toLowerCase()
    let target;

    //determining the target will be more tricky when i introduce multiple enemies
    if (attacker === "player"){
        for (let i=0; i<monsters[cE].length; i++){

            if (monsterName[i].classList.contains("target")){
                target = monsters[cE][i]
            }

        }
    } else target = player

    target.hp -= attackLibrary[attackName]
    hpUpdate(target)

}

function hpUpdate(){
    
    for (let i=0; i<monsterHP.length; i++){
        monsterHP[i].innerText = monsters[cE][i].hp
        if(monsters[cE][i].hp < 1) {
            monsterHP[i].innerText = "Dead"
            monsterName[i].classList.remove("target")
            monsterName[i].classList.add("dead")
            if (monsters[cE][i+1] !== undefined && monsters[cE][i+1].hp > 0){
                monsterName[i+1].classList.add("target")
            } else if (monsters[cE][i-1] !== undefined && monsters[cE][i-1].hp > 0){
                monsterName[i-1].classList.add("target")
            } else if (monsterName[i].classList.contains("dead")){
                console.log("You killed the monsters!")
                cE++
                init()
            }

        }
    }

    playerHP.innerText = player.hp

    if(player.hp < 1){
        console.log("You died!")
    } 

    if(monsters[cE].hp <1){
        console.log("You killed the monster!")
        cE++
        init()
    }
}

function pickMonster(cE){
    if(monsters[cE] !== undefined){
        for (let i=0; i<monsters[cE].length; i++){
            monsterName[i].innerText = monsters[cE][i].name
            monsterHP[i].innerText = monsters[cE][i].hp
        }
}
}

function initMonsters(){
    monsterName.forEach(monster=>{
        monster.addEventListener("click", target)
    })
    monsterName[0].classList.add("target")
    monsterName[1].classList.remove("target")
}

function target(e){
    let selectedTarget = e.target
    monsterName.forEach(name=>{
        name.classList.remove("target")
    })
    selectedTarget.classList.add("target")
}

function cleanAttacks(){
        playerOptions.innerHTML = ""
        monsterOptions.forEach(option=>{option.innerHTML = ""})
}

function displayItems(player){

playerItems.innerHTML = ""
    player.items.forEach(item=>{
        let btn = document.createElement("button")
        let btnContent = item
        btn.innerText = btnContent 
        btn.classList.add(`item`)
        btn.addEventListener("click", useitem)
        playerItems.appendChild(btn)
    })

}

function useitem(e){
    let item = e.target.innerText
    itemLibrary[item]()
    console.log(player)

    for (let i=0; i<player.items.length; i++){
        if(player.items[i] == item){
            player.items.splice(i,1)
        }
    }

    hpUpdate(player)
    displayItems(player)
}