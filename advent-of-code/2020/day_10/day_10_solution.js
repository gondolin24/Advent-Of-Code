const fs = require('fs')

function importFile() {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\r\n').filter((a) => a !== '').map((a) => Number(a))
}


class GangstersParadise {
    constructor() {
        this.oneCount = 0
        this.twoCount = 0
        this.threeCount = 0
    }

    add(count) {
        if (count === 1) {
            this.oneCount++
        }
        if (count === 2) {
            this.twoCount++
        }
        if (count === 3) {
            this.threeCount++
        }
    }
}

function findNextVoltage(adaptor, array) {
    const diff = array[0] - adaptor
    return diff <= 3 && diff > 0
}

function solvePartOne() {
    const data = importFile()

    let sortedJolts = data.sort((a, b) => a - b)
    const max = sortedJolts[sortedJolts.length - 1]
    const metaData = new GangstersParadise()
    sortedJolts.push(0)
    sortedJolts.push(max + 3)
    sortedJolts = data.sort((a, b) => a - b)
    while (sortedJolts.length > 0) {
        let current = sortedJolts.shift()
        const result = findNextVoltage(current, sortedJolts)
        if (result) {
            const math = sortedJolts[0] - current
            metaData.add(math)
        }
    }


    console.log(metaData.oneCount * metaData.threeCount)
}


solvePartOne()
