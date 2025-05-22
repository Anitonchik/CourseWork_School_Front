export default class CircleController extends HTMLElement {
    constructor () {
        super()
    }

    connectedCallback() {
        const usersData = JSON.parse(sessionStorage.getItem("usersData"));
        alert("connectedCallback " + usersData.fio)
        this.createHeader(usersData.fio);
    }

    async loadCircles() {
        
    }
}