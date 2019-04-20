import {
    A, Button, EmptyCol, EmptyRow, H1, H2, H3, H4, H5, H6, HR, I, Image,
    InputArea, InputField, Strong, Label, AContainer, ButtonContainer,
    Form, HorizontalPanel, LI, MainPanel, UL, VerticalPanel
} from '../js/osc.js';

import drawInbox from './inbox/drawInbox.js';
import drawCompose from './compose/drawCompose.js';
import MessageManager from '../js/managers/MessageManager.js';
import UserManager from '../js/managers/UserManager.js';
import changeActiveClass from '../js/changeActiveClass.js';

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
    var image1 = new Image('image1', 'img-responsive', 'http://chittagongit.com//images/google-user-icon/google-user-icon-7.jpg', user.name, '50px', '50px');
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
    var a12 = new AContainer('a12', '', 'Log out', '');
    li12.add(a12);
     
    a12.onclick = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log('LOG OUT');

        let axios = window._api.axios;
        let userManager = new UserManager(axios);

        userManager.logout();
    }

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

    var ul2 = new UL('ul2', 'nav nav-pills nav-stacked');
    vp8.add(ul2);

    var list_items = [];
    if (labels.length > 0) {
        for (let index = 0; index < labels.length; index++) {
            var container = new LI(labels[index].name, '');
            ul2.add(container);
            var a = new AContainer('a2' + index, '', labels[index].name, '#');
            container.add(a);
            var badge = new Label('badge' + index, 'badge pull-right', labels[index].messagesTotal);
            a.add(badge);
            if (labels[index].name == 'INBOX') {
                container.addCSSClass('active');
            }
            container.onclick = function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();

                changeActiveClass(this.component);

                var vp7 = container.findById("vp7");
                var vp9 = container.findById("vp9");
                vp9.remove(vp7);
                
                let axios = window._api.axios;
                let messageManager = new MessageManager(axios);

                messageManager.fetchMessages(labels[index].name)
                    .then(response => {
                        var component = drawInbox(messageManager.messages);
                        vp7.add(component);
                    });
            }

            list_items.push(container);
        }
    }
    
    var vp9 = drawInbox(messages);
    vp7.add(vp9);

    buttonCompose.onclick = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var vp7 = buttonCompose.findById("vp7");
        var vp9 = buttonCompose.findById("vp9");
        vp9.remove(vp7);
        var component = drawCompose();
        vp7.add(component);
    }

    return vp1;
}