import Label from './label.js';

export default class H4 extends Label {
    constructor(id, CSSclass, text) {
        super(id, CSSclass, text);
    }
    
    tohtml() {
        return "<h4 id=\'" + this.id + "\' class=\'" + this.CSSclass + "\'>" + this.text + "</h4>";
    }
}