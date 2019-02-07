import Container from './container.js';

export default class VerticalPanel extends Container {
    constructor(id, CSSclass) {
        super(id, CSSclass);
    }

    tohtml() {
        var ret = "<div id=\'" + this.id + "\' class=\'" + this.CSSclass + "\'>";
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret += "</div>";
        return ret;
    }
}