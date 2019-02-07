import Label from './label.js';

export default class A extends Label {
    constructor(id, style, text, href) {
        super(id, style, text);
        this.href = href;
    }
    
    tohtml() {
        return "<a id=\'" + this.id + "\' class=\'" + this.style + "\' href=\'" + this.href + "\'>" + this.text + "</a>";
    }
}