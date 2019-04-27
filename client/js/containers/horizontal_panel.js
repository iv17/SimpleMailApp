import Container from './container.js';

export default class HorizontalPanel extends Container {
    constructor(id, CSSclass) {
      super(id, CSSclass);
    }
  
    tohtml() {
      var ret = "<span id=\'" + this.id + "\' class=\'" + this.CSSclass + "\'>";
      for (var child of this.children.values()) {
          ret += child.tohtml();
      }
      ret += "</span>";
      return ret;
    }
    
  }