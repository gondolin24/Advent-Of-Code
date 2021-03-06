// https://adventofcode.com/2020/day/5/answer -> 978
// https://adventofcode.com/2020/day/5#part2 -> 727
const fs = require('fs')

function importFile() {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\r\n').filter((a) => a !== '')
}


function searchR(array, min, max) {
    if (array.length === 1) {
        return (array[0] === 'B') ? max : min
    }
    const arr = Array.from(array)
    const current = arr.shift()
    if (current === 'B') {
        return searchR(arr, Math.ceil((min + max) / 2), max)
    }
    return searchR(arr, min, Math.floor((min + max) / 2))
}


function searchC(array, min, max) {
    if (array.length === 1) {
        return (array[0] === 'R') ? max : min
    }
    const arr = Array.from(array)
    const current = arr.shift()
    if (current === 'R') {
        return searchC(arr, Math.ceil((min + max) / 2), max)
    }
    return searchC(arr, min, Math.floor((min + max) / 2))
}


function solvePartOne() {
    const data = importFile().map((current) => {
        const row = current.slice(0, 7).split('')
        const column = current.slice(7, 10).split('')
        const columnNum = searchC(column, 0, 7, 'R')
        const rowNum = searchR(row, 0, 127, 'B')
        return (rowNum * 8) + columnNum
    }).sort((a, b) => b - a)


    console.log(data[0])
}


function solvePartTwo() {
    const data = importFile().map((current) => {
        const row = current.slice(0, 7).split('')
        const column = current.slice(7, 10).split('')
        const columnNum = searchC(column, 0, 7, 'R')
        const rowNum = searchR(row, 0, 127, 'B')
        return (rowNum * 8) + columnNum
    }).sort((a, b) => a - b)

    for (let i = 1; i < data.length - 2; i++) {
        if (data[i + 1] - data[i] !== 1) {
            console.log(data[i]+1)
        }
    }

}


solvePartOne()
solvePartTwo()


