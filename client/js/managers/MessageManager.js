export default class MessageManager {

    constructor(axiosApi) {
        this.messages = [];
        this.message = {};
        this.axios = axiosApi;
        this.url = 'http://localhost:9000';
    }

    fetchAllMessages() {
        return this.axios.get(this.url + "/allMessages?code=")
            .then((response) => {
                this.messages = response.data;
            });
    }
    fetchMessages(label) {
        return this.axios.get(this.url + "/messages?label=" + label)
            .then((response) => {
                this.messages = response.data;
            });
    }

    fetchMessage(id) {
        return this.axios.get(this.url + "/message?id=" + id)
            .then((response) => {
                this.message = response.data;
            });
    }
    sendMessage(to, subject, bodyText) {
        return this.axios.post(this.url + "/send", {
            to: to,
            subject: subject,
            bodyText: bodyText
            }).then((response) => {
                this.message = response.data;
            });
    }

    trashMessage(id) {
        return this.axios.post(this.url + "/trash?id=" + id)
            .then((response) => {
                this.messages = response.data;
            });
    }

    getMessages() {
        return this.messages;
    }

    getMessage() {
        return this.message;
    }
}