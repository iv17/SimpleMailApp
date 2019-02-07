import Component  from './component.js';

export default class Label extends Component {
    constructor(id, style, text, style2) {
        super(id, style);
        this.text = text;
        this.style2 = style2;
    }
    
    tohtml() {
        return "<span id=\'" + this.id + "\' class=\'" + this.style + "\' style=\'" + this.style2 + "\'>" + this.text + "</span>";
    }
}