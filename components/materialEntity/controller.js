import MaterialModel from "./model.js"
import MaterialView from "./view.js"

export default class MaterialController extends HTMLElement {
    constructor () {
        super()
        this.model = new MaterialModel();
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
        this.loadMaterials(this.userId);
    }

    async loadMaterials() {
        let usersData = JSON.parse(sessionStorage.getItem("usersData"));
        const materials = await this.model.getAll(this.userId, usersData.token);
        console.log(materials)
        this.viewModels = [];
        this.innerHTML = "";

        materials.forEach(materialData => {
            const viewModel = new MaterialView(materialData, this);
            viewModel.render(this);
            this.viewModels.push(viewModel);
        });
    }

    //тут поменять на id worker
    async createMaterial(name, description) {
        let usersData = JSON.parse(sessionStorage.getItem("usersData"));
        alert(JSON.stringify(usersData))
        const data = {
            StorekeeperId: usersData.id,
            MaterialName: name,
            Description: description
        };

        let resp = await this.model.createMaterial(usersData.id, usersData.token, data);

        await this.loadMaterials();
        
    }

    async updateMaterial(MaterialId, name, desc) {
        let usersData = JSON.parse(sessionStorage.getItem("usersData"));

        const data = {
            id: MaterialId,
            storekeeperId: usersData.id,
            materialName: name,
            description: desc
        };
        
        await this.model.update(usersData.token, data);
        await this.loadMaterials();
    }

    async deleteMaterial(MaterialId) {
        let usersData = JSON.parse(sessionStorage.getItem("usersData"));

        if (MaterialId <= 0) {
            return;
        }

       const index = this.viewModels.findIndex(vm => vm.data.id == MaterialId);

        if (index !== -1) {
            this.viewModels[index].remove();
            this.viewModels.splice(index, 1);
        }
        
        await this.model.delete(usersData.id, usersData.token, MaterialId);
        await this.viewModels[index].remove();
    }
}

customElements.define("materials-container", MaterialController);