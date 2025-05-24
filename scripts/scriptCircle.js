import CircleController from "../components/circleEntity/controller";
import LessonController from "../components/lessonEntity/get-lessons-helper";
import MenuHeader from "../components/menu-role-helper.js"

const textareaName = document.getElementById("textareaName");
const textareaDesc = document.getElementById("textareaDesc");

let controller = null;
let lessonController = null;
let circleId = null;
let connectCircleId = null;


document.addEventListener("DOMContentLoaded", () => {
    controller = new CircleController();
    lessonController = new LessonController();
});

document.addEventListener("DOMContentLoaded", () => {
    const controller = new MenuHeader();
});

document.addEventListener("DOMContentLoaded", () => {
    
    const createCircleButton = document.getElementById("createCircleButton");
    createCircleButton.addEventListener("click", function (e) {
        const name = textareaName.value.trim();
        const description = textareaDesc.value.trim();
        controller.createCircle(name, description);
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

document.addEventListener("DOMContentLoaded", () => {
    const createConnectCircleButton = document.getElementById("createConnectCircleButton");
    createConnectCircleButton.addEventListener("click", function (e) {
        const name = textareaName.value.trim();
        const description = textareaDesc.value.trim();
        controller.updateCircle(circleId, name, description);
        textareaName.value = "";
        textareaDesc.value = "";

    });
});

function takeIdToConnectEntities(id, circleName) {
    connectCircleId = id;
    const connectEntities = document.getElementById("connectEntities");
    connectEntities.textContent = circleName;
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