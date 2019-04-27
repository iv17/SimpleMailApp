import Container from './container.js';

export default class Form extends Container {
    constructor(id, CSSclass) {
        super(id, CSSclass);
    }
    
    tohtml() {
        var ret = "<form id=\'" + this.id + "\' class=\'" + this.CSSclass + "\'>";
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret += "</form>";
        return ret;
    }
    
}