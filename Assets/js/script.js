import { Player } from "./player.js"

//DOMS
const playerName = document.getElementById("playername")
const playerHP = document.getElementById("playerhp")
const playerOptions = document.getElementById("playeroptions")
const monsterHP = document.getElementById("monsterhp")
const monsterName = document.getElementById("monstername")

let player = new Player(playerName.innerText, playerHP.innerText, ["sword", "kick"])

function init(){
    displayAttacks(player)
}
init()

function displayAttacks(player){
    let attacks = player.attacks

    for (let i=0; i<attacks.length; i++){
        let btn = document.createElement("button")
        let btnContent = attacks[i]
        btn.innerText = btnContent 
        playerOptions.appendChild(btn)
    }

}