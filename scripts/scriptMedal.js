import MedalController from "../components/medalEntity/controller";

const medalNameInput = document.getElementById("textareaName");
const medalRangeInput = document.getElementById("textareaRange");
const medalDescInput = document.getElementById("textareaDesc");
const materialSelect = document.getElementById("materialSelect");

let controller = null;
let medalId = null;

document.addEventListener("DOMContentLoaded", () => {
    controller = new MedalController();
    loadMaterials();
});

document.addEventListener("DOMContentLoaded", () => {
    let createMedalButton = document.getElementById("createMedalButton");
    createMedalButton.addEventListener("click", function (e) {
        e.preventDefault();

        const materialId = materialSelect.value || null;

        controller.createMedal(materialId, medalNameInput.value.trim(), parseInt(medalRangeInput.value.trim()), medalDescInput.value.trim());
        medalNameInput.value = "";
        medalDescInput.value = "";
        medalRangeInput.value = "";
        materialSelect.value = "";
        document.getElementById("updateMedalButton").style.display = "none";
        document.getElementById("createMedalButton").style.display = "inline-block";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let updateMedalButton = document.getElementById("updateMedalButton");
    updateMedalButton.addEventListener("click", function (e) {
        e.preventDefault();

        const materialId = materialSelect.value || null;

        controller.updateMedal(medalId, materialId, medalNameInput.value.trim(), parseInt(medalRangeInput.value.trim()), medalDescInput.value.trim());
        medalNameInput.value = "";
        medalDescInput.value = "";
        medalRangeInput.value = "";
        materialSelect.value = "";
    });
});

async function loadMaterials() {
    try {
        let usersData = JSON.parse(sessionStorage.getItem("usersData"));
        let materials = await controller.loadMaterials(usersData.id, usersData.token);
        
        materialSelect.innerHTML = '<option value="">Не привязано к материалу</option>';
        materials.forEach(material => {
            const option = document.createElement("option");
            option.value = material.id;
            option.textContent = material.materialName;
            materialSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Ошибка при загрузке материалов:", error);
    }
}

export function takeDataToUpdateMedalInTextarea(controller, id, name, desc, materialName, date) {
    medalId = id;
    medalNameInput.value = name;
    medalDescInput.value = desc || "";
    

    // Находим ID занятия по его названию
    if (materialName && materialName !== "Не указано") {
        const options = Array.from(materialSelect.options);
        const foundOption = options.find(option => option.text === materialName);
        if (foundOption) {
            materialSelect.value = foundOption.value;
        } else {
            materialSelect.value = "";
            console.warn(`материал "${lessonName}" не найдено в списке`);
        }
    } else {
        materialSelect.value = "";
    }
    
    // Показываем кнопку обновления
    document.getElementById("updateMedalButton").style.display = "inline-block";
    document.getElementById("createMedalButton").style.display = "none";
}