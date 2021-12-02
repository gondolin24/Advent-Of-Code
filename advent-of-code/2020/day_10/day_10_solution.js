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

function sortedData() {
    const data = importFile()

    let sortedJolts = data.sort((a, b) => a - b)

    return sortedJolts
}


function solve(arr) {
    const metaData = new GangstersParadise()
    const dd = [...arr.sort((a, b) => a - b)]
    const max = dd[dd.length - 1]
    dd.push(0)
    dd.push(max + 3)
    const sortedJolts = dd.sort((a, b) => a - b)

    while (sortedJolts.length > 0) {
        let current = sortedJolts.shift()
        const result = findNextVoltage(current, sortedJolts)
        if (result) {
            const math = sortedJolts[0] - current
            metaData.add(math)
        }
    }
    return metaData.oneCount * metaData.threeCount
}

function solvePartOne() {
    const metaData = new GangstersParadise()
    const sortedJolts = [...sortedData()]
    return solve(sortedJolts)
}

const powerset = (array) => {
    const results = [[]];
    for (const value of array) {
        const copy = [...results]; // See note below.
        for (const prefix of copy) {
            results.push(prefix.concat(value));
        }
    }
    return results;
};


function solvePartTwo() {
    const sortedJolts = [...sortedData()]
    const powerSet = powerset(sortedJolts)
    const maxMe = sortedJolts[sortedJolts.length - 1] + 3
    const preFilter = powerSet.filter((a) => {
        const max = a[a.length - 1] + 3
        return max === maxMe;
    })
    const gg = preFilter.sort((a, b) => b.length - a.length).map((set) => {
        const dd = [...set.sort((a, b) => a - b)]
        const max = dd[dd.length - 1]

        dd.push(0)
        dd.push(max + 3)
        const sJ = dd.sort((a, b) => a - b)
        while (sJ.length > 1) {
            let current = sJ.shift()
            const result = findNextVoltage(current, sJ)
            if (!result) {
                return 0
            }
        }
        return 1
    })

    return gg.reduce((a, b) => b + a, 0)

}

console.log(solvePartOne())
console.log(solvePartTwo())
