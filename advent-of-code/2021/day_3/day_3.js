const fs = require('fs')

function importFile() {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\r\n').map((line) => {

        return line.split('')
    })
}

function solvePartOne(data) {

    let bitMap = []
    let inverseMap = []
    for (let j = 0; j < data[0].length; j++) {
        let zeroCount = 0
        let oneCount = 0
        for (let i = 0; i < data.length; i++) {
            if (Number(data[i][j]) === 0) {
                zeroCount++
            } else {
                oneCount++
            }
        }
        if (zeroCount > oneCount) {
            bitMap.push(0)
            inverseMap.push(1)
        } else {
            bitMap.push(1)
            inverseMap.push(0)
        }
    }
    const epsilon = parseInt(bitMap.join(''), 2)
    const gamma = parseInt(inverseMap.join(''), 2)

    return epsilon * gamma
}


function scrubberRecurse(data, j) {

    if (data.length === 1) {
        return parseInt(data[0].join(''), 2)
    }

    let oneCount = 0
    let zeroCount = 0

    for (let i = 0; i < data.length; i++) {
        if (Number(data[i][j]) === 0) {
            zeroCount++
        } else {
            oneCount++
        }
    }
    const filterValue = (zeroCount > oneCount) ? '0' : '1'
    const newData = data.filter((subArry) => subArry[j] === filterValue)
    return scrubberRecurse(newData, j + 1)
}

function oxyRecurse(data, j) {
    if (data.length === 1) {
        return parseInt(data[0].join(''), 2)
    }

    let oneCount = 0
    let zeroCount = 0

    for (let i = 0; i < data.length; i++) {
        if (Number(data[i][j]) === 0) {
            zeroCount++
        } else {
            oneCount++
        }
    }
    const filterValue = (zeroCount <= oneCount) ? '0' : '1'
    const newData = data.filter((subArry) => subArry[j] === filterValue)
    return oxyRecurse(newData, j + 1)
}

function solvePartTwo(data) {
    const oxy = [...data]
    const coScrubber = [...data]
    const gg = scrubberRecurse(coScrubber, 0)
    const next = oxyRecurse(oxy, 0)
    return gg * next
}

console.log(solvePartTwo(importFile()))

