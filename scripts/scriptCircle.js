import CircleController from "../components/circleEntity/controller";

const textareaName = document.getElementById("textareaName");
const textareaDesc = document.getElementById("textareaDesc");

let controller = null;
let circleId = null;


document.addEventListener("DOMContentLoaded", () => {
    controller = new CircleController();
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

function takeDataToUpdateCircleInTextarea(binController, id, name, desc) {
    controller = binController;
    circleId = id;

    textareaName.textContent = name;
    textareaDesc.textContent = desc;

    const updateCircleButton = document.getElementById("updateCircleButton");
    updateCircleButton.classList.add('show');
}

export {takeDataToUpdateCircleInTextarea}; 