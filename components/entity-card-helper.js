function createCardEntity(controller, entityId, type, name, description) {
    console.log(name)
    const entityContainer = document.createElement("div");
    entityContainer.className = "container-white-card";
    entityContainer.id = `${type}-${entityId}`;

    entityContainer.appendChild(createTextBlock("Название:", name));
    entityContainer.appendChild(createTextBlock("Описание:", description));

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "d-flex gap-3 mt-3";

    buttonContainer.appendChild(createButton("bi bi-pencil", "Изменить"));
    buttonContainer.appendChild(createButton("bi bi-trash", "Удалить"));

    entityContainer.appendChild(buttonContainer);

    controller.appendChild(entityContainer)
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

export {createCardEntity};