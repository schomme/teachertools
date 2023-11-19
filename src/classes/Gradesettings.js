import { Gradedefinition } from "./Gradedefinition";

export class Gradesettings {

    constructor() {

        this.special = new Gradedefinition("Spezial")
        this.special.push(
            {
                display: "E1",
                minpercent: 92,
            },
            {
                display: "E2",
                minpercent: 81,
            },
            {
                display: "E3",
                minpercent: 75,
            },
            {
                display: "G3",
                minpercent: 50,
            },
            {
                display: "G4",
                minpercent: 40,
            },
            {
                display: "G5",
                minpercent: 25,
            },
            {
                display: "G6",
                minpercent: 0,
            })


        this.normal = new Gradedefinition("Normal")

        this.normal.push({
            display: "1",
            minpercent: 92,
        },
            {
                display: "2",
                minpercent: 81,
            },
            {
                display: "3",
                minpercent: 75,
            },
            {
                display: "4",
                minpercent: 50,
            },
            {
                display: "5",
                minpercent: 40,
            },
            {
                display: "6",
                minpercent: 0,
            })
    }

}