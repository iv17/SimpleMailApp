import Component from './component.js';

export default class EmptyRow extends Component {
    constructor(id, style) {
        super(id, style);
    }
    
    tohtml() {
        return "<div id=\'" + this.id + "\' class=\'" + this.style + "\'>&nbsp;</div>";
    }
}
