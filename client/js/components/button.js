import Component  from './component.js';

export default class Button extends Component {
    constructor(id, CSSclass, text, type, style) {
        super(id, CSSclass);
        this.text = text;
        this.type = type;
        this.style = style;
    }

    tohtml() {
        return "<button id=\'" + this.id + "\' type=\'"+ this.type + "\' class=\'" + this.CSSclass + "\' + style=\'" + this.style + "\'>" + this.text + "</button>";
    }
}