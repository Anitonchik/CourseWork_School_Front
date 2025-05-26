import axios from "axios";

export default class MaterialCircleController extends HTMLElement {
    constructor () {
        super()
    }

    connectedCallback() {
        this.loadMaterials();
    }

    async getMaterials() {
        let usersData = JSON.parse(sessionStorage.getItem("usersData"));
        try {
            var response = await axios.get(`https://localhost:7235/api/materials/getallrecords`, {
                params: { storekeeperId: usersData.id },
                headers: {
                    "Authorization": `Bearer ${usersData.token}`,
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

    async loadMaterials(){
        const materials = await this.getMaterials();

        this.container = document.createElement("div");

        materials.forEach(materialData => {
            const block = document.createElement("div");
            block.classList = ("d-flex flex-row gap-2")

            const wrapper = document.createElement("div");
            wrapper.classList = ("d-flex text-align-centre")

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = materialData.materialName;
            checkbox.setAttribute("data-material-id", `${materialData.id}`);
            checkbox.id = `chk-${materialData.id}`;

            const label = document.createElement("label");
            label.setAttribute("for", checkbox.id);
            label.textContent = materialData.materialName;
            label.style.whiteSpace = "normal"; 
            label.style.overflow = "hidden";
            label.style.marginLeft = "5px";
            label.style.width = "60px";
            label.style.maxWidth = "70px";
            
            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);


            const count = document.createElement("input");
            count.id = `count-${materialData.id}`;
            count.classList = ("textarea-entities d-flex justify-content-center align-items-center");
            count.style.width = "100px";
            count.style.height = "25px";
            count.value = 0;

            block.appendChild(wrapper);
            block.appendChild(count);

            this.container.prepend(block);
        });

        this.appendChild(this.container);
    }
    
    async createConnect(lessonId, circleId, countInput) {
        let usersData = JSON.parse(sessionStorage.getItem("usersData")); 
        let data = {
            UserId: usersData.id,
            LessonId: lessonId,
            CircleId: circleId,
            Count: parseInt(countInput, 10) 
        } 
        console.log(data)
        try {
            var response = await axios.post(`https://localhost:7235/api/lessoncircle/register`, data, {
                headers: {
                    "Authorization": `Bearer ${usersData.token}`,
                    "Content-Type": "application/json"
                }
            });
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

customElements.define("material-circle-container", MaterialCircleController);