import {
    A, Button, EmptyCol, EmptyRow, H1, H2, H3, H4, H5, H6, HR, I, Image,
    InputArea, InputField, Strong, Label, AContainer, ButtonContainer,
    Form, HorizontalPanel, LI, MainPanel, UL, VerticalPanel
} from '.././js/osc.js';

import drawInbox from './drawInbox.js';
import drawSingleMail from './drawSingleMail.js';
import drawCompose from './drawCompose.js';

var user = {
    "name": "Josh Hamadani",
    "email": "josh@gmail.com",
    "inboxNum": "3",
    "sentMailNum": "10",
    "importantNum": "5",
    "draftsNum": "2",
    "trashNum": "14"
};

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
//-----------------------------------

export default function drawMail() {
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

    var h51 = new H5('h51', '', user.name);
    vp6.add(h51);

    var vp7 = new VerticalPanel('vp7', 'row');
    vp1.add(vp7);
    var hr1 = new HR('hr1');
    vp7.add(hr1);

    var vp8 = new VerticalPanel('vp8', 'col-sm-3 col-md-2');
    vp7.add(vp8);
    var buttonCompose = new A('buttonCompose', 'btn btn-danger btn-sm btn-block', 'COMPOSE', '#');
    vp8.add(buttonCompose);
    var hr2 = new HR('hr2');
    vp8.add(hr2);


    var ul2 = new UL('ul2', 'nav nav-pills nav-stacked');
    vp8.add(ul2);

    var li21 = new LI('li21', 'active');
    ul2.add(li21);
    var a21 = new AContainer('a21', '', 'Inbox', '#');
    li21.add(a21);
    var badge1 = new Label('badge1', 'badge pull-right', user.inboxNum);
    a21.add(badge1);

    var li22 = new LI('li22', '');
    ul2.add(li22);
    var a22 = new AContainer('a22', '', 'Sent Mail', '#');
    li22.add(a22);
    var badge2 = new Label('badge2', 'badge pull-right', user.sentMailNum);
    a22.add(badge2);

    var li23 = new LI('li23', '');
    ul2.add(li23);
    var a23 = new AContainer('a23', '', 'Important', '#');
    li23.add(a23);
    var badge3 = new Label('badge3', 'badge pull-right', user.importantNum);
    a23.add(badge3);

    var li24 = new LI('li24', '');
    ul2.add(li24);
    var a24 = new AContainer('a24', '', 'Drafts', '#');
    li24.add(a24);
    var badge4 = new Label('badge4', 'badge pull-right', user.draftsNum);
    a24.add(badge4);

    var li25 = new LI('li25', '');
    ul2.add(li25);
    var a25 = new AContainer('a25', '', 'Trash', '#');
    li25.add(a25);
    var badge5 = new Label('badge5', 'badge pull-right', user.trashNum);
    a25.add(badge5);

    li21.onclick = function (e) {
        changeActiveClass(li21);
    }
    li22.onclick = function (e) {
        changeActiveClass(li22);
    }
    li23.onclick = function (e) {
        changeActiveClass(li23);
    }
    li24.onclick = function (e) {
        changeActiveClass(li24);
    }
    li25.onclick = function (e) {
        changeActiveClass(li25);
    }

    var vp9 = new VerticalPanel('vp9', 'col-sm-9 col-md-10');
    vp7.add(vp9);
    vp9 = drawCompose();


    return vp1;
}