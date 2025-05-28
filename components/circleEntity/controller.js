import CircleModel from "./model.js"
import CircleView from "./view.js"

export default class CircleController extends HTMLElement {
    constructor () {
        super()
        this.model = new CircleModel();
        this.viewModels = [];
        this.usersData = null;
    }

    /*connectedCallback() {
        const usersData = JSON.parse(sessionStorage.getItem("usersData"));
        alert("connectedCallback " + usersData.fio)
        this.createHeader(usersData.fio);
    }*/

    connectedCallback() {
        this.usersData = JSON.parse(sessionStorage.getItem("usersData"));
        console.log(this.usersData);
        this.userId = this.usersData.id; 
        this.token = this.usersData.token;
        this.loadCircles(this.userId);
    }

    async loadCircles() {
        const circles = await this.model.getAll(this.userId, this.usersData.token);
        console.log(circles)
        this.viewModels = [];
        this.innerHTML = "";

        circles.forEach(circleData => {
            const viewModel = new CircleView(circleData, this);
            viewModel.render(this);
            this.viewModels.push(viewModel);
        });
    }

    //тут поменять на id worker
    async createCircle(circleId, name, description, circleMaterials) {
        let usersData = JSON.parse(sessionStorage.getItem("usersData"));
        alert("name " + name)
        const data = {
            Id: circleId,
            StorekeeperId: usersData.id,
            CircleName: name,
            Description: description,
            Materials: circleMaterials
        };

        let resp = await this.model.createCircle(usersData.id, usersData.token, data);

        await this.loadCircles();
        
    }

    async updateCircle(circleId, name, desc, materials) {
        let usersData = JSON.parse(sessionStorage.getItem("usersData"));

        const data = {
            Id: circleId,
            StorekeeperId: usersData.id,
            CircleName: name,
            Description: desc,
            Materials: materials
        };

        await this.model.update(usersData.token, data);
        await this.loadCircles();
    }

    async deleteCircle(circleId) {
        let usersData = JSON.parse(sessionStorage.getItem("usersData"));

        if (circleId <= 0) {
            return;
        }

       const index = this.viewModels.findIndex(vm => vm.data.id == circleId);

        if (index !== -1) {
            this.viewModels[index].remove();
            this.viewModels.splice(index, 1);
        }
        
        await this.model.delete(usersData.id, usersData.token, circleId);
    }
}

customElements.define("circles-container", CircleController);