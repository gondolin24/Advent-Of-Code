//https://adventofcode.com/2020/day/8 ->
//part 2 ->
const fs = require('fs')

function importFile() {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\r\n').filter((a) => a !== '')
}


class GameBoy {

    constructor(instructions) {
        this.instructions = instructions
        this.acc = 0
    }

    runGame() {
        let instructionIndex = 0
        let currentInstruction = this.getCurrentInstruction(0)
        const set = new Set()
        while (!set.has(instructionIndex.toString())) {
            set.add(instructionIndex.toString())

            const {index, instruction} = this.getPerformInstruction(currentInstruction, instructionIndex)
            instructionIndex = index
            currentInstruction = instruction
        }

        return this.acc
    }


    getPerformInstruction(current, index) {
        const {instruction, value} = current
        let nextIndex = index

        switch (instruction) {
            case 'nop': {
                nextIndex = nextIndex + 1
                break
            }
            case 'acc': {
                this.acc = this.acc + value
                nextIndex = nextIndex + 1
                break
            }
            case 'jmp': {
                nextIndex = nextIndex + value
                break
            }
            default: {
                nextIndex = nextIndex + 1
                break
            }
        }

        return {
            index: nextIndex,
            instruction: this.instructions[nextIndex]
        }
    }


    getCurrentInstruction(index) {
        return this.instructions[index]
    }

}


function

solvePartOne() {
    const data = importFile().map((a) => {
        const [instruction, value] = a.split(' ')
        let currVal = value
        if (value.includes('+')) {
            const [d, dd] = value.split('+')
            currVal = dd
        }
        return {
            instruction,
            value: Number(currVal)
        }
    })
    const game = new GameBoy(data)
    game.runGame()
    console.log(game.acc)

}

solvePartOne()
