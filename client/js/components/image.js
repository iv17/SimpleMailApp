import Component from './component.js';

export default class Image extends Component {
    constructor(id, CSSclass, src, title, width, height) {
        super(id, CSSclass);
        this.src = src;
        this.title = title;
        this.width = width;
        this.height = height;
    }
    
    tohtml() {
        return "<img id=\'" + this.id + "\' src=\'" + this.src + "\' title=\'" + this.title + "\' width=\'" + this.width + "\' height=\'" + this.height + "\'>" + "</img>";
    }
}