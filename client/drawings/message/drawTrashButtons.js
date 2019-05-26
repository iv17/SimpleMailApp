import {
    EmptyCol, HR, I, AContainer, VerticalPanel
} from '../../js/osc.js';

import MessageManager from '../../js/managers/MessageManager.js';
import drawTrash from '../messages/drawTrash.js';
import drawInbox from '../messages/drawInbox.js';

export default function drawTrashButtons(message) {

    var vp19 = new VerticalPanel('vp19', 'compose-btn pull-left');
    
    var button1 = new AContainer('button1', 'btn btn-sm btn-primary', 'Untrash ', '', '');
    vp19.add(button1);
    var i4 = new I('i4', 'fa fa-reply');
    button1.add(i4);
    var emptyCol3 = new EmptyCol('ec3', '');
    vp19.add(emptyCol3);

    button1.onclick = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        
        var vp7 = button1.findById('vp7');
        var vp9 = button1.findById('vp9');
        vp9.remove(vp7);

        let axios = window._api.axios;
        let messageManager = new MessageManager(axios);

        messageManager.untrashMessage(message.id)
            .then(response => {
                var component = drawInbox(messageManager.messages);
                vp7.add(component);
            });

    }

    var button3 = new AContainer('button3', 'btn btn-sm btn-default', 'Delete ', '', '');
    vp19.add(button3);
    var i6 = new I('i6', 'fa fa-trash-o');
    button3.add(i6);

    button3.onclick = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log('DELETE ' + message.id);

        var vp7 = button3.findById('vp7');
        var vp9 = button3.findById('vp9');
        vp9.remove(vp7);

        let axios = window._api.axios;
        let messageManager = new MessageManager(axios);

        messageManager.deleteMessage(message.id)
            .then(response => {
                var component = drawTrash(messageManager.messages);
                vp7.add(component);
            });
    }

    var hr2 = new HR('hr2', '');
    vp19.add(hr2);

    return vp19;
}