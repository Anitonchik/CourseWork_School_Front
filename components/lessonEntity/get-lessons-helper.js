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
            const block = document.createElement("div");
            block.classList = ("d-flex flex-row gap-2")

            const wrapper = document.createElement("div");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = lessonData.lessonName;
            checkbox.setAttribute("data-lesson-id", `${lessonData.id}`);
            console.log(checkbox.getAttribute("data-lesson-id"))
            checkbox.id = `chk-${lessonData.id}`;

            const label = document.createElement("label");
            label.setAttribute("for", checkbox.id);
            label.classList = "text-nowrap";
            label.textContent = lessonData.lessonName;
            label.style.marginLeft = "5px";
            label.style.width = "60px";
            
            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);


            const count = document.createElement("input");
            count.id = `count-${lessonData.id}`;
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

    /*async getSelectedValues (lessonController){
        const selected = [];
        //console.log(this.container);
        lessonController.querySelectorAll("input[type=checkbox]:checked").forEach(cb => {
            console.log(cb)
            selected.push(cb.value);
        });
        //console.log(selected);
        return selected;
    };*/
    
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

customElements.define("lessons-container", LessonController);