const fs = require('fs')

function importFile() {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\r\n').filter((a) => a !== '').map((a) => Number(a))
}


function hasValuePair(target, arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let k = i + 1; k < arr.length; k++) {
            if ((arr[k] + arr[i] === target)) {
                return true
            }
        }
    }
    return false

}

function solvePartOne() {
    const data = importFile()
    const preambleLength = 5
    for (let i = preambleLength; i < data.length; i++) {
        const preamble = [...data].splice(i - preambleLength, preambleLength)
        if (!hasValuePair(data[i], preamble)) {
            const value = {
                data: data[i],
                index: i
            }

            return value
        }
    }
}

function dynamicStuff(array, target) {
    //generate matrix
    // const test = [2, 3, 7, 8, 10]

    const matrix = []
    array.forEach((value, valIndex) => {
        const row = Array(target + 1).fill(false).map((val, index) => {
            if (index === 0) {
                return true
            }
            if (valIndex === 0) {

                return index === value
            }
            return (matrix[valIndex - 1][index] === true) || (matrix[valIndex - 1][index - value] === true)
        })
        matrix.push(row)
    })

    // get sum
    const arr = []
    let currentI = array.length - 1
    let currentK = target
    let current = matrix[currentI][currentK]
    while (current === true) {
        if (matrix[currentI - 1][currentK] === true) {
            arr.push(array[currentI - 1])
            currentI = currentI - 1
        } else {
            const temp = array[currentI]
            if (matrix[currentI - 1][currentK-temp]  === true && (currentK-temp!==0)) {
                // arr.push(currentK-temp)
                currentI = currentI - 1
                currentK = currentK-temp
            } else {
                current = false
            }
        }

    }

    const gg = 0
}


function solvePartTwo() {
    const dd = importFile()

    const {data, index} = solvePartOne()
    const preamble = [...dd].splice(0, index)
    const sort = preamble.sort((a, b) => a - b)
    dynamicStuff(sort, data)
}

console.log(solvePartOne())
solvePartTwo()
