import { Player } from "./player.js"
import { monsters, hpResets } from "./monster.js"
import { attackLibrary, aoeAttack } from "./attacks.js"
import { itemLibrary, aoeItem } from "./items.js"
import { map } from "./map.js"

//DOMS
const playerHP = document.getElementById("playerhp")
const playerOptions = document.getElementById("playeroptions")
const playerItems = document.getElementById("playeritems")
const monsterHPContainer = document.querySelectorAll(".monsterhpcontainer")
const monsterHP = document.querySelectorAll("#monsterhp")
const monsterName = document.querySelectorAll("#monstername")
const background = document.querySelector("body")
const battleSpace = document.querySelector(".battlespace")
const peaceSpace = document.querySelector(".peacespace")
const peaceText = document.querySelector(".text")
const peaceOptions = document.querySelector(".peaceoptions")

//creating a new "player"
export let player = new Player("Player", 20, ["testsword","sword", "cleave"])

export let nN = 0 // node number
export let cE = 0 //creature encounter

let activeBattle = true
let monstersAlive = true
let currentTurn = player

//running the game
function init(){
    //tutorial insert here w/ starting battle
    background.style.backgroundImage = map[nN].background
    battleStart()
}
init()

//calls for the next scene, may use another function here later -- keep in this refactor
function nextScene(){
    findDestination()
}

//displaying attack options for all of the characters on the screen
function displayAttacks(character){
    let char = character.name.toLowerCase()
    let attacks = character.attacks

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
    let attackName = e.target.innerText.toLowerCase()
    let target;

    monsters[cE].forEach((monster, i)=>{
        if(monsterName[i].classList.contains("target")){
            target = monster
        }
    })

    //updates the values to reflect the attack
    attackLibrary[attackName](target)
    hpUpdate()

    currentTurn = "monsters"
    toggleTurn()

    if(monstersAlive) aiRetaliation()
    if(!monstersAlive){
        let victory = setInterval(()=>{
            lootDrop()
            nextScene()
            clearInterval(victory)
        },1000)
    }
}

//handles the ai turns -- make a weighted average formula to determine a weight on each attack
function aiRetaliation(){
    let target = player
    let attackOptions = []
    let deathTimer = 0

    if(monsters[cE] === undefined) return

    const monsterAttack = new Promise((resolve, reject) => {
        
        for (let i=0; i<monsters[cE].length; i++){

            if (monsterName[i].classList.contains("dead")) deathTimer += 1000

            const aiAttackInterval = setInterval(()=>{
                if(!monsterName[i].classList.contains("dead") && monsterName[i] != null && currentTurn != "player"){
                    attackOptions.push(monsters[cE][i].attacks)
                    attackOptions = attackOptions.flat()
                    let randomIndex = Math.floor(Math.random()*attackOptions.length)
                    let attackName = attackOptions[randomIndex]
                    attackLibrary[attackName](target)
                    hpUpdate()
                    attackOptions = []
                }

                if (i === monsters[cE].length-1) resolve()
                clearInterval(aiAttackInterval)

            }, (i * 1000 + 1000 - deathTimer))
                //general game ticks -> higher level
        } 
    })
    monsterAttack.then((resolve)=>{
        currentTurn = "player"
        toggleTurn()
    })
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
            monsterHP[i].innerText = `${monsters[cE][i].hp}/${monsters[cE][i].maxhp}`
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
    //find a new target if deathFlag is true
    for (let i=0; i<monsters[cE].length; i++){
        if (deathFlag === true && !monsterName[i].classList.contains("dead")){
            monsterName[i].classList.add("target")
            deathFlag = false
            i += monsters[cE].length
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

    playerHP.innerText = `${player.hp}/${player.maxhp}`
    hpBarUpdate(player, monsters[cE])

    //put game-over screen here
    if(player.hp < 1){
        console.log("You died!")
    } 

}

function hpBarUpdate(player, monsters){
    if(player.hp > 0){
        playerHP.style.setProperty("--hpfill", `${(player.hp/player.maxhp)*100}%`)
    } else playerHP.style.setProperty("--hpfill", 0)

    monsters.forEach((monster, i)=>{
        if (monster.hp > 0) {
            monsterHP[i].style.setProperty("--mhpfill", `${(monster.hp/monster.maxhp)*100}%`)
    } else monsterHP[i].style.setProperty("--mhpfill", 0)
    })
}

//selects which mosnters should show up on the screen
function pickMonster(){
    monsterName.forEach(monster=>{monster.innerHTML=""})
    monsterHPContainer.forEach(monster=>{monster.style.border="none"})
    monsterHP.forEach(monster=>{
        monster.innerHTML=""
        monster.style.background = "none" 
    })

    if(monsters[cE] == null) return

    for (let i=0; i<monsters[cE].length; i++){
        monsterName[i].innerText = monsters[cE][i].name
        monsterHP[i].innerText = `${monsters[cE][i].hp}/${monsters[cE][i].maxhp}`
        monsterHP[i].style.background = "red"
        monsterHPContainer[i].style.border="1px solid rgba(255, 255, 255, 0.53)"
    }
}

//initializes the targetting system
function initMonsters(){
    monsterName.forEach(monster=>{
        monster.addEventListener("click", target)
        monster.classList.remove("dead")
    })
    monsterName[0].classList.add("target")
}

//handles the targetting system
function target(e){
    let selectedTarget = e.target
    monsterName.forEach(name=>{name.classList.remove("target")})
    selectedTarget.classList.add("target")
}

//cleans out player attacks inbetween rounds
function cleanAttacks(){playerOptions.innerHTML = ""}

//shows players inventory and adds event listeners to their buttons
function displayItems(player){
playerItems.innerHTML = ""
    player.items.forEach(item=>{
        let btn = document.createElement("button")
        let btnContent = item
        btn.innerText = btnContent 
        btn.classList.add(`item`)
        btn.addEventListener("click", useItem)
        playerItems.appendChild(btn)
    })
}

//allows me to consume items and run a function depending on what the item was
function useItem(e){
    
    let selectedItem = e.target  
    const items = document.querySelectorAll(".item")
    let itemIndex;

    items.forEach((item,i)=>{if (item === selectedItem) itemIndex = i})

    let item = e.target.innerText
    itemLibrary[item](player) //executes code from our itemLibrary object
    player.items.splice(itemIndex, 1) //eliminates the item from our item array

    hpUpdate()
    displayItems(player)

    currentTurn = "monsters"
    toggleTurn()

    if(monstersAlive) aiRetaliation()
    if(!monstersAlive){
        let victory = setInterval(()=>{
            lootDrop()
            nextScene()
            clearInterval(victory)
        },1000)
    }
}

//handles looting the monsters after killing them
function lootDrop(){monsters[cE].forEach(monster=>{player.items = [...player.items, ...monster.drop()]})}

//initiates a battle sequence
function battleStart(){
    currentTurn = "player"
    battleSwitch()
    if(monsters[cE] === undefined)return console.log("out of enemies")
    hpResets()
    pickMonster()
    cleanAttacks()
    hpUpdate()
    displayAttacks(player)
    displayItems(player)
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
    background.style.backgroundImage = map[nN].background
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

//Floating damage text during combat
export function actionAnimation(target, damage){
    const floatingDamageDivs = document.querySelectorAll(".floatingdamage")
    const possibleTargets = document.querySelectorAll(".name")

    for(let i=0; i<possibleTargets.length; i++){

        let targetDamage;
        if(possibleTargets[i].innerText == target.name && (possibleTargets[i].classList.contains("target") || aoeItem === true || aoeAttack === true || possibleTargets[i].innerText === "Player") && !possibleTargets[i].classList.contains("dead")){
            targetDamage = floatingDamageDivs[i]
            targetDamage.classList.remove("sneak")

            if(damage < 0){
                targetDamage.classList.add("healing")
                targetDamage.innerText = damage.toString().replace("-","")
            } else targetDamage.innerText= damage

            //animation packages

            const animationTiming = setInterval(()=>{
                targetDamage.classList.add("sneak")
                clearInterval(animationTiming)        
            },300)
        
            const animationTiming2 = setInterval(()=>{
                targetDamage.innerText=""
                clearInterval(animationTiming2)     
                targetDamage.classList.remove("healing")   
            },900)
        }
    }
}


//disable/enable turns based on timing
function toggleTurn(){
    const playerAttacks = document.querySelectorAll(".playerAttack")
    const playerItemList = document.querySelectorAll(".item")

    if(currentTurn == "monsters"){
        playerAttacks.forEach(option=>{
            option.removeEventListener("click", attack)
            option.classList.add("dim")
        })
        playerItemList.forEach(option=>{
            option.removeEventListener("click", useItem)
            option.classList.add("dim")
        })
    }
    if(currentTurn == "player"){
        playerAttacks.forEach(option=>{
            option.addEventListener("click", attack)
            option.classList.remove("dim")
        })
        playerItemList.forEach(option=>{
            option.addEventListener("click", useItem)
            option.classList.remove("dim")
        })
    }
}






//TODO
//Some kind of animation for attacks (like scrolling combat text, or something)

//More interesting items
//Magic+Mp
