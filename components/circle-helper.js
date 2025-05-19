function createEntity(entityId, name, description) {
    const entityContainer = document.createElement("div");
    entityContainer.id = `${entityId}`;
    entityContainer.className = "container-white-card";

    const nameContainer = document.createElement("div");

    const nameLabel = document.createElement("div");
    nameLabel.textContent = "Название:";

    const nameContent = document.createElement("div");
    nameContent.textContent = name;

    nameContainer.appendChild(nameLabel);
    nameContainer.appendChild(nameContent);

}