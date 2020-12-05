// https://adventofcode.com/2020/day/4 => 239
// https://adventofcode.com/2020/day/4#part2


const fs = require('fs')

function importFile() {
    const data = fs.readFileSync('input.txt', 'utf8');
    const pre = data.split('\r\n\r\n').filter((a) => a !== '').map((a) => a.split('\r\n').join(' ')).map((a) => a.split(' '))
    return pre.map((pass) => {
        const item = {}
        pass.forEach((r) => {
            const [key, value] = r.split(':')
            item[key] = value
        })
        return item
    })
}


function solvePartOne() {
    const data = importFile()
    const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

    const final = data.filter((d) => {
        const keys = Object.keys(d)
        return requiredKeys.every(i => keys.includes(i))
    })
    console.log(final.length)
}

solvePartOne()
