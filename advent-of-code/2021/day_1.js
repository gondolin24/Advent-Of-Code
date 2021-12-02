const fs = require('fs')

function importFile() {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\r\n').map((num) => Number(num))
}


function solvePartOne(data) {

    const maxIncrease = data.reduce((acc, current) => {
        const {prev} = acc

        if (prev <= current) {
            acc.count = acc.count + 1
        }
        acc.prev = current
        return acc

    }, {
        prev: Number.MAX_SAFE_INTEGER,
        count: 0
    })
    return maxIncrease.count
}


function solvePartTwo(data) {
    data.pop()
    const formattedR = []
    // we can reuse this
    for (let i = 0; i < data.length; i++) {
        // get pre 3
        const prev = data[i + 1] || 0
        const prev2 = data[i + 2] || 0
        formattedR[i] = data[i] + prev + prev2
    }

    const maxIncrease = formattedR.reduce((acc, current) => {
        const {prev} = acc

        if (prev < current) {
            acc.count = acc.count + 1
        }
        acc.prev = current
        return acc

    }, {
        prev: Number.MAX_SAFE_INTEGER,
        count: 0
    })
    return maxIncrease.count
}


const data = [
    199,
    200,
    208,
    210,
    200,
    207,
    240,
    269,
    260,
    263
]
console.log(solvePartOne(data))

console.log(solvePartTwo(importFile()))
