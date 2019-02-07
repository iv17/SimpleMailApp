import Container from './container.js';

export default class MainPanel extends Container {
    constructor(id, style) {
        super(id, style);
        this.body = document.body;
    }

  draw() {
    var src = super.tohtml();
    
    $(this.body).append(src);
    for (var child of this.children.values()) {
        super.addListeners(child);
        child.element = $("#" + child.id)[0];
    }
  }
}