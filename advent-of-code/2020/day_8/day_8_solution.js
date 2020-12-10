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

    fixBug() {
        let instructionIndex = 0
        let currentInstruction = this.getCurrentInstruction(0)
        const set = new Set()
        let bugFixed = false
        while (instructionIndex !== this.instructions.length) {

            if (!bugFixed) {
                const tempI = this.acc
                const {bug, newVal} = this.runBugTest(instructionIndex)
                bugFixed = bug
                currentInstruction = this.getCurrentInstruction(instructionIndex)

                if (bugFixed) {
                    currentInstruction.instruction = newVal
                }
                this.acc = tempI
            }
            set.add(instructionIndex.toString())
            const {index, instruction} = this.getPerformInstruction(currentInstruction, instructionIndex)
            instructionIndex = index
            currentInstruction = instruction
        }
        return this.acc
    }

    runBugTest(ii) {
        let instructionIndex = ii
        let currentInstruction = this.getCurrentInstruction(ii)
        let newVal = ''
        switch (currentInstruction.instruction) {
            case 'nop': {
                newVal = 'jmp'
                currentInstruction.instruction = 'jmp'
                break
            }
            case 'jmp': {
                newVal = 'nop'
                currentInstruction.instruction = 'nop'
                break
            }
            default: {
                return {
                    bug: false,
                    newVal: null
                }
            }
        }


        const set = new Set()
        while (!set.has(instructionIndex.toString()) && instructionIndex !== this.instructions.length) {
            set.add(instructionIndex.toString())
            const {index, instruction} = this.getPerformInstruction(currentInstruction, instructionIndex)
            instructionIndex = index
            currentInstruction = instruction
        }

        return {
            bug: this.instructions.length === instructionIndex,
            newVal
        }

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
        let gg = {}
        Object.assign(gg, this.instructions[index])
        return gg
    }

}

function getData() {
    return importFile().map((a) => {
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
}

function solvePartOne() {
    const data = getData()
    const game = new GameBoy(data)
    game.runGame()
    console.log(game.acc)
}

function solvePartTwo() {
    const data = getData()
    const game = new GameBoy(data)
    game.fixBug()
    console.log(game.acc)
}

solvePartOne()
solvePartTwo()
