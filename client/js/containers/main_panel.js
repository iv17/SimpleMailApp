import Container from './container.js';

export default class MainPanel extends Container {
    constructor(id, CSSclass) {
        super(id, CSSclass);
        this.body = document.body;
    }

    tohtml() {
        var ret = "<div id=\'" + this.id + "\' class=\'" + this.CSSclass + "\'>";
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret += "</div>";
        return ret;
    }

    draw() { 
        var src = this.tohtml();
        $(this.body).append(src);//doda u memoriju
        this.element = $("#" + this.id)[0]; //doda u dom
        $("#" + this.id).append(this);
    }
}