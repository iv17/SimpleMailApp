import Container from './container.js';

export default class VerticalPanel extends Container {
    constructor(id, style) {
        super(id, style);
    }

    tohtml() {
        var ret = "<div id=\'" + this.id + "\' class=\'" + this.style + "\'>";
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret += "</div>";
        return ret;
    }
}