import MedalModel from "./model.js"
import MedalView from "./view.js"
import axios from "axios";

export default class MedalController extends HTMLElement {
    constructor () {
        super()
        this.model = new MedalModel();
        this.viewModels = [];
        this.materials = [];
        this.usersData = null;
    }

    connectedCallback() {
        this.usersData = JSON.parse(sessionStorage.getItem("usersData"));
        console.log(this.usersData);
        this.userId = this.usersData.id; 
        this.token = this.usersData.token;
        //alert("connectedCallback userId " + this.userId);
        this.loadMedals(this.userId);
    }

    async loadMedals() {
        let usersData = JSON.parse(sessionStorage.getItem("usersData"));

        const medals = await this.model.getAll(this.userId, usersData.token);

        this.materials = await this.loadMaterials(this.userId, usersData.token);

        this.viewModels = [];
        this.innerHTML = "";
        console.log(medals)

        medals.forEach(medalData => {
            const material = this.materials.find(m => m.id === medalData.materialId);
            const viewModel = new MedalView(medalData, this);
            
            const jsonData = {
                StorekeeperId: usersData.id,
                MaterialName: material.materialName,
                MedalName: medalData.medalName,
                Range: medalData.range,
                Description: medalData.description
            }
            viewModel.render(this, jsonData);
            this.viewModels.push(viewModel);
        });
    }

    //тут поменять на id worker
    async createMedal(materialId, name, range, description) {
        let usersData = JSON.parse(sessionStorage.getItem("usersData"));
        const data = {
            storekeeperId: usersData.id,
            materialId: materialId,
            medalName: name,
            range: parseInt(range),
            description: description
        };

        let resp = await this.model.createMedal(usersData.id, usersData.token, data);

        await this.loadMedals();
        
    }

    async updateMedal(medalId, materialId, name, range, description) {
        let usersData = JSON.parse(sessionStorage.getItem("usersData"));

        const data = {
            Id: medalId,
            StorekeeperId: usersData.id,
            MaterialId: materialId,
            MedalName: name,
            Range: range,
            Description: description
        };

        await this.model.update(usersData.token, data);
        await this.loadMedals();
    }

    async deleteMedal(medalId) {
        let usersData = JSON.parse(sessionStorage.getItem("usersData"));

        if (medalId <= 0) {
            return;
        }

       const index = this.viewModels.findIndex(vm => vm.data.id == medalId);

        if (index !== -1) {
            this.viewModels[index].remove();
            this.viewModels.splice(index, 1);
        }
        alert(medalId)
        await this.model.delete(usersData.id, usersData.token, medalId);
        await this.viewModels[index].remove();
    }

    async loadMaterials(userId, token) {
        let usersData = JSON.parse(sessionStorage.getItem("usersData"));
        try {
            var response = await axios.get(`https://localhost:7235/api/materials/getallrecords`, {
                params: { storekeeperId: userId }, 
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            console.log(response);
            if (response.status === 200) {
                this.data = response.data;
                return response.data;
            }
        }
        catch (error) {
            alert("ОШИБКА " + error)
        }

    }
}

customElements.define("medals-container", MedalController);