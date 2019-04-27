import Component from '../components/component.js';

export default class Container extends Component {
    constructor(id, CSSclass) {
        super(id, CSSclass);
        this.children = new Map();
    }

    add(component) {
        this.children.set(component.id, component);
        component.setParent(this);

        $('#' + component.id).remove();
        $('#' + this.id).append(component.tohtml());
        component.node = document.getElementById(component.id);

        for (var child of this.children.values()) {
            this.addListeners(child);
        }
    }
   
    remove(component) {
        component.children.delete(this.id);
        $('#' + this.id).remove();
    }

    tohtml() {
        var ret = "";
        for (var child of this.children.values()) {
            ret += child.tohtml();
        }
        return ret;
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
        if (component.onchange) {
            $("#" + component.id).change(component.onchange);
        }
        if (component.onsubmit) {
            $("#" + component.id).submit(component.onsubmit);
        }
        if (component.onerror) {
            $("#" + component.id).error(component.onerror);
        }
        if (component.onselect) {
            $("#" + component.id).select(component.onselect);
        }
        if (component.ontoggle) {
            $("#" + component.id).toggle(component.ontoggle);
        }
        if (component.onhover) {
            $("#" + component.id).hover(component.onhover);
        }
        if (component.onfocus) {
            $("#" + component.id).focus(component.onfocus);
        }
        if (component.onfocusin) {
            $("#" + component.id).focusout(component.onfocusout);
        }
        if (component.onfocusout) {
            $("#" + component.id).focusin(component.onfocusin);
        }
        if (component.onmousedown) {
            $("#" + component.id).mousedown(component.onmousedown);
        }
        if (component.onmouseenter) {
            $("#" + component.id).mouseenter(component.onmouseenter);
        }
        if (component.onmouseleave) {
            $("#" + component.id).mouseleave(component.onmouseleave);
        }
        if (component.onmousemove) {
            $("#" + component.id).mousemove(component.onmousemove);
        }
        if (component.onmouseout) {
            $("#" + component.id).mouseout(component.onmouseout);
        }
        if (component.onmouseover) {
            $("#" + component.id).mouseover(component.onmouseover);
        }
        if (component.onmouseup) {
            $("#" + component.id).mouseup(component.onmouseup);
        }
        if (component.onkeydown) {
            $("#" + component.id).keydown(component.onkeydown);
        }
        if (component.onkeypress) {
            $("#" + component.id).keypress(component.onkeypress);
        }
        if (component.onkeyup) {
            $("#" + component.id).keyup(component.onkeyup);
        }

        var el = $("#" + component.id);
        el[0].component = component;
    }
    
}