import { player } from "./script.js"

const forest = 'url(./Assets/css/backgrounds/forest.jpg)'
const plains = 'url(./Assets/css/backgrounds/plains.jpg)'
const coast = 'url(./Assets/css/backgrounds/coast.jpg)'
const cliffs = 'url(./Assets/css/backgrounds/cliffs.jpg)'

export const map = {
    0: {
        name: "example encounter 1",
        destination:1,
        encounter: 0,
        background: forest,
        battle: true,
    },
    1: {
        name: "example encounter 2",
        destination:2,
        encounter:1,
        background: plains,
        battle: true,
    },
    2: {
        name: "example encounter 3",
        destination:3,
        encounter:2,
        background: coast,
        battle: true,
    },
    3: {
        name: "example encounter 4",
        destination:4,
        encounter:3,
        background: cliffs,
        battle: true,
    },
    4: {
        name: "example peace encounter 1",
        destination:5,
        background: cliffs,
        battle: false,
        txt:"some example text. option example below",
        options: [
            {
                id:0,
                txt:"here's some example text. take a potion!",
                event: ()=>{
                    player.items = [...player.items, "potion"]
                }
            }
        ]
    },
    5: {
        name: "example encounter 5",
        destination:6,
        encounter:1,
        background: forest,
        battle: true,
    },
}