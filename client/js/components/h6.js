import Label  from './label.js';

export default class H6 extends Label {
    constructor(id, style, text) {
        super(id, style, text);
    }
    
    tohtml() {
        return "<h6 id=\'" + this.id + "\' class=\'" + this.style + "\'>" + this.text + "</h6>";
    }
}