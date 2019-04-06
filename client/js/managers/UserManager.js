export default class UserManager {

    constructor(axiosApi) {
        this.user;
        this.user2;
        this.axios = axiosApi;
    }

    fetchUser(url, code) {
        return this.axios.get(url + "/me?code=" + code)
            .then((response) => {
                this.user = response.data;
            });
    }
  
    getUser() {
        return this.user;
    }
}