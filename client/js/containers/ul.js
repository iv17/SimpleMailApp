import Container from './container.js';

export default class UL extends Container {
    constructor(id, style) {
        super(id, style);
    }
    
    tohtml() {
        var ret = "<ul id=\'" + this.id + "\' class=\'" + this.style + "\'>";
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret += "</ul>";
        return ret;
    }
}