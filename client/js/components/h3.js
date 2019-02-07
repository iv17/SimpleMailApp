import Label  from './label.js';

export default class H1 extends Label {
    constructor(id, style, text) {
        super(id, style, text);
    }
    
    tohtml() {
        return "<h3 id=\'" + this.id + "\' class=\'" + this.style + "\'>" + this.text + "</h3>";
    }
}