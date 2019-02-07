import Component  from './component.js';

export default class Label extends Component {
    constructor(id, CSSclass, text, style) {
        super(id, CSSclass);
        this.text = text;
        this.style = style;
    }
    
    tohtml() {
        return "<span id=\'" + this.id + "\' class=\'" + this.CSSclass + "\' style=\'" + this.style + "\'>" + this.text + "</span>";
    }
}