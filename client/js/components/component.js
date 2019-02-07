export default class Component {
    constructor(id, CSSclass) {
      this.id = id;
      this.CSSclass = CSSclass;
    }
        
    setParent(parent) {
      this.parent = parent;
    }

    getParent() {
      return this.parent;
    }
    
    //http://api.jquery.com/category/manipulation/class-attribute/
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

