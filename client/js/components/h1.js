import Label  from './label.js';

export default class H1 extends Label {
    constructor(id, CSSclass, text) {
        super(id, CSSclass, text);
    }
    
    tohtml() {
        return "<h1 id=\'" + this.id + "\' class=\'" + this.CSSclass + "\'>" + this.text + "</h1>";
    }
}