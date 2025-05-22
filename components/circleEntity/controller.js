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
        //alert("connectedCallback userId " + this.userId);
        this.loadCircles(this.userId);
    }

    async loadCircles() {
        //alert("controller loadcircles token = " + this.usersData.token);
        const circles = await this.model.getAll(this.userId, this.usersData.token);
        //console.log(circles);
        this.viewModels = [];
        this.innerHTML = "";

        circles.forEach(circleData => {
            //console.log(circleData);
            const viewModel = new CircleView(circleData, this);
            viewModel.render(this);
            this.viewModels.push(viewModel);
        });
    }

    //тут поменять на id worker
    async createCircle(name, description) {
        let usersData = JSON.parse(sessionStorage.getItem("usersData"));
        alert("controller name " + name);
        const data = {
            StorekeeperId: usersData.id,
            CircleName: name,
            Description: description
        };

        let resp = await this.model.createCircle(usersData.id, usersData.token, data);
            const viewModel = new CircleView(data, this);
            viewModel.render(this);
            this.viewModels.push(viewModel);
        
    }

    /*async updatePost(postId, url, text) {
        const index = this.viewModels.findIndex(vm => vm.postData.id == postId);

        if (index !== -1) {
            const viewModel = this.viewModels[index];

            viewModel.postData.postContentImage = url;
            viewModel.postData.postContentText = text;

            viewModel.render(this); 
        }

        await this.model.updatePost(postId, url, text);
    }

    async deletePost(postId) {
        if (postId <= 0) {
            return;
        }

       const index = this.viewModels.findIndex(vm => vm.postData.id == postId);

        if (index !== -1) {
            this.viewModels[index].remove();
            this.viewModels.splice(index, 1);
        }
        
        await this.model.delete(postId);
    }*/
}

customElements.define("circles-container", CircleController);