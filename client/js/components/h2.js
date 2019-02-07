import Label  from './label.js';

export default class H1 extends Label {
    constructor(id, style, text) {
        super(id, style, text);
    }
    
    tohtml() {
        return "<h2 id=\'" + this.id + "\' class=\'" + this.style + "\'>" + this.text + "</h2>";
    }
}