export class Gradedefinition extends Array{

    constructor(display){
        super()

        this.display = display
    }

    GetGrade = (p) => {
        for(let i = 0; i < this.length; i++){
            if(p >= this[i].minpercent) return this[i]
          }
          return this[this.length-1]
    }
}