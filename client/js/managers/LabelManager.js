export default class LabelManager {

    constructor(axiosApi) {
        this.labels = [];
        this.axios = axiosApi;
    }

    fetchLabels(url, code) {
        return this.axios.get(url + "/labels?code=" + code)
        .then((response) => {
            this.labels = response.data;
        });
    };

    getLabels() {
        return this.labels;
    }
}