export default function changeActiveClass(button) {
    if (button.getCSSClass() == '') {
        button.addCSSClass('active');
        for (var child of button.getParent().children.values()) {
            if (child.id != button.id && child.getCSSClass() == 'active') {
                child.removeCSSClass('active');
            }
        }
    }
}