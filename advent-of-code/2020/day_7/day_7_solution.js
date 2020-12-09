//https://adventofcode.com/2020/day/7 => 101
// part 2 -> 108636
const fs = require('fs')

function importFile() {
    const data = fs.readFileSync('input.txt', 'utf8');
    return data.split('\r\n').filter((a) => a !== '')
}

class Bag {
    constructor(bagType, subBag) {
        this.bagType = bagType
        this.subBag = subBag
    }

    hasSubBag(value) {
        return this.subBag.some((a) => a.bagType.includes(value))
    }

    static asValueObject(rawData) {
        const [bagType, bags] = rawData.split(' bags contain ')
        const processedBag = bags.replace('.', '').split(',')
        if (processedBag[0].includes('no other bags')) {
            return new Bag(bagType, [])
        }
        const subBag = processedBag.map((data) => {
            const dd = data.trim()
            const numBags = dd.substr(0, dd.indexOf(' '))
            const subBagType = dd.substr(dd.indexOf(' ') + 1);
            return {
                bagType: subBagType,
                numBags: Number(numBags)
            }
        })

        return new Bag(bagType, subBag)
    }

}


class LuggageProcessing {
    constructor(bagMap) {
        this.bagMap = bagMap
    }

    getBag(value) {
        return Object.values(this.bagMap).find((a) => value.includes(a.bagType))
    }

    getAllChildrenFlat(children) {
        return children.map((a) => {
            let g = 0
            const arr = []
            while (g < a.numBags) {
                arr.push(a.bagType)
                g++
            }
            return arr
        }).flat()
    }

    get costOfGolden() {
        let children = this.getBag('shiny gold bag').subBag
        let flatChildren = this.getAllChildrenFlat(children)
        let count = 0
        while (flatChildren.length > 0) {

            count = count + flatChildren.length
            const ff = flatChildren.map(a => {
                const rr = this.getBag(a).subBag
                return this.getAllChildrenFlat(rr)
            }).flat()
            flatChildren = ff
        }
        return count

    }

    get goldenBagStars() {
        let parents = Object.values(this.bagMap).filter(a => a.hasSubBag('shiny gold bag'))
        let gg = parents
        while (parents.length > 0) {
            const newParents = parents.map((parentBag) => {
                return Object.values(this.bagMap).filter(a => a.hasSubBag(parentBag.bagType))
            }).flat()

            gg = gg.concat(newParents)
            parents = newParents
        }
        return new Set(gg.map((a) => a.bagType))
    }


    static fromRawData(rawData) {
        const mapData = {}
        rawData.forEach((data) => {
            const bagData = Bag.asValueObject(data)
            mapData[bagData.bagType] = bagData
        })

        Object.values(mapData)

        return new LuggageProcessing(mapData)
    }
}


function solvePartOne() {
    const data = importFile()
    const luggageDepartment = LuggageProcessing.fromRawData(data)
    console.log(luggageDepartment.goldenBagStars.size)
}

function solvePartTwo() {
    const data = importFile()
    const luggageDepartment = LuggageProcessing.fromRawData(data)
    console.log(luggageDepartment.costOfGolden)
}

solvePartOne()
solvePartTwo()
