import Container from './container.js';

export default class LI extends Container {
    constructor(id, style) {
        super(id, style);
    }
    
    tohtml() {
        var ret = "<li id=\'" + this.id + "\' class=\'" + this.style + "\'>";
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret += "</li>";
        return ret;
    }
}