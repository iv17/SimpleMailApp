export default class Component {
  constructor(id, CSSclass) {
    this.id = id;
    this.CSSclass = CSSclass;
    this.node = document.createElement("div");
    this.node.id = id;
    this.node.component = this;
    document.body.appendChild(this.node);
  }

  setParent(parent) {
    this.parent = parent;
  }

  getParent() {
    return this.parent;
  }

  getCSSClass() {
    return this.CSSclass;
  }

  addCSSClass(CSSclass) {
    this.CSSclass = CSSclass;
    $('#' + this.id).addClass(CSSclass);
  }

  removeCSSClass(CSSclass) {
    this.CSSclass = '';
    $('#' + this.id).removeClass(CSSclass);
  }

  findById(id) {
    var parent = this.getParent();
    for (var child of parent.children.values()) {
      if (child.id == id) {
        return child;
      }
    }
    return parent.findById(id);
  }

  tohtml() {
    return "";
  }

}

