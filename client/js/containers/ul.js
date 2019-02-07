import Container from './container.js';

export default class UL extends Container {
    constructor(id, CSSclass) {
        super(id, CSSclass);
    }
    
    tohtml() {
        var ret = "<ul id=\'" + this.id + "\' class=\'" + this.CSSclass + "\'>";
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret += "</ul>";
        return ret;
    }
}