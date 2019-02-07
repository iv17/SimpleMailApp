import Label  from './label.js';

export default class H6 extends Label {
    constructor(id, CSSclass, text) {
        super(id, CSSclass, text);
    }
    
    tohtml() {
        return "<h6 id=\'" + this.id + "\' class=\'" + this.CSSclass + "\'>" + this.text + "</h6>";
    }
}