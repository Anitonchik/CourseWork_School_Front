import {takeDataToUpdateCircleInTextarea} from '../../scripts/scriptCircle.js'
import { takeDataToUpdateMaterialInTextarea } from '../../scripts/scriptMaterial.js';
import {takeIdToConnectEntities} from '../../scripts/scriptCircle.js'

function createCircleCard(controller, entityId, type, name, description, materials = [], lessons = []) {
    console.log(name)
    const entityContainer = document.createElement("div");
    entityContainer.className = "container-white-card";
    entityContainer.id = `${type}-${entityId}`;

    entityContainer.appendChild(createTextBlock("Название:", name));
    entityContainer.appendChild(createTextBlock("Описание:", description));
    
    const materialsBlock = document.createElement("div");
    materialsBlock.classList = ("d-flex flex-column");

    const labelMaterials = document.createElement("label");
    labelMaterials.className = "dark-font-less";
    labelMaterials.textContent = "Материалы:";

    materialsBlock.appendChild(labelMaterials);

    if (materials.length > 0) {

        const ulMaterials = document.createElement("ul");
        ulMaterials.style.listStyle = "none";
        materials.forEach(material => {
            const li = document.createElement("li");
            li.classList = "handWrite-dark-font text-nowrap";
            li.style.whiteSpace = "nowrap";
            li.style.fontSize = "24px";
            li.textContent = material.materialName;
            ulMaterials.appendChild(li);
        });
        materialsBlock.appendChild(ulMaterials);     
    }
    else {
        const ulMaterials = document.createElement("p");
        ulMaterials.textContent = "___";
        materialsBlock.appendChild(ulMaterials);
    }
    entityContainer.appendChild(materialsBlock);



    const lessonsBlock = document.createElement("div");
    lessonsBlock.classList = ("d-flex flex-column");

    const labelLessons = document.createElement("label");
    labelLessons.className = "dark-font-less";
    labelLessons.textContent = "Занятия:";

    lessonsBlock.appendChild(labelLessons);

    if (lessons.length > 0) {

        const ulLessons = document.createElement("ul");
        ulLessons.style.listStyle = "none";
        ulLessons.classList = "text-nowrap";
        lessons.forEach(lesson => {
            const li = document.createElement("li");
            li.className = "handWrite-dark-font";
            li.style.fontSize = "24px";
            li.textContent = lesson;
            ulLessons.appendChild(li);
        });
        materialsBlock.appendChild(ulLessons);     
    }
    else {
        const ulLessons = document.createElement("p");
        ulLessons.textContent = "___";
        lessonsBlock.appendChild(ulLessons);
    }
    entityContainer.appendChild(lessonsBlock);


    const buttonContainer = document.createElement("div");
    buttonContainer.className = "d-flex gap-3 mt-3";

    const updateButton = createButton("bi bi-pencil", "Изменить");
    updateButton.addEventListener("click", () => {
        takeDataToUpdateCircleInTextarea(controller, entityId, name, description, materials);
    });
    

    const deleteButton = createButton("bi bi-trash", "Удалить");
    deleteButton.addEventListener("click", () => {
        controller.deleteCircle(entityId)
    });
    
    
    buttonContainer.appendChild(updateButton);

    buttonContainer.appendChild(deleteButton);

    if (type === "circle") {
        const connectButton = createButton("bi bi-trash", "Связать");
        connectButton.addEventListener("click", () => {
            takeIdToConnectEntities(entityId, name);
        });
        buttonContainer.appendChild(connectButton);
    }

    entityContainer.appendChild(buttonContainer);

    controller.prepend(entityContainer)
}

const createTextBlock = (label, text) => {
    const wrapper = document.createElement("div");

    const labelDiv = document.createElement("div");
    labelDiv.className = "dark-font-less";
    labelDiv.textContent = label;

    const textDiv = document.createElement("div");
    textDiv.className = "handWrite-dark-font";
    textDiv.style.fontSize = "24px";
    textDiv.textContent = text;

    wrapper.appendChild(labelDiv);
    wrapper.appendChild(textDiv);

    return wrapper;
};


const createButton = (iconClass, text) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn";
    button.style.cssText = `
        background-color: transparent;
        color: #313131;
        border: 1px solid #313131;
        border-radius: 10px;
        padding: 8px 12px;
        display: flex;
        align-items: center;
        gap: 5px;
    `;

    const icon = document.createElement("i");
    icon.className = iconClass;

    button.appendChild(icon);
    button.appendChild(document.createTextNode(` ${text}`));

    return button;
};

export {createCircleCard};