import {
    EmptyCol, I, Label, AContainer, HorizontalPanel, LI, UL, VerticalPanel
} from '../../js/osc.js';

import drawTrashSingleMail from '../singleMail/drawTrashSingleMail.js';
import MessageManager from '../../js/managers/MessageManager.js';

export default function drawTrash(messages) {

    var vp9 = new VerticalPanel('vp9', 'col-sm-9 col-md-10');

    var ul3 = new UL('ul3', 'nav nav-tabs');
    vp9.add(ul3);

    var li31 = new LI('li31', 'active');
    ul3.add(li31);
    var a31 = new AContainer('a31', '', 'Primary ', '#', 'tab');
    li31.add(a31);
    var hp1 = new HorizontalPanel('hp1', 'glyphicon glyphicon-inbox');
    a31.add(hp1);

    var vp10 = new VerticalPanel('vp10', 'tab-content');
    vp9.add(vp10);
    var vp11 = new VerticalPanel('vp11', 'tab-pane fade in active');
    vp10.add(vp11);
    var vp12 = new VerticalPanel('vp12', 'list-group');
    vp11.add(vp12);

    var inbox_rows = [];
    for (let index = 1; index < messages.length + 1; index++) {
        var inbox_rowID = "inbox_row" + index;
        inbox_rows.push(new AContainer(inbox_rowID, 'list-group-item', '', '#'));
    }
    for (let index = 0; index < messages.length; index++) {
        
        var container = inbox_rows[index];
        vp12.add(container);
        var mail = new I('i' + index, 'fa fa-envelope');
        container.add(mail);
        mail.onclick = function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log('UNTRASH ' + messages[index].id);

            var vp7 = trash.findById("vp7");
            var vp9 = trash.findById("vp9");
            vp9.remove(vp7);
    
            let axios = window._api.axios;
            let messageManager = new MessageManager(axios);
    
            messageManager.untrashMessage(messages[index].id)
                .then(response => {
                    var component = drawInbox(messageManager.messages);
                    vp7.add(component);
                });
        }
        container.add(new EmptyCol('ec1' + index, ''));
        container.add(new EmptyCol('ec2' + index, ''));
        container.add(new Label("sender" + index, 'name', messages[index].headers.from, 'min-width: 160px;display: inline-block;'));
        container.add(new Label("title" + index, '', messages[index].headers.subject, ''));
        container.add(new Label("time" + index, 'badge', messages[index].headers.date, ''));
       
        container.onclick = function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
           
            var vp7 = container.findById("vp7");
            var vp9 = container.findById("vp9");
            vp9.remove(vp7);
            
            let axios = window._api.axios;
            let messageManager = new MessageManager(axios);

            messageManager.fetchMessage(messages[index].id)
            .then(response => {
                var component = drawTrashSingleMail(messageManager.message);
                vp7.add(component);
			});
           
        }
    }
    return vp9;
}