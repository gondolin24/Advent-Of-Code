const fs = require('fs')

function importFile() {
    const data = fs.readFileSync('input.txt', 'utf8');

    const boards = data.split('\r\n\r\n')
    const sequence = boards.shift()

    const players = boards.map((board) => {
        return board.split('\r\n').map((a) => a.split(' ').map((b) => b.trim()).filter((g) => g !== '')).filter((arr) => arr.length > 0)
    })

    return {
        sequence: sequence.split(',').map((b) => b.trim()).filter((g) => g !== ''),
        players
    }
}

function isSolved(board) {

    for (let i = 0; i < board.length; i++) {
        const set = new Set(board[i])
        if (set.size === 1) {
            return true
        }
    }
    for (let j = 0; j < board[0].length; j++) {
        const arr = []
        for (let i = 0; i < board.length; i++) {
            arr.push(board[i][j])
        }
        const set = new Set(arr)
        if (set.size === 1) {
            return true
        }
    }

    const set = new Set()
    for (let i = 0; i < board.length; i++) {
        set.add(board[i][i])
    }
    if (set.size === 1) {
        return true
    }
    set.clear()

    for (let i = board.length - 1; i >= 0; i--) {
        set.add(board[i][i])
    }
    return set.size === 1;
}

function getSum(board) {

    return board.reduce((acc, current) => {

        const sum = current.map((a) => {
            if (a === 'X') {
                return 0
            }
            return Number(a)
        }).reduce((t, y) => t + y, 0)
        return acc + sum
    }, 0)

}

function solve(sequence, mappedIndex, board) {
    if (sequence.length === 0) {
        return {
            index: sequence.length,
            sum: Number.MAX_SAFE_INTEGER
        }
    }
    const current = sequence.shift()
    if (mappedIndex.has(current)) {
        const [i, j] = mappedIndex.get(current)
        mappedIndex.delete(current)
        board[i][j] = 'X'
        if (isSolved(board)) {
            return {
                index: sequence.length,
                sum: getSum(board) * Number(current),
                board: board
            }
        }
    }

    return solve(sequence, mappedIndex, board)
}

function solvePartOne(data) {
    const {players, sequence} = data
    // map key the index
    const mappedIndex = players.map((playerBoard) => {
        const map = new Map()

        for (let i = 0; i < playerBoard.length; i++) {
            for (let j = 0; j < playerBoard[0].length; j++) {
                const val = playerBoard[i][j]
                map.set(val, [i, j])
            }
        }
        return map
    })

    const gg = [...mappedIndex.values()].map((mappedI, index) => solve([...sequence], mappedI, players[index]))
    const sorted = gg.sort((a, b) => b.index - a.index)
    return sorted[0].sum

}

function solvePartTwo(data) {
    const {players, sequence} = data
    // map key the index
    const mappedIndex = players.map((playerBoard) => {
        const map = new Map()

        for (let i = 0; i < playerBoard.length; i++) {
            for (let j = 0; j < playerBoard[0].length; j++) {
               const val = playerBoard[i][j]
                map.set(val, [i, j])
            }
        }
        return map
    })

    const gg = [...mappedIndex.values()].map((mappedI, index) => solve([...sequence], mappedI, players[index]))
    const sorted = gg.sort((a, b) => a.index - b.index)
    return sorted[0].sum
}


console.log(solvePartTwo(importFile()))
