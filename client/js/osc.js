import A from './components/a.js';
import Button from './components/button.js';
import EmptyCol from './components/empty_col.js';
import EmptyRow from './components/empty_row.js';
import H1 from './components/h1.js';
import H2 from './components/h2.js';
import H3 from './components/h3.js';
import H4 from './components/h4.js';
import H5 from './components/h5.js';
import H6 from './components/h6.js';
import HR from './components/hr.js';
import I from './components/i.js';
import Image from './components/image.js';
import InputArea from './components/input_area.js';
import InputField from './components/input_field.js';
import Strong from './components/strong.js';
import Label from './components/label.js';
import AContainer from './containers/a_container.js';
import ButtonContainer from './containers/button_container.js';
import Form from './containers/form.js';
import HorizontalPanel from './containers/horizontal_panel.js';
import LI from './containers/li.js';
import MainPanel from './containers/main_panel.js';
import UL from './containers/ul.js';
import VerticalPanel from './containers/vertical_panel.js';

export {
    A, Button, EmptyCol, EmptyRow, H1, H2, H3, H4, H5, H6, HR, I, Image,
    InputArea, InputField, Strong, Label, AContainer, ButtonContainer,
    Form, HorizontalPanel, LI, MainPanel, UL, VerticalPanel
}

/*class Component {
    constructor(id, style) {
      this.id = id;
      this.style = style;
    }

    setParent(parent) {
      this.parent = parent;
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
export default class Container extends Component {
    constructor(id, style) {
        super(id, style);
        this.children = new Map();
    }
    add(component) {
        this.children.set(component.id, component);
        component.setParent(this);
    }

    remove(component) {
        children.delete(component.id);
    }

    addListeners(component) {
        if (component.children) {
            for (var child of component.children.values()) {
                this.addListeners(child);
            }
        }
        if (component.onclick) {
            $("#" + component.id).click(component.onclick);
        }
        if (component.ondblclick) {
            $("#" + component.id).dblclick(component.ondblclick);
        }
        if (component.onfocus) {
            $("#" + component.id).mouseenter(component.onfocus);
        }
        if (component.onchange) {
            $("#" + component.id).change(component.onchange);
        }
        if (component.onhover) {
            $("#" + component.id).hover(component.onhover);
        }
        if (component.onsubmit) {
            $("#" + component.id).submit(component.onsubmit);
        }
        var el = $("#" + component.id);
        el[0].component = component;
    }

    tohtml() {
        var ret = "";
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        return ret;
    }
}

export default class VerticalPanel extends Container {
    constructor(id, style) {
        super(id, style);
    }

    tohtml() {
        var ret = "<div id=\'" + this.id + "\' class=\'" + this.style + "\'>";
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret += "</div>";
        return ret;
    }
}

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

export default class Form extends Container {
    constructor(id, style) {
        super(id, style);
    }

    tohtml() {
        var ret = "<form id=\'" + this.id + "\' class=\'" + this.style + "\'>";
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret += "</form>";
        return ret;
    }
}

export default class UL extends Container {
    constructor(id, style) {
        super(id, style);
    }

    tohtml() {
        var ret = "<ul id=\'" + this.id + "\' class=\'" + this.style + "\'>";
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret += "</ul>";
        return ret;
    }
}

export default class LI extends Container {
    constructor(id, style) {
        super(id, style);
    }

    tohtml() {
        var ret = "<li id=\'" + this.id + "\' class=\'" + this.style + "\'>";
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret += "</li>";
        return ret;
    }
}

export default class InputField extends Component {
    constructor(id, style, type, placeholder) {
        super(id, style);
        this.type = type;
        this.placeholder = placeholder;
    }

    tohtml() {
        return "<input id=\'" + this.id + "\' type=\'"+ this.type + "\' class=\'"+ this.style + "\' placeholder=\'"+ this.placeholder + "\'></input>";
    }
}

export default class InputArea extends Component {
    constructor(id, style, placeholder, rows, cols) {
        super(id, style);
        this.placeholder = placeholder;
        this.rows = rows;
        this.cols = cols;
    }

    tohtml() {
        return "<textarea id=\'" + this.id + "\' class=\'"+ this.style + "\' placeholder=\'"+ this.placeholder + "\' rows=\'" + this.rows + "\' cols=\'"+ this.cols + "\' ></textarea>";
    }
}

export default class Button extends Component {
    constructor(id, style, text, type) {
        super(id, style);
        this.text = text;
        this.type = type;
    }

    tohtml() {
        return "<button id=\'" + this.id + "\' type=\'"+ this.type + "\' class=\'" + this.style + "\'>" + this.text + "</button>";
    }
}

export default class ButtonContainer extends Container {
    constructor(id, style, text, type, datatoggle) {
        super(id, style);
        this.text = text;
        this.type = type;
        this.datatoggle = datatoggle;
    }

    tohtml() {
        var ret = "<button id=\'" + this.id + "\' type=\'"+ this.type + "\' class=\'" + this.style + "\' data-toggle=\'" + this.datatoggle + "\'>" + this.text;
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret += "</button>";

        return ret;
    }
}

export default class Label extends Component {
    constructor(id, style, text, style2) {
        super(id, style);
        this.text = text;
        this.style2 = style2;
    }

    tohtml() {
        return "<span id=\'" + this.id + "\' class=\'" + this.style + "\' style=\'" + this.style2 + "\'>" + this.text + "</span>";
    }
}

export default class H1 extends Label {
    constructor(id, style, text) {
        super(id, style, text);
    }

    tohtml() {
        return "<h1 id=\'" + this.id + "\' class=\'" + this.style + "\'>" + this.text + "</h1>";
    }
}

export default class H4 extends Label {
    constructor(id, style, text) {
        super(id, style, text);
    }

    tohtml() {
        return "<h4 id=\'" + this.id + "\' class=\'" + this.style + "\'>" + this.text + "</h4>";
    }
}

export default class H5 extends Label {
    constructor(id, style, text) {
        super(id, style, text);
    }

    tohtml() {
        return "<h5 id=\'" + this.id + "\' class=\'" + this.style + "\'>" + this.text + "</h5>";
    }
}

export default class Strong extends Label {
    constructor(id, style, text) {
        super(id, style, text);
    }

    tohtml() {
        return "<strong id=\'" + this.id + "\' class=\'" + this.style + "\'>" + this.text + "</strong>";
    }
}

export default class A extends Label {
    constructor(id, style, text, href) {
        super(id, style, text);
        this.href = href;
    }

    tohtml() {
        return "<a id=\'" + this.id + "\' class=\'" + this.style + "\' href=\'" + this.href + "\'>" + this.text + "</a>";
    }
}

export class I extends Component {
    constructor(id, style) {
        super(id, style);
    }

    tohtml() {
        return "<i id=\'" + this.id + "\' class=\'" + this.style + "\'></i>";
    }
}

export class AContainer extends Container {
    constructor(id, style, text, href, tab) {
        super(id, style);
        this.text = text;
        this.href = href;
        this.tab = tab;
    }

    tohtml() {
        var ret = "<a id=\'" + this.id + "\' class=\'" + this.style + "\' href=\'" + this.href + "\' data-toggle=\'" + this.tab + "\'>";
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        ret +=  " " + this.text + "</a>";

        return ret;
    }
}

export class HR extends Component {
    constructor(id) {
        super(id);
    }

    tohtml() {
        return "<hr id=\'" + this.id + "\'/>";
    }
}

export class Image extends Component {
    constructor(id, style, src, width, height) {
        super(id, style);
        this.src = src;
        this.width = width;
        this.height = height;
    }

    tohtml() {
        return "<img id=\'" + this.id + "\' src=\'" + this.src + "\' width=\'" + this.width + "\' height=\'" + this.height + "\'>" + "</img>";
    }
}

export class EmptyRow extends Component {
    constructor(id, style) {
        super(id, style);
    }

    tohtml() {
        return "<div id=\'" + this.id + "\' class=\'" + this.style + "\'>&nbsp;</div>";
    }
}

export class EmptyCol extends Component {
    constructor(id, style) {
        super(id, style);
    }

    tohtml() {
        return "<span id=\'" + this.id + "\' class=\'" + this.style + "\'>&nbsp;</span>";
    }
}*/