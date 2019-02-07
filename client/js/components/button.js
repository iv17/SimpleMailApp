import Component  from './component.js';

export default class Button extends Component {
    constructor(id, style, text, type) {
        super(id, style);
        this.text = text;
        this.type = type;
    }
    
    tohtml() {
        return "<button id=\'" + this.id + "\' type=\'"+ this.type + "\' class=\'" + this.style + "\'>" + this.text + "</button>";
    }
}