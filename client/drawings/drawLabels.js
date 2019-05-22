import {
    Label, AContainer, LI, UL
} from '../js/osc.js';

import drawInbox from './inbox/drawInbox.js';
import drawDrafts from './drafts/drawDrafts.js';
import MessageManager from '../js/managers/MessageManager.js';
import changeActiveClass from '../js/util/changeActiveClass.js';
import drawTrash from './trash/drawTrash.js';

export default function drawLabels(labels) {

    var ul2 = new UL('ul2', 'nav nav-pills nav-stacked');

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

                if (labels[index].name == 'TRASH') {
                    console.log('TRASH')
                    messageManager.fetchMessages(labels[index].name)
                        .then(response => {
                            var component = drawTrash(messageManager.messages);
                            vp7.add(component);
                        });
                }
                if (labels[index].name == 'DRAFT') {
                    console.log('DRAFT')
                    messageManager.fetchMessages(labels[index].name)
                        .then(response => {
                            var component = drawDrafts(messageManager.messages);
                            vp7.add(component);
                        });
                } 
                else {
                    messageManager.fetchMessages(labels[index].name)
                        .then(response => {
                            var component = drawInbox(messageManager.messages);
                            vp7.add(component);
                        });
                }
            }
        }
    }

    return ul2;

}