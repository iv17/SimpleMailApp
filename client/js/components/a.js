import Label from './label.js';

export default class A extends Label {
    constructor(id, CSSclass, text, href) {
        super(id, CSSclass, text);
        this.href = href;
    }
    
    tohtml() {
        return "<a id=\'" + this.id + "\' class=\'" + this.CSSclass + "\' href=\'" + this.href + "\'>" + this.text + "</a>";
    }
}