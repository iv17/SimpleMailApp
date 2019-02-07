import Container from './container.js';

export default class Form extends Container {
    constructor(id, style) {
        super(id, style);
    }
    
    tohtml() {
        var ret = "<form id=\'" + this.id + "\' class=\'" + this.style + "\'>";
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret += "</form>";
        return ret;
    }
}