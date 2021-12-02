// part one

const part_1_input = [
    199,
    200,
    208,
    210,
    200,
    207,
    240,
    269,
    260,
    263
]

function solvePartOne(data) {

    const maxIncrease = data.reduce((acc, current) => {
        const {prev} = acc

        if (prev <= current) {
            acc.count = acc.count + 1
        }
        acc.prev = current
        return acc

    }, {
        prev: Number.MAX_SAFE_INTEGER,
        count: 0
    })

    return maxIncrease.count

}

console.log(solvePartOne(part_1_input) === 7)
