import Container from './container.js';

export default class ButtonContainer extends Container {
    constructor(id, style, text, type, datatoggle) {
        super(id, style);
        this.text = text;
        this.type = type;
        this.datatoggle = datatoggle;
    }
    
    tohtml() {
        var ret = "<button id=\'" + this.id + "\' type=\'"+ this.type + "\' class=\'" + this.style + "\' data-toggle=\'" + this.datatoggle + "\'>" + this.text;
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret += "</button>";

        return ret;
    }
}