import Component from './component.js';

export default class InputAreaWithValue extends Component {
    constructor(id, CSSclass, placeholder, rows, cols, value) {
        super(id, CSSclass);
        this.placeholder = placeholder;
        this.rows = rows;
        this.cols = cols;
        this.value = value;
    }
    
    tohtml() {
        return "<textarea id=\'" + this.id + "\' class=\'" + this.CSSclass + "\' placeholder=\'" 
            + this.placeholder + "\' rows=\'" + this.rows + "\' cols=\'"+ this.cols + "\' >"
            + this.value + "</textarea>";
    }
}