import Container from './container.js';

export default class MainPanel extends Container {
    constructor(id, CSSclass) {
        super(id, CSSclass);
        this.body = document.body;
    }

  draw() {
   /* var src = super.tohtml();
    
    $(this.body).append(src);
    this.element = $("#" + this.id)[0];
    $("#" + this.id).append(this);
    console.log(src)*/
    var src = super.tohtml();
    $(this.body).append(src);
    for (var child of this.children.values()) {
        super.addListeners(child);
        child.element = $("#" + child.id)[0];
    }
  }
}