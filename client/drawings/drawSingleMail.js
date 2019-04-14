import {
    A, Button, EmptyCol, EmptyRow, H1, H2, H3, H4, H5, H6, HR, I, Image,
    InputArea, InputField, Strong, Label, AContainer, ButtonContainer,
    Form, HorizontalPanel, LI, MainPanel, UL, VerticalPanel
} from '.././js/osc.js';

import drawInbox from './drawInbox.js';
import drawCompose from './drawCompose.js';
import drawForward from './drawForward.js';
import MessageManager from '.././js/managers/MessageManager.js';

export default function drawSingleMail(message) {

    var vp9 = new VerticalPanel('vp9', 'col-sm-9 col-md-10');

    var vp10 = new VerticalPanel('vp10', 'inbox-body');
    vp9.add(vp10);

    var vp11 = new VerticalPanel('vp11', 'heading-inbox row');
    vp10.add(vp11);

    var vp12 = new VerticalPanel('vp12', 'col-md-12');
    vp11.add(vp12);
    var h41 = new H4('h41', 'col-md-8', message.headers.subject);
    vp12.add(h41);

    var vp13 = new VerticalPanel('vp13', 'col-md-4 text-right');
    vp12.add(vp13);
    var date = new Label('date', 'date', message.headers.date);
    vp13.add(date);

    var vp14 = new VerticalPanel('vp14', 'col-md-12');
    vp13.add(vp14);
    var hr1 = new HR('hr1', 'col-md-12');
    vp10.add(hr1);

    var vp15 = new VerticalPanel('vp15', 'sender-info');
    vp10.add(vp15);

    var emptyRow2 = new EmptyRow('er2', '');
    vp10.add(emptyRow2);

    var vp16 = new VerticalPanel('vp16', 'row');
    vp15.add(vp16);

    var vp17 = new VerticalPanel('vp17', 'col-md-12');
    vp16.add(vp17);

    var senderImage = new Image('senderImage', '', 'https://bootdey.com/img/Content/avatar/avatar6.png', message.headers.from, '40px', '40px');
    vp17.add(senderImage);
    var senderName = new Strong('senderName', '', message.headers.from);
    vp17.add(senderName);
    var textTo = new Label('textTo', '', ' to ');
    vp17.add(textTo);
    var textMe = new Strong('textMe', '', message.headers.to);
    vp17.add(textMe);

    var vp18 = new VerticalPanel('vp18', 'view-mail');
    vp10.add(vp18);

    var content = new Label('message', '', message.content);
    vp18.add(content);

    var emptyRow3 = new EmptyRow('er3', '');
    vp10.add(emptyRow3);

    var vp19 = new VerticalPanel('vp19', 'compose-btn pull-left');
    vp10.add(vp19);

    var button1 = new AContainer('button1', 'btn btn-sm btn-primary', 'Reply ', '', '');
    vp19.add(button1);
    var i4 = new I('i4', 'fa fa-reply');
    button1.add(i4);
    var emptyCol3 = new EmptyCol('ec3', '');
    vp19.add(emptyCol3);

    button1.onclick = function (e) {
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

    var button2 = new AContainer('button2', 'btn btn-sm btn-default', 'Forward ', '', '');
    vp19.add(button2);
    var i5 = new I('i5', 'fa fa-arrow-right');
    button2.add(i5);
    var emptyCol4 = new EmptyCol('ec4', '');
    vp19.add(emptyCol4);

    button2.onclick = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log("FORWARD");

        var vp7 = document.getElementById("vp7");
        var vp9 = document.getElementById("vp9");
        vp9.remove(vp7);

        vp7 = new VerticalPanel('vp7', 'row');
        var vp99 = new VerticalPanel('vp9', 'col-sm-9 col-md-10');
        vp7.add(vp99);

        vp99 = drawForward(message);

    }
    var button3 = new AContainer('button3', 'btn btn-sm btn-default', 'Delete ', '', '');
    vp19.add(button3);
    var i6 = new I('i6', 'fa fa-trash-o');
    button3.add(i6);

    button3.onclick = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log('DELETE ' + message.id);

        var vp7 = document.getElementById("vp7");
        var vp9 = document.getElementById("vp9");
        vp9.remove(vp7);

        vp7 = new VerticalPanel('vp7', 'row');
        var vp99 = new VerticalPanel('vp9', 'col-sm-9 col-md-10');
        vp7.add(vp99);

        let axios = window._api.axios;
        let messageManager = new MessageManager(axios);

        messageManager.trashMessage(message.id)
            .then(response => {
                vp99 = drawInbox(messageManager.messages)
            });
    }

    var hr2 = new HR('hr2', '');
    vp19.add(hr2);

    return vp9;
}