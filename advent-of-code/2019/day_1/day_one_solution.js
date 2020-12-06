const fs = require('fs')

function importFile() {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\r\n').filter((a) => a !== '').map((num) => Number(num))
}

function calculate(mass) {
    return Math.floor(mass / 3) - 2
}

function ghettoRecursion(mass, total) {
    const fuelNeeded = calculate(mass)
    if(fuelNeeded<=0){
        return total
    }

    const tot = total + fuelNeeded
    return ghettoRecursion(fuelNeeded, tot)
}

function solvePArtOne() {
    const data = importFile()
    const answer = data.map((mass) => calculate(mass))
        .reduce((a, b) => a + b, 0)
    console.log(answer)
}

function solvePartTwo() {
    const data = importFile()
    const answer = data.map((mass) => ghettoRecursion(mass, 0))
        .reduce((a, b) => a + b, 0)
    console.log(answer)
}


solvePArtOne()
solvePartTwo()
