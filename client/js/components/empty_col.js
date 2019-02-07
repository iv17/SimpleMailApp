import Component from './component.js';

export default class EmptyCol extends Component {
    constructor(id, style) {
        super(id, style);
    }
    
    tohtml() {
        return "<span id=\'" + this.id + "\' class=\'" + this.style + "\'>&nbsp;</span>";
    }
}