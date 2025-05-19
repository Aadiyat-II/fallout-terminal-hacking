export default class BracketPair{
    start: number
    end: number
    valid: boolean
    selection: string

    constructor(start: number, end: number, selection:string=""){
        this.start = start
        this.end = end
        this.valid = (this.start > -1) && (this.end > -1)
        this.selection = selection
    }
}