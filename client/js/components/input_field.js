import Component  from './component.js';

export default class InputField extends Component {
    constructor(id, CSSclass, type, placeholder) {
        super(id, CSSclass);
        this.type = type;
        this.placeholder = placeholder;
    }
    
    tohtml() {
        return "<input id=\'" + this.id + "\' type=\'"+ this.type + "\' class=\'"+ this.CSSclass + 
        "\' placeholder=\'"+ this.placeholder + "\'></input>";
    }
}