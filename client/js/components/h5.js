import Label  from './label.js';

class H5 extends Label {
    constructor(id, style, text) {
        super(id, style, text);
    }
    
    tohtml() {
        return "<h5 id=\'" + this.id + "\' class=\'" + this.style + "\'>" + this.text + "</h5>";
    }
}

export default H5;