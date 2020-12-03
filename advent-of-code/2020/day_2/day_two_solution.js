// https://adventofcode.com/2020/day/2#part1  603
// https://adventofcode.com/2020/day/2#part2 404
const fs = require('fs')

function importFile() {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\r\n').filter((a) => a !== '').map((str) => {
        const [firstIndex, remaining] = str.split('-')
        const [nextIndex, char, password] = remaining.split(' ')
        const [value] = char[0]
        return {
            min: Number(firstIndex),
            max: Number(nextIndex),
            look: value,
            password
        }
    })
}


function solvePartOne() {
    const data = importFile()
    const valid = data.filter((metaData) => {
        const {min, max, look, password} = metaData
        const count = password.split('').filter((char) => char === look)
        return count.length >= min && count.length <= max
    })
    console.log(valid.length)
}

function solvePartTwo() {
    const data = importFile()
    const valid = data.filter((metaData) => {
        const {min, max, look, password} = metaData
        const minVal = password[min - 1]
        const maxVal = password[max - 1]

        if (minVal !== look && maxVal !== look) {
            return false
        }
        if (minVal === look && maxVal !== look) {
            return true
        }
        if (minVal !== look && maxVal === look) {
            return true
        }
        return false

    })
    console.log(valid.length)
}


solvePartTwo()
