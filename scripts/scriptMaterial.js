import MaterialController from "../components/materialEntity/controller";

const textareaName = document.getElementById("textareaName");
const textareaDesc = document.getElementById("textareaDesc");

let controller = null;
let materialId = null;


document.addEventListener("DOMContentLoaded", () => {
    controller = new MaterialController();
});

document.addEventListener("DOMContentLoaded", () => {
    
    const createMaterialButton = document.getElementById("createMaterialButton");
    createMaterialButton.addEventListener("click", function (e) {
        const name = textareaName.value.trim();
        const description = textareaDesc.value.trim();
        controller.createMaterial(name, description);
        textareaName.value = "";
        textareaDesc.value = "";

    });
});

document.addEventListener("DOMContentLoaded", () => {
    
    const updateMaterialButton = document.getElementById("updateMaterialButton");
    updateMaterialButton.addEventListener("click", function (e) {
        const name = textareaName.value.trim();
        const description = textareaDesc.value.trim();
        controller.updateMaterial(materialId, name, description);
        textareaName.value = "";
        textareaDesc.value = "";

    });
});

function takeDataToUpdateMaterialInTextarea(binController, id, name, desc) {
    controller = binController;
    materialId = id;

    textareaName.textContent = name;
    textareaDesc.textContent = desc;

    const updateMaterialButton = document.getElementById("updateMaterialButton");
    updateMaterialButton.classList.add('show');
}

export {takeDataToUpdateMaterialInTextarea}; 