// https://adventofcode.com/2020/day/3 -> 218
// https://adventofcode.com/2020/day/3#part2 -> 3847183340

const fs = require('fs')

function importFile() {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\r\n').filter((a) => a !== "").map((a) => a.split(''))
}

function solvePartOne() {
    const data = importFile()

//start at index
    let iIndex = 0
    let jIndex = 0
    const iMax = data.length
    const jMax = data[0].length

    let count = 0
    while (iIndex < iMax) {
        if (data[iIndex][jIndex] === '#') {
            count = count + 1
        }
        jIndex = (jIndex + 3) % jMax
        iIndex = iIndex + 1
    }
    console.log(count)
}

function findTrees(iStep, jStep, data) {

//start at index
    let iIndex = 0
    let jIndex = 0
    const iMax = data.length
    const jMax = data[0].length

    let count = 0
    while (iIndex < iMax) {
        if (data[iIndex][jIndex] === '#') {
            count = count + 1
        }
        jIndex = (jIndex + jStep) % jMax
        iIndex = iIndex + iStep
    }
    return count
}

function solvePartTwo() {
    const data = importFile()
    const steps = [
        [1, 1],
        [1, 3],
        [1, 5],
        [1, 7],
        [2, 1]
    ]
    const solution = steps.map((aa) => findTrees(aa[0], aa[1], data)).reduce((a, b) => a * b, 1)
    console.log(solution)
}


solvePartOne()
solvePartTwo()
