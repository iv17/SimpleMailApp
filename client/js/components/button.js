import Component  from './component.js';

export default class Button extends Component {
    constructor(id, CSSclass, text, type) {
        super(id, CSSclass);
        this.text = text;
        this.type = type;
    }
    
    tohtml() {
        return "<button id=\'" + this.id + "\' type=\'"+ this.type + "\' class=\'" + this.CSSclass + "\'>" + this.text + "</button>";
    }
}