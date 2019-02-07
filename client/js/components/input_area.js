import Component  from './component.js';

export default class InputArea extends Component {
    constructor(id, CSSclass, placeholder, rows, cols) {
        super(id, CSSclass);
        this.placeholder = placeholder;
        this.rows = rows;
        this.cols = cols;
    }
    
    tohtml() {
        return "<textarea id=\'" + this.id + "\' class=\'"+ this.CSSclass + "\' placeholder=\'"+ this.placeholder + "\' rows=\'" + this.rows + "\' cols=\'"+ this.cols + "\' ></textarea>";
    }
}