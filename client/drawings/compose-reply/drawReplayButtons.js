import {
    EmptyCol, HR, I, AContainer, VerticalPanel
} from '../../js/osc.js';

import MessageManager from '../../js/managers/MessageManager.js';
import drawMessage from '../message/drawMessage.js';
import drawInbox from '../messages/drawInbox.js';

export default function drawReplayButtons() {
    console.log('drawReplayButtons');

    var vp14 = new VerticalPanel('vp14', 'compose-btn pull-left');
  
    var buttonSend = new AContainer('buttonSend', 'btn btn-sm btn-primary', 'Send ', '', '');
    vp14.add(buttonSend);
    var i1 = new I('i1', 'fa fa-envelope');
    buttonSend.add(i1);
    var ec1 = new EmptyCol('ec1', '');
    vp14.add(ec1);

    buttonSend.onclick = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log('SEND');

        var to = inputEmail.value;
        var subject = inputTitle.value;
        var bodyText = inputMessage.value;

        var vp7 = buttonSend.findById('vp7');
        var vp9 = buttonSend.findById('vp9');
        vp9.remove(vp7);

        let axios = window._api.axios;
        let messageManager = new MessageManager(axios);

        messageManager.sendMessage(to, subject, bodyText)
            .then(response => {
                var component = drawMessage(messageManager.message, 'MAIL');
                vp7.add(component);
            });

    }

    var buttonDiscard = new AContainer('buttonDiscard', 'btn btn-sm btn-default', 'Discard ', '', '');
    vp14.add(buttonDiscard);
    var i3 = new I('i3', 'fa fa-trash-o');
    buttonDiscard.add(i3);
    var ec3 = new EmptyCol('ec3', '');
    vp14.add(ec3);

    buttonDiscard.onclick = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log('DISCARD');

        var vp7 = buttonDiscard.findById('vp7');
        var vp9 = buttonDiscard.findById('vp9');
        vp9.remove(vp7);

        let axios = window._api.axios;
        let messageManager = new MessageManager(axios);

        messageManager.fetchMessages('INBOX')
            .then(response => {
                var component = drawInbox(messageManager.messages, 'MAIL');
                vp7.add(component);
            });
    }

    var hr2 = new HR('hr2', '');
    vp14.add(hr2);

    return vp14;
}