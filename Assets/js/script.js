import { Player } from "./player.js"
import { monsters, hpResets } from "./monster.js"
import { attackLibrary } from "./attacks.js"
import { itemLibrary } from "./items.js"
import { map } from "./map.js"

//DOMS
const playerName = document.getElementById("playername")
const playerHP = document.getElementById("playerhp")
const playerOptions = document.getElementById("playeroptions")
const monsterHP = document.querySelectorAll("#monsterhp")
const monsterName = document.querySelectorAll("#monstername")
const monsterOptions = document.querySelectorAll("#monsteroptions")
const playerItems = document.getElementById("playeritems")
const background = document.querySelector("body")
const battleSpace = document.querySelector(".battlespace")
const peaceSpace = document.querySelector(".peacespace")
const peaceText = document.querySelector(".text")
const peaceOptions = document.querySelector(".peaceoptions")

//creating a new "player"
export let player = new Player("Player", 10, ["sword", "cleave"])

export let nN = 0 // node number
export let cE = 0 //creature encounter
let mC = 0 //monster count

let activeBattle = true
let monstersAlive = true

//running the game
function init(){
    //tutorial insert here w/ starting battle
    backgroundChange()
    battleStart()
}
init()

function nextScene(){
    findDestination()
    backgroundChange()
}

//displaying attack options for all of the characters on the screen
function displayAttacks(character){
    let char = character.name.toLowerCase()
    let attacks = character.attacks
    //loop for monsters
    if (char !== "player"){
            for (let j=0; j<attacks.length; j++){
                let btn = document.createElement("button")
                let btnContent = attacks[j]
                btn.innerText = btnContent 
                btn.classList.add(`${char}Attack`)
                btn.addEventListener("click", attack)
                monsterOptions[mC].appendChild(btn) //mC is kind of like i, but i wanted to use a forEach loop instead for fun
            }
    }
    //loop for player
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

//finds the target and executes the damage value ala the attackLibrary
function attack(e){
    let attacker = e.target.classList.value.split("A").splice(0,1).join()
    let attackName = e.target.innerText.toLowerCase()
    let target;

    if (attacker === "player"){
        for (let i=0; i<monsters[cE].length; i++){
            if (monsterName[i].classList.contains("target")){
                target = monsters[cE][i]
            }
        }
    } else target = player

    //updates the values to reflect the attack
    attackLibrary[attackName](target)
    hpUpdate()

    if(monstersAlive){
    aiRetaliation()
    }

    if(!monstersAlive){
        let victory = setInterval(()=>{
            lootDrop()
            nextScene()
            clearInterval(victory)
        },500)
    }
}

//handles the ai turns -- make a weighted average formula to determine a weight on each attack
function aiRetaliation(){
    let target = player
    let attackOptions = []

    if(monsters[cE] === undefined){
        return
    }

    monsters[cE].forEach(monster=>{
        if (monster.hp > 0){
        attackOptions.push(monster.attacks)
        }
    })

    if(attackOptions[0] === undefined){
        return
    }

    attackOptions.forEach(options=>{
        let randomIndex = Math.floor(Math.random()*(options.length))
        let attackName = options[randomIndex].toLowerCase()
        attackLibrary[attackName](target)
    })
    hpUpdate()
}

//handles life and death for each character on the screen
//handles moving targets against the monsters in the case that the current target dies
//still need to add a check for player game overs
function hpUpdate(){
    monstersAlive = true
    let deathFlag = false
    let deathCount = 0

    //if the monster isn't dead... display its HP
    for (let i=0; i<monsters[cE].length; i++){
        if(!monsterName[i].classList.contains("dead")){
            monsterHP[i].innerText = monsters[cE][i].hp
        }
        //mark monsters as dead and remove target from them
        if(monsters[cE][i].hp < 1 && !monsterName[i].classList.contains("dead")) {
            monsterHP[i].innerText = "Dead"
            monsterName[i].classList.remove("target")
            monsterName[i].removeEventListener("click", target)
            monsterName[i].classList.add("dead")
            deathFlag = true
        }
    }
    //find a new target
    for (let i=0; i<monsters[cE].length; i++){
        if (deathFlag === true && !monsterName[i].classList.contains("dead")){
            monsterName[i].classList.add("target")
            deathFlag = false
            i += Infinity
        }
    }
    //counting the dead
    for (let i=0; i<monsters[cE].length; i++){
        if (monsterName[i].classList.contains("dead")){
            deathCount++
        }
    }
    //if everything is dead, move on
    if(deathCount === monsters[cE].length){
        console.log("You killed the monsters!")
        monstersAlive=false
    }

    playerHP.innerText = player.hp

    //put game-over screen here
    if(player.hp < 1){
        console.log("You died!")
    } 

}

//selects which mosnters should show up on the screen
function pickMonster(){
    monsterName.forEach(monster=>{monster.innerHTML=""})
    monsterHP.forEach(monster=>{monster.innerHTML=""})
    if(monsters[cE] !== undefined){
        for (let i=0; i<monsters[cE].length; i++){
            monsterName[i].innerText = monsters[cE][i].name
            monsterHP[i].innerText = monsters[cE][i].hp
        }
}
}

//initializes the targetting system
function initMonsters(){
    monsterName.forEach(monster=>{
        monster.addEventListener("click", target)
        monster.classList.remove("dead")
    })
    monsterName[0].classList.add("target")
    monsterName[1].classList.remove("target")

}

//handles the targetting system
function target(e){
    let selectedTarget = e.target
    monsterName.forEach(name=>{
        name.classList.remove("target")
    })
    selectedTarget.classList.add("target")
}

//cleans out monster and player attacks inbetween rounds
function cleanAttacks(){
        playerOptions.innerHTML = ""
        monsterOptions.forEach(option=>{option.innerHTML = ""})
}

//shows players inventory and adds event listeners to their buttons
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

//allows me to consume items and run a function depending on what the item was
function useitem(e){
    console.log(player)
    
    let selectedItem = e.target  
    const items = document.querySelectorAll(".item")
    let itemIndex;

    for (let i=0; i<items.length; i++){
        if(items[i] === selectedItem){
            itemIndex = i
        }
    }

    let item = e.target.innerText
    itemLibrary[item]() //executes code from our itemLibrary object

    player.items.splice(itemIndex, 1)

    //updates our DOMs
    hpUpdate(player)
    displayItems(player)
}

//handles looting the monsters after killing them
function lootDrop(){
    monsters[cE].forEach(monster=>{
        player.items = [...player.items, ...monster.drop()] //use spreaders to set the array to its new value
    })
}

//handles changing the background image
function backgroundChange(){
    background.style.backgroundImage = map[nN].background
}

//initiates a battle sequence
function battleStart(){
    battleSwitch()
    if(monsters[cE] === undefined){
        console.log("out of enemies")
        return
    } 
    hpResets()
    pickMonster()
    cleanAttacks()
    displayAttacks(player)
    displayItems(player)
    mC = 0
    monsters[cE].forEach(monster=>{
        displayAttacks(monster)
        mC++
    })
    initMonsters()
}

//initiates a roleplaying sequence
function roleplayStart(){
    battleSwitch()
    peaceUpdate()
}

//adjusts our nN and cE to reflect the next destination
function findDestination(){
    nN = map[nN].destination
    cE = map[nN].encounter || null
    if(map[nN].battle){
        window.alert("ready for the next battle?") //Placeholder for some kind of screentext function w/ a button
        activeBattle = true
        battleStart()
    }
    if(!map[nN].battle){
        window.alert("peaceful encounter")
        activeBattle = false
        roleplayStart()
    }
}

//handles scene changes between battle and peace
function battleSwitch(){
    if(!activeBattle){
        battleSpace.classList.add("hide")
        peaceSpace.classList.remove("hide")
    }
    if(activeBattle){
        battleSpace.classList.remove("hide")
        peaceSpace.classList.add("hide")
    }
}

//updates the text for the peacetime scenes
function peaceUpdate(){
    peaceText.innerText = map[nN].txt

    map[nN].options.forEach(option=>{
        let btn = document.createElement("button")
        btn.innerText = option.txt
        btn.classList.add("options")
        btn.addEventListener("click", playerChoice)
        peaceOptions.appendChild(btn)
    })
}

//handles the choice selection in peacetime
function playerChoice(e){
    let selectedOption = e.target
    const options = document.querySelectorAll(".options")
    let optionIndex;

    for (let i=0; i<options.length; i++){
        if(options[i] === selectedOption){
            optionIndex = i
        }
    }

    map[nN].options[optionIndex].event()
    
    nextScene()
}


//TODO
//Random AI reactions
//Timeouts between turns
//Some kind of animation for attacks (like scrolling combat text, or something)

//Non-combat nodes
//More interesting items
//Magic+Mp

