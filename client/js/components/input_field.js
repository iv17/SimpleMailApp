import Component  from './component.js';

export default class InputField extends Component {
    constructor(id, CSSclass, type, placeholder, value) {
        super(id, CSSclass);
        this.type = type;
        this.placeholder = placeholder;
        this.value = value;
    }
    
    tohtml() {
        return "<input id=\'" + this.id + "\' type=\'" + this.type + "\' class=\'" + this.CSSclass + 
        "\' placeholder=\'" + this.placeholder + "\' +  value=\'" + this.value + "\'></input>";
    }
}