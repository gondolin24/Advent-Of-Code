const fs = require('fs')

function importFile() {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\r\n').filter((a) => a !== '').map((a) => Number(a))
}


function hasValuePair(target, arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let k = i + 1; k < arr.length; k++) {
            if ((arr[k] + arr[i] === target)){
                return true
            }
        }
    }
    return false

}

function solvePartOne() {
    const data = importFile()
    const preambleLength = 25
    for (let i = preambleLength; i < data.length; i++) {
        const preamble = [...data].splice(i - preambleLength, preambleLength)
        if (!hasValuePair(data[i], preamble)) {
            console.log(data[i])
        }
    }

    const g = 0
}

solvePartOne()
