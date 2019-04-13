import {
    A, Button, EmptyCol, EmptyRow, H1, H2, H3, H4, H5, H6, HR, I, Image,
    InputArea, InputField, Strong, Label, AContainer, ButtonContainer,
    Form, HorizontalPanel, LI, MainPanel, UL, VerticalPanel
} from '.././js/osc.js';

import drawInbox from './drawInbox.js';
import drawSingleMail from './drawSingleMail.js';
import drawCompose from './drawCompose.js';

//-----------------------------------
function changeActiveClass(button) {
    if (button.getCSSClass() == '') {
        button.addCSSClass('active');
        for (var child of button.getParent().children.values()) {
            if (child.id != button.id && child.getCSSClass() == 'active') {
                child.removeCSSClass('active');
            }
        }
    }
}

export default function drawMail(labels, messages, user, message) {
    var vp1 = new VerticalPanel('vp1', 'container');

    var emptyRow1 = new EmptyRow('er1', 'row');
    vp1.add(emptyRow1);
    var vp2 = new VerticalPanel('vp2', 'row');
    vp1.add(vp2);
    var vp3 = new VerticalPanel('vp3', 'col-sm-3 col-md-2');
    vp2.add(vp3);
    var vp4 = new HorizontalPanel('vp4', 'user-head');
    vp3.add(vp4);

    var ac1 = new AContainer('ac1', 'inbox-avatar', '', '#', '');
    vp4.add(ac1);
    var image1 = new Image('image1', 'img-responsive', 'https://bootdey.com/img/Content/avatar/avatar1.png', user.name, '50px', '50px');
    ac1.add(image1);

    var vp5 = new VerticalPanel('vp5', 'btn-group pull-right');
    vp4.add(vp5);
    var b1 = new ButtonContainer('b1', 'btn btn-primary dropdown-toggle', '', 'button', 'dropdown');
    vp5.add(b1);
    var label1 = new Label('l1', 'caret', '', '');
    b1.add(label1);
    var ul1 = new UL('ul1', 'dropdown-menu');
    vp5.add(ul1);

    var li11 = new LI('li11', '');
    ul1.add(li11);
    var a11 = new A('a11', '', user.email, '#');
    li11.add(a11);
    var li12 = new LI('li12', '');
    ul1.add(li12);
    var a12 = new A('a12', '', 'Log out', '#');
    li12.add(a12);

    var vp6 = new VerticalPanel('vp6', 'user-name');
    vp4.add(vp6);

    var h51 = new H5('h51', '', user.email);
    vp6.add(h51);

    var vp7 = new VerticalPanel('vp7', 'row');
    vp1.add(vp7);
    var hr1 = new HR('hr1');
    vp7.add(hr1);

    var vp8 = new VerticalPanel('vp8', 'col-sm-3 col-md-2');
    vp7.add(vp8);
    var buttonCompose = new AContainer('buttonCompose', 'btn btn-danger btn-sm btn-block', 'COMPOSE');
    vp8.add(buttonCompose);
    buttonCompose.onclick = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var vp7 = document.getElementById("vp7");
        var vp9 = document.getElementById("vp9");
        vp9.remove(vp7);

        vp7 = new VerticalPanel('vp7', 'row');
        var vp99 = new VerticalPanel('vp9', 'col-sm-9 col-md-10');
        vp7.add(vp99);
        vp99 = drawCompose();
    }
    var hr2 = new HR('hr2');
    vp8.add(hr2);

    var ul2 = new UL('ul2', 'nav nav-pills nav-stacked');
    vp8.add(ul2);

    var list_items = [];
    if(labels.length > 0) {
        for (let index = 1; index < labels.length + 1; index++) {
            var itemID = "item" + index;
            var li = new LI(itemID, '');
            list_items.push(li);
        }
        for (let index = 0; index < labels.length; index++) {
            
            if (labels[index].labelListVisibility != "labelHide") {
                var container = list_items[index]; 
                ul2.add(container);
                var a = new AContainer('a2' + index, '', labels[index].name, '#');
                container.add(a);
                var badge = new Label('badge' + index, 'badge pull-right', labels[index].messagesTotal);
                a.add(badge);
                container.onclick = function (e) {
                    e.stopImmediatePropagation();
                    console.log(list_items[index].id + " " + labels[index].name);
                }
            }
        }
    }
    var vp9 = new VerticalPanel('vp9', 'col-sm-9 col-md-10');
    vp7.add(vp9);
    
    vp9 = drawInbox(messages, message);

    return vp1;
}