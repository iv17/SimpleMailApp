import {
    A, EmptyRow, H5, HR, Image, Label, AContainer, ButtonContainer, HorizontalPanel, LI, UL, VerticalPanel
} from '../js/osc.js';

import drawInbox from './messages/drawInbox.js';
import drawCompose from './message/drawCompose.js';
import drawLabels from './drawLabels.js';

export default function drawApp(labels, messages, user) {

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
    var image1 = new Image('image1', 'img-responsive', './images/profile.png', user.name, '50px', '50px');
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

    var vp6 = new VerticalPanel('vp6', 'user-name');
    vp4.add(vp6);

    var h51 = new H5('h51', '', user.email);
    vp6.add(h51);

    var vp7 = new VerticalPanel('vp7', 'row');
    vp1.add(vp7);
    var hr1 = new HR('idhr1');
    vp7.add(hr1);

    var vp8 = new VerticalPanel('vp8', 'col-sm-3 col-md-2');
    vp7.add(vp8);
    var buttonCompose = new AContainer('buttonCompose', 'btn btn-danger btn-sm btn-block', 'COMPOSE');
    vp8.add(buttonCompose);

    var hr2 = new HR('idhr2');
    vp8.add(hr2);

    var ul2 = drawLabels(labels);
    vp8.add(ul2);

    var vp9 = drawInbox(messages, 'MAIL');
    vp7.add(vp9);

    buttonCompose.onclick = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var vp7 = buttonCompose.findById('vp7');
        var vp9 = buttonCompose.findById('vp9');
        vp9.remove(vp7);
        var component = drawCompose();
        vp7.add(component);
    }

    return vp1;
}