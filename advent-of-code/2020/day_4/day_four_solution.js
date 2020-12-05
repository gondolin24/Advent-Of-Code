// https://adventofcode.com/2020/day/4 => 239
// https://adventofcode.com/2020/day/4#part2 -> 188


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


function validatePass(passport) {
    const eyeColor = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
    const byr = Number(passport['byr'])
    const iyr = Number(passport['iyr'])
    const eyr = Number(passport['eyr'])
    const hgt = passport['hgt']
    const hcl = passport['hcl']
    const ecl = passport['ecl']
    const pid = passport['pid']


    if ((byr) < 1920 || (byr) > 2002) {
        return false
    }

    if ((iyr) < 2010 || (iyr) > 2020) {
        return false
    }
    if ((eyr) < 2020 || (eyr) > 2030) {
        return false
    }
    const isHcm = hgt.includes('cm')

    if (isHcm) {
        const temp = Number(hgt.replace('cm', ''))
        if ((temp) < 150 || (temp) > 193) {
            return false
        }
    }

    if (!isHcm) {
        const temp = Number(hgt.replace('in', ''))
        if ((temp) < 59 || (temp) > 76) {
            return false
        }

    }

    if (!eyeColor.includes(ecl)) {
        return false
    }

    if (pid.length !== 9) {
        return false
    }
    if (Number(pid) > 1000000000) {
        return false
    }

    if (hcl[0] !== '#') {
        return false
    }

    const [a, b] = hcl.split('#')
    const validate = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'].map((a) => a.toString())
    const gg = b.split('')
    return gg.every(i =>{
        return validate.includes(i)
    })
}

function solvePartOne() {
    const data = importFile()
    const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

    const final = data.filter((d) => {
        const keys = Object.keys(d)
        const pre = requiredKeys.every(i => keys.includes(i))
        if (!pre) {
            return false
        }
        return validatePass(d)

    })
    console.log(final.length)
}

solvePartOne()
