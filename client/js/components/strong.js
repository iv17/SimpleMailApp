import Label from './label.js';

export default class Strong extends Label {
    constructor(id, style, text) {
        super(id, style, text);
    }
    
    tohtml() {
        return "<strong id=\'" + this.id + "\' class=\'" + this.style + "\'>" + this.text + "</strong>";
    }
}