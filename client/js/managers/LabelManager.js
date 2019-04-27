export default class LabelManager {

    constructor(axiosApi) {
        this.axios = axiosApi;
        this.url = 'http://localhost:9000/labels';
        this.labels = [];
    }

    fetchLabels() {
        return this.axios.get(this.url)
        .then((response) => {
            this.labels = response.data;
        });
    };

    getLabels() {
        return this.labels;
    }
}