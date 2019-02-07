import Container from './container.js';

export default class LI extends Container {
    constructor(id, CSSclass) {
        super(id, CSSclass);
    }
    
    tohtml() {
        var ret = "<li id=\'" + this.id + "\' class=\'" + this.CSSclass + "\'>";
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret += "</li>";
        return ret;
    }
}