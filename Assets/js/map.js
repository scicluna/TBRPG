const forest = 'url(./Assets/css/backgrounds/forest.jpg)'
const plains = 'url(./Assets/css/backgrounds/plains.jpg)'
const coast = 'url(./Assets/css/backgrounds/coast.jpg)'
const cliffs = 'url(./Assets/css/backgrounds/cliffs.jpg)'

export const map = {
    0: {
        destination:1,
        encounter: 0,
        background: forest,
        battle: true,
        
    },
    1: {
        destination:2,
        encounter:1,
        background: plains,
        battle: true,
    },
    2: {
        destination:3,
        encounter:2,
        background: coast,
        battle: true,
    },
    3: {
        destination:4,
        encounter:3,
        background: cliffs,
        battle: true,
    }
}