export default class MessageManager {

    constructor(axiosApi) {
        this.messages = [];
        this.axios = axiosApi;
    }

    fetchMessages(url, code) {
        return this.axios.get(url + "/messages?code=" + code)
            .then((response) => {
                this.messages = response.data;
            });
    }

    getMessages() {
        return this.messages;
    }
}