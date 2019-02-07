import Container from './container.js';

export default class HorizontalPanel extends Container {
    constructor(id, style) {
      super(id, style);
    }
  
    tohtml() {
      var ret = "<span id=\'" + this.id + "\' class=\'" + this.style + "\'>";
      for (var child of this.children.values()) {
          ret += child.tohtml();
      }
      ret += "</span>";
      return ret;
    }
  }