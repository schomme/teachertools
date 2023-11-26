export class Gradedefinition extends Array {

    constructor(display, maxpercent) {
        super()
        this.maxpercent = maxpercent
        this.maxpoints = 33
        this.display = display
        this.lowestPoint = 0.5

    }



    GetGrade = (points) => {
        var percent = this.GetPercent(points, 3)
        for (let i = 0; i < this.length; i++) {
            if (percent >= this[i].minpercent) return this[i]
        }
        return this[this.length - 1]
    }

    GetPercent = (points, decimal) => {
        var d = Math.pow(10, decimal)
        
        return Math.floor(this.maxpercent / this.maxpoints * points * d) / d
    }

    GetPoints = (p) => {
        return this.Floor(this.maxpoints * (p / this.maxpercent))
    }

    Floor = (n) => {
        return Math.floor(n / this.lowestPoint) * this.lowestPoint
     }
}