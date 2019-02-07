import Component from './component.js';

export default class I extends Component {
    constructor(id, CSSclass) {
        super(id, CSSclass);
    }
    
    tohtml() {
        return "<i id=\'" + this.id + "\' class=\'" + this.CSSclass + "\'></i>";
    }
}