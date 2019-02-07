import Component from './component.js';

export default class EmptyRow extends Component {
    constructor(id, CSSclass) {
        super(id, CSSclass);
    }
    
    tohtml() {
        return "<div id=\'" + this.id + "\' class=\'" + this.CSSclass + "\'>&nbsp;</div>";
    }
}
