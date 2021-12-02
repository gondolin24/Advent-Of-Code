const fs = require('fs')

function importFile() {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\r\n').map((line) => {
        const [direction, val] = line.split(' ')
        return {
            direction,
            val: Number(val)
        }
    })
}


function solvePartOne(data) {

    const maxIncrease = data.reduce((acc, current) => {
        const {direction, val} = current
        switch (direction) {
            case 'forward':
                acc.horizontal = acc.horizontal + val
                break
            case 'down':
                acc.vertical = acc.vertical + val
                break
            case 'up':
                acc.vertical = acc.vertical - val
                break
            default:
                break
        }
        return acc
    }, {
        vertical: 0,
        horizontal: 0
    })
    return maxIncrease.vertical * maxIncrease.horizontal
}


function solvePartTwo(data) {

    const maxIncrease = data.reduce((acc, current) => {
        const {direction, val} = current
        switch (direction) {
            case 'forward':
                acc.vertical = acc.vertical + (acc.aim * val)
                acc.horizontal = acc.horizontal + val
                break
            case 'down':
                acc.aim = acc.aim + val
                break
            case 'up':
                acc.aim = acc.aim - val
                break
            default:
                break
        }
        return acc
    }, {
        vertical: 0,
        horizontal: 0,
        aim: 0
    })
    return maxIncrease.vertical * maxIncrease.horizontal
}


console.log(solvePartOne(importFile()))

console.log(solvePartTwo(importFile()))
