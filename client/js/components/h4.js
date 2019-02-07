import Label from './label.js';

export default class H4 extends Label {
    constructor(id, style, text) {
        super(id, style, text);
    }
    
    tohtml() {
        return "<h4 id=\'" + this.id + "\' class=\'" + this.style + "\'>" + this.text + "</h4>";
    }
}