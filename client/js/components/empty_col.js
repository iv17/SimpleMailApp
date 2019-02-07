import Component from './component.js';

export default class EmptyCol extends Component {
    constructor(id, CSSclass) {
        super(id, CSSclass);
    }
    
    tohtml() {
        return "<span id=\'" + this.id + "\' class=\'" + this.CSSclass + "\'>&nbsp;</span>";
    }
}