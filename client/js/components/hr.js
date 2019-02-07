import Component from './component.js';

export default class HR extends Component {
    constructor(id) {
        super(id);
    }
    
    tohtml() {
        return "<hr id=\'" + this.id + "\'/>";
    }
}