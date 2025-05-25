import CircleController from "../components/circleEntity/controller";
import LessonController from "../components/lessonEntity/get-lessons-helper";
import MaterialCircleController from "../components/materialEntity/connect-material-circle.js";
import MenuHeader from "../components/menu-role-helper.js"
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const textareaName = document.getElementById("textareaName");
const textareaDesc = document.getElementById("textareaDesc");
const materialSelect = document.getElementById("materialSelect");

let controller = null;
let lessonController = null;
let circleId = null;
let connectCircleId = null;


document.addEventListener("DOMContentLoaded", () => {
    const controllerMenu = new MenuHeader();
    controller = new CircleController();
    lessonController = new LessonController();
    let materialCircleController = new MaterialCircleController();

    loadMaterials();
});


document.addEventListener("DOMContentLoaded", () => {
    
    const createCircleButton = document.getElementById("createCircleButton");
    createCircleButton.addEventListener("click", function (e) {
        const name = textareaName.value.trim();
        const description = textareaDesc.value.trim();

        const circleId = uuidv4();
        let circleMaterials = getMaterials(circleId);

        controller.createCircle(circleId, name, description, circleMaterials);
        textareaName.value = "";
        textareaDesc.value = "";

    });
});

document.addEventListener("DOMContentLoaded", () => {
    
    const updateCircleButton = document.getElementById("updateCircleButton");
    updateCircleButton.addEventListener("click", function (e) {
        const name = textareaName.value.trim();
        const description = textareaDesc.value.trim();
        
        controller.updateCircle(circleId, name, description);
        textareaName.value = "";
        textareaDesc.value = "";

    });
});

/*создание связи многие-ко-многим кружка и материала ----------------------------------------------------------------------------*/
/*async function loadMaterials() {
    try {
        const usersData = JSON.parse(sessionStorage.getItem("usersData"));
        var response = await axios.get(`https://localhost:7235/api/materials/getallrecords`, {
            params: { storekeeperId: usersData.id }, 
            headers: {
                "Authorization": `Bearer ${usersData.token}`,
                "Content-Type": "application/json"
            }
        });
        
        materialSelect.innerHTML = '<option class="" value="">Выберите материал</option>';
        response.data.forEach(material => {
            const option = document.createElement("option");
            option.value = material.id;
            option.textContent = material.materialName;
            materialSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Ошибка при загрузке занятий:", error);
    }
}

/*--------------------------------------------------------------------------------------------------------------------------------*/

document.addEventListener("DOMContentLoaded", () => {
    const createConnectCircleButton = document.getElementById("createConnectCircleButton");
    const circleCard = document.getElementById("connectEntities");
    createConnectCircleButton.addEventListener("click", function (e) {

        if (circleCard.textContent === "") {
            alert("выберите кружок");
            return;
        }

        const circleId = circleCard.getAttribute("circle-id");
        const controllers = document.getElementsByTagName("lessons-container");

        if (controllers.length > 0) {
            const controller = controllers[0];

            controller.querySelectorAll("input[type=checkbox]:checked").forEach(cb => {
                const lessonId = cb.getAttribute("data-lesson-id");
                const countInput = document.getElementById(`count-${lessonId}`).value;
                
                if (countInput) {
                    console.log(`Lesson: ${cb.value}, Count: ${countInput.value}`);
                    if (countInput <= 0) {
                        alert("Количество занятий не может быть меньше или равным 0")
                        return;
                    }

                    lessonController.createConnect(lessonId, circleId, countInput);

                } else {
                    console.warn(`Не найден input для lessonId: ${lessonId}`);
                }   
            });
        } else {
            alert("Нет добавленных записей занятий");
        }
    });
});

/*создание связи многие-ко-многим кружка и материала ----------------------------------------------------------------------------*/
function getMaterials(circleId) {
    const controllers = document.getElementsByTagName("material-circle-container");

    if (controllers.length > 0) {
        const controller = controllers[0];

        let materials = [];

        controller.querySelectorAll("input[type=checkbox]:checked").forEach(cb => {
            const materialId = cb.getAttribute("data-material-id");
            const countInput = document.getElementById(`count-${materialId}`).value;
            
            if (countInput) {
                if (countInput <= 0) {
                    alert("Количество материалов не может быть меньше или равным 0")
                    return;
                }

                materials.push({
                    CircleId: circleId,
                    MaterialId: materialId,
                    Count: countInput
                })

            } else {
                console.warn(`Не найден input для materialId: ${materialId}`);
            }   
        });

        return materials;
    }
};
/*--------------------------------------------------------------------------------------------------------------------------------*/

function takeIdToConnectEntities(id, circleName) {
    connectCircleId = id;
    const connectEntities = document.getElementById("connectEntities");
    connectEntities.textContent = circleName;
    connectEntities.setAttribute("circle-id", `${id}`);
    document.getElementById("connectBlock").scrollIntoView({
        behavior: "smooth"
      });
}

function takeDataToUpdateCircleInTextarea(binController, id, name, desc) {
    controller = binController;
    circleId = id;

    textareaName.textContent = name;
    textareaDesc.textContent = desc;

    const updateCircleButton = document.getElementById("updateCircleButton");
    updateCircleButton.classList.add('show');
}

export {takeDataToUpdateCircleInTextarea, takeIdToConnectEntities}; 