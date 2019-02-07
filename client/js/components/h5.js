import Label  from './label.js';

class H5 extends Label {
    constructor(id, CSSclass, text) {
        super(id, CSSclass, text);
    }
    
    tohtml() {
        return "<h5 id=\'" + this.id + "\' class=\'" + this.CSSclass + "\'>" + this.text + "</h5>";
    }
}

export default H5;