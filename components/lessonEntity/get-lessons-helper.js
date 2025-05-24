import axios from "axios";

export default class LessonController extends HTMLElement {
    constructor () {
        super()
    }

    connectedCallback() {
        this.loadLessons();
    }

    async getLessons() {
        let usersData = JSON.parse(sessionStorage.getItem("usersData"));
        try {
            var response = await axios.get(`https://localhost:7235/api/lessons/getwholerecords`, {
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

    async loadLessons(){
        const lessons = await this.getLessons();

        this.container = document.createElement("div");

        lessons.forEach(lessonData => {
            const wrapper = document.createElement("div");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = lessonData.lessonName;
            checkbox.id = `chk-${lessonData.id}`;

            const label = document.createElement("label");
            label.setAttribute("for", checkbox.id);
            label.textContent = lessonData.lessonName;
            label.style.marginLeft = "5px";

            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);
            this.container.prepend(wrapper);
        });

        this.appendChild(this.container);
    }

    async getSelectedValues (){
        const selected = [];
        this.container.querySelectorAll("input[type=checkbox]:checked").forEach(cb => {
            selected.push(cb.value);
        });
        return selected;
    };

    async connectEntities() {
        const selected = this.getSelectedValues();
        let usersData = JSON.parse(sessionStorage.getItem("usersData"));
        try {
            var response = await axios.get(`https://localhost:7235/api/lessons/getwholerecords`, {
                headers: {
                    "Authorization": `Bearer ${usersData.token}`,
                    "Content-Type": "application/json"
                }
            });
    }


    
}

customElements.define("lessons-container", LessonController);