import Label from './label.js';

export default class Strong extends Label {
    constructor(id, CSSclass, text) {
        super(id, CSSclass, text);
    }
    
    tohtml() {
        return "<strong id=\'" + this.id + "\' class=\'" + this.CSSclass + "\'>" + this.text + "</strong>";
    }
}