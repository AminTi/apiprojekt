const ROOT_URL = "https://frebi.willandskill.eu/"
const CREATE_USER = `${ROOT_URL}auth/users/create/`
const LOGIN_URL = `${ROOT_URL}api-token-auth/`
const CURRENT_USER = `${ROOT_URL}api/v1/me`

export default class {
    async register(firstName, lastName, email, password, organisationName, organisationKind) {
        const payload = { firstName, lastName, email, password, organisationName, organisationKind }
        return fetch(CREATE_USER, {
            method: "POST",
            headers: this.getHeader(),
            body: JSON.stringify(payload),
        })
    }

    async activateUser(uid, token) {
        const url = `${ROOT_URL}auth/users/activate/`
        const payload = { uid, token }
        return fetch(url, {
            method: "POST",
            headers: this.getHeader(),
            body: JSON.stringify(payload),
        })
    }
    async login(email, password) {
        const url = `${LOGIN_URL}`
        const payload = {
            email,
            password,
        }
        return fetch(url, {
            method: "POST",
            headers: this.getHeader(),
            body: JSON.stringify(payload),
        })
    }

    async currentUser() {
        return fetch(CURRENT_USER, {
            headers: this.getPrivateHeaders(),
        })
    }

    async getCustomerList() {
        const url = `${ROOT_URL}/api/v1/customers/`
        return fetch(url, {
            headers: this.getPrivateHeaders(),
        })
    }

    async createCustomer(name, organisationNr, reference, email, phoneNumber, vatNr, website) {
        const payload = { name, organisationNr, reference, email, phoneNumber, vatNr, website }
        const url = `${ROOT_URL}api/v1/customers/`
        return fetch(url, {
            method: "POST",
            headers: this.getPrivateHeaders(),
            body: JSON.stringify(payload),
        })
    }

    async DeleteCustomer(id) {
        const url = `${ROOT_URL}api/v1/customers/${id}/`
        return fetch(url, {
            method: "DELETE",
            headers: this.getPrivateHeaders(),
        })
    }

    setToken(token) {
        localStorage.setItem("BUSINESS_TOKEN", token)
    }

    getToken() {
        return localStorage.getItem("BUSINESS_TOKEN")
    }

    getHeader() {
        return {
            "Content-Type": "application/json",
        }
    }

    getPrivateHeaders() {
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getToken()}`,
        }
    }
}
