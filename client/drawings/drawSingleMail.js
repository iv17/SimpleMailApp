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

    for (let j = 0; j < message.headers.length; j++) {
        if (message.headers[j].name == 'From') {
            var from = message.headers[j].value;
        }
        if (message.headers[j].name == 'To') {
            var to = message.headers[j].value;
        }
        if (message.headers[j].name == 'Subject') {
            var subject = message.headers[j].value;
        }
        if (message.headers[j].name == 'Date') {
            var date = message.headers[j].value;
        }
    }
    var vp9 = new VerticalPanel('vp9', 'col-sm-9 col-md-10');

    var vp10 = new VerticalPanel('vp10', 'inbox-body');
    vp9.add(vp10);

    var vp11 = new VerticalPanel('vp11', 'heading-inbox row');
    vp10.add(vp11);

    var vp12 = new VerticalPanel('vp12', 'col-md-12');
    vp11.add(vp12);

    var h41 = new H4('h41', 'col-md-8', subject);
    vp12.add(h41);
    var vp13 = new VerticalPanel('vp13', 'col-md-4 text-right');
    vp12.add(vp13);
    var date = new Label('date', 'date', date);
    vp13.add(date);

    var hr1 = new HR('hr1', 'col-md-12');
    vp12.add(hr1);

    var vp16 = new VerticalPanel('vp16', 'sender-info');
    vp10.add(vp16);

    var emptyRow2 = new EmptyRow('er2', '');
    vp10.add(emptyRow2);

    var vp17 = new VerticalPanel('vp17', 'row');
    vp16.add(vp17);

    var vp18 = new VerticalPanel('vp18', 'col-md-12');
    vp17.add(vp18);

    var senderImage = new Image('senderImage', '', 'https://bootdey.com/img/Content/avatar/avatar6.png', from, '40px', '40px');
    vp18.add(senderImage);
    var senderName = new Strong('senderName', '', from);
    vp18.add(senderName);
    var textTo = new Label('textTo', '', ' to ');
    vp18.add(textTo);
    var textMe = new Strong('textMe', '', to);
    vp18.add(textMe);

    var vp19 = new VerticalPanel('vp19', 'view-mail');
    vp10.add(vp19);

    var content = new Label('message', '', message.content);
    vp19.add(content);

    var emptyRow3 = new EmptyRow('er3', '');
    vp10.add(emptyRow3);

    var vp20 = new VerticalPanel('vp20', 'compose-btn pull-left');
    vp10.add(vp20);

    var button1 = new AContainer('button1', 'btn btn-sm btn-primary', 'Reply ', '', '');
    vp20.add(button1);
    var i4 = new I('i4', 'fa fa-reply');
    button1.add(i4);
    var emptyCol3 = new EmptyCol('ec3', '');
    vp20.add(emptyCol3);

    button1.onclick = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log(from + '' + subject);

        var vp7 = document.getElementById("vp7");
        var vp9 = document.getElementById("vp9");
        vp9.remove(vp7);

        vp7 = new VerticalPanel('vp7', 'row');
        var vp99 = new VerticalPanel('vp9', 'col-sm-9 col-md-10');
        vp7.add(vp99);
        vp99 = drawCompose();

    }

    var button2 = new AContainer('button2', 'btn btn-sm btn-default', 'Forward ', '', '');
    vp20.add(button2);
    var i5 = new I('i5', 'fa fa-arrow-right');
    button2.add(i5);
    var emptyCol4 = new EmptyCol('ec4', '');
    vp20.add(emptyCol4);

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
    vp20.add(button3);
    var i6 = new I('i6', 'fa fa-trash-o');
    button3.add(i6);

    button3.onclick = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log('DELETE');
        console.log(message.id);

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
    vp20.add(hr2);

    return vp9;
}