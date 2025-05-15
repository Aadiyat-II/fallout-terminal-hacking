export default class BracketPair{
    start: number
    end: number
    valid: boolean

    constructor(start: number, end: number){
        this.start=start
        this.end=end
        this.valid = (this.start > -1) && (this.end > -1)
    }
}