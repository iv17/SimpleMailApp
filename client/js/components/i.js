import Component from './component.js';

export default class I extends Component {
    constructor(id, style) {
        super(id, style);
    }
    
    tohtml() {
        return "<i id=\'" + this.id + "\' class=\'" + this.style + "\'></i>";
    }
}