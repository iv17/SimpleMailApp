export default class Component {
  constructor(id, CSSclass) {
    this.id = id;
    this.CSSclass = CSSclass;

    this.node = document.createElement("p");
   
    this.node.id = id;
    this.node.component = this;
    document.body.appendChild(this.node);

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

  setParent(parent) {
    this.parent = parent;
  }

  getParent() {
    return this.parent;
  }

  addCSSClass(CSSclass) {
    this.CSSclass = CSSclass;
    $('#' + this.id).addClass(CSSclass);
  }

  changeCSSClass(CSSclass) {
    this.CSSclass = CSSclass;
    $('#' + this.id).toggleClass(CSSclass);
  }

  removeCSSClass(CSSclass) {
    this.CSSclass = '';
    $('#' + this.id).removeClass(CSSclass);
  }

  getCSSClass() {
    return this.CSSclass;
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

