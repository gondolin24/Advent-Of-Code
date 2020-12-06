// https://adventofcode.com/2020/day/6 -> 6534
// https://adventofcode.com/2020/day/6#part2 => 3402


const fs = require('fs')

function importFile() {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\r\n\r\n').filter((a) => a !== '')
}

function solvePartOne() {
    const data = importFile()
    const count = data.map((a) => {
        const arr = a.split(('\r\n')).map((a) => a.split('')).flat()
        return new Set(arr)
    }).map((a) => a.size).reduce((a, b) => a + b, 0)
    console.log(count)
}

function solvePartTwo() {
    const data = importFile()
    const count = data.map((group) => {
        // array or arrays
        const map = {}
        const personAnswers = group.split(('\r\n'))
            .filter(a => a !== '')
            .map((a) => a.split(''))
        personAnswers.forEach((answerList) => {
            answerList.forEach((answer) => {
                if (!map[answer]) {
                    map[answer] = 1
                } else {
                    map[answer] = map[answer] + 1
                }
            })
        })
        const set = new Set()
        Object.entries(map).forEach((mapValues) => {
            const [key, value] = mapValues
            if (value === personAnswers.length) {
                set.add(key)
            }
        })
        return set
    }).map((a) => a.size).reduce((a, b) => a + b, 0)
    console.log(count)
}


solvePartOne()
solvePartTwo()

