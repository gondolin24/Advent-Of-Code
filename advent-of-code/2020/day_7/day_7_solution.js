//https://adventofcode.com/2020/day/7
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
            const numBags = data.substr(0, processedBag.indexOf(' '))
            const subBagType = data.substr(data.indexOf(' ') + 1);
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
        return new Set(gg.map((a)=>a.bagType))
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


solvePartOne()
