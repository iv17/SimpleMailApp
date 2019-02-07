import Container from './container.js';

export default class ButtonContainer extends Container {
    constructor(id, CSSclass, text, type, datatoggle) {
        super(id, CSSclass);
        this.text = text;
        this.type = type;
        this.datatoggle = datatoggle;
    }
    
    tohtml() {
        var ret = "<button id=\'" + this.id + "\' type=\'"+ this.type + "\' class=\'" + this.CSSclass + "\' data-toggle=\'" + this.datatoggle + "\'>" + this.text;
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret += "</button>";

        return ret;
    }
}