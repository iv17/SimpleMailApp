import Container from './container.js';

export default class AContainer extends Container {
    constructor(id, CSSclass, text, href, tab) {
        super(id, CSSclass);
        this.text = text;
        this.href = href;
        this.tab = tab;
    }
    
    tohtml() {
        var ret = "<a id=\'" + this.id + "\' class=\'" + this.CSSclass + "\' href=\'" + this.href + "\' data-toggle=\'" + this.tab + "\'>";
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret +=  " " + this.text + "</a>";

        return ret;
    }
}