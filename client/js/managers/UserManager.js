export default class UserManager {

    constructor(axiosApi) {
        this.user;
        this.axios = axiosApi;
        this.url = 'http://localhost:9000';
    }

    fetchUser() {
        return this.axios.get(this.url + "/me")
            .then((response) => {
                this.user = response.data;
            });
    }

    logout() {
        return this.axios.get(this.url + "/logout")
            .then((response) => {
                this.user = response.data;
            });
    }
  
  
    getUser() {
        return this.user;
    }
}