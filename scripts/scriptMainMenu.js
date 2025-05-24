import MenuHeader from "../components/menu-role-helper.js"

document.addEventListener("DOMContentLoaded", () => {
    const usersData = JSON.parse(sessionStorage.getItem("usersData"));
    const controller = new MenuHeader();
});