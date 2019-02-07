export default class Component {
    constructor(id, style) {
      this.id = id;
      this.style = style;
    }
        
    setParent(parent) {
      this.parent = parent;
    }
    getParent() {
      return component.parent;
    }
    
    setStyle(style) {
      this.style = style;
    }
    getStyle() {
      return this.style;
    }
    
    tohtml_b() {
      return "";
    }
    tohtml_e() {
      return "";
    }
    tohtml() {
      return "";
    }
}

