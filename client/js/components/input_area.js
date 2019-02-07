import Component  from './component.js';

export default class InputArea extends Component {
    constructor(id, style, placeholder, rows, cols) {
        super(id, style);
        this.placeholder = placeholder;
        this.rows = rows;
        this.cols = cols;
    }
    
    tohtml() {
        return "<textarea id=\'" + this.id + "\' class=\'"+ this.style + "\' placeholder=\'"+ this.placeholder + "\' rows=\'" + this.rows + "\' cols=\'"+ this.cols + "\' ></textarea>";
    }
}