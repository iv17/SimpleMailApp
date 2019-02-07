import Component  from './component.js';

export default class InputField extends Component {
    constructor(id, style, type, placeholder) {
        super(id, style);
        this.type = type;
        this.placeholder = placeholder;
    }
    
    tohtml() {
        return "<input id=\'" + this.id + "\' type=\'"+ this.type + "\' class=\'"+ this.style + "\' placeholder=\'"+ this.placeholder + "\'></input>";
    }
}