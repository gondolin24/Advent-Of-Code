// https://adventofcode.com/2020/day/6 -> 6534


const fs = require('fs')

function importFile() {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\r\n\r\n')
        .filter((a) => a !== '').map((a) => {
            const arr = a.split(('\r\n')).map((a)=>a.split('')).flat()
            return new Set(arr)
        })
}

function solvePartOne() {
    const data = importFile()
    const count = data.map((a) => a.size).reduce((a, b) => a + b, 0)
    console.log(count)
}

solvePartOne()

