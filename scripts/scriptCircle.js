import CircleController from "../components/circleEntity/controller";

let controller = null;
document.addEventListener("DOMContentLoaded", () => {
    controller = new CircleController();
});

document.addEventListener("DOMContentLoaded", () => {
    const textareaName = document.getElementById("textareaName");
    const textareaDesc = document.getElementById("textareaDesc");
    const createCircleButton = document.getElementById("createCircleButton");
    createCircleButton.addEventListener("click", function (e) {
        const name = textareaName.value.trim();
        const description = textareaDesc.value.trim();
        controller.createCircle(name, description);

    });
});