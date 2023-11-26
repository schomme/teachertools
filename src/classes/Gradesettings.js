import { Gradedefinition } from "./Gradedefinition";

export class Gradesettings {

    constructor() {


        this.special = new Gradedefinition("Spezial", 110)
        this.special.push(
            {
                display: "E1",
                minpercent: 101,
            },
            {
                display: "E2",
                minpercent: 91,
            },
            {
                display: "E3",
                minpercent: 79,
            },
            {
                display: "G3",
                minpercent: 66,
            },
            {
                display: "G4",
                minpercent: 50,
            },
            {
                display: "G5",
                minpercent: 30,
            },
            {
                display: "G6",
                minpercent: 0,
            })


        this.normal = new Gradedefinition("Normal", 100)

        this.normal.push(
            {
                display: "1",
                minpercent: 95,
            },
            {
                display: "2",
                minpercent: 81,
            },
            {
                display: "3",
                minpercent: 67,
            },
            {
                display: "4",
                minpercent: 50,
            },
            {
                display: "5",
                minpercent: 30,
            },
            {
                display: "6",
                minpercent: 0,
            })
    }



}