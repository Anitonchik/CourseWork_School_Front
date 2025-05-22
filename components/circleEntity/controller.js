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
        alert("connectedCallback userId " + this.userId);
        this.loadCircles(this.userId);
    }

    async loadCircles() {
        alert("controller loadcircles token = " + this.usersData.token);
        const circles = await this.model.getAll(this.userId, this.usersData.token);
        console.log(circles);
        this.viewModels = [];
        this.innerHTML = "";

        /*circles.forEach(circleData => {
            const viewModel = new CircleView(circleData, this);
            viewModel.render(this);
            this.viewModels.push(viewModel);
        });*/
    }

    /*async createPost(url, text) {
        await this.model.createPost(url, text);
        const viewModel = new PostViewModel(postData, this);
        viewModel.render(this);
        this.viewModels.push(viewModel);
    }

    async updatePost(postId, url, text) {
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