import MenuEntityes from "../components/mainMenuEntityes/menu-entityes-controller.js"

document.addEventListener("DOMContentLoaded", () => {
    const controller = new MenuEntityes(1, false);
    controller.loadPosts(1);
});