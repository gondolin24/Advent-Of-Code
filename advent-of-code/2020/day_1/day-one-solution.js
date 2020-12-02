/*https://adventofcode.com/2020/day/1*/
/*926464 solution*/

/*https://adventofcode.com/2020/day/1#part2*/
// solution: 65656536
const fs = require('fs')

function importFile() {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\r\n').map((num) => Number(num))
}


function getPair(data) {

    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            if ((data[i] + data[j]) === 2020) {
                return data[i] * data[j]
            }
        }
    }
    return 0
}


function getThree(data) {

    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            for (let k = j + 1; k < data.length; k++) {
                if ((data[i] + data[j] + data[k]) === 2020) {
                    return data[i] * data[j]* data[k]
                }
            }
        }
    }
    return 0
}


function solvePartOne() {
    const data = importFile()
    console.log(getPair(data))
}
function solvePartTwo() {
    const data = importFile()
    console.log(getThree(data))
}
solvePartOne()
solvePartTwo()
