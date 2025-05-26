import MaterialCircleController from "../components/materialEntity/connect-material-circle.js";
import MenuHeader from "../components/menu-role-helper.js";
import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
    const controllerMenu = new MenuHeader();
    let materialCircleController = new MaterialCircleController();
});

document.addEventListener("DOMContentLoaded", () => {

    const generateReportBtn = document.getElementById("generateReportBtn");
    generateReportBtn.addEventListener("click", function (e) {
        const controllers = document.getElementsByTagName("material-circle-container");

        let materialIds = [];

        if (controllers.length > 0) {
            const controller = controllers[0];
            controller.querySelectorAll("input[type=checkbox]:checked").forEach(cb => {
                const materialId = cb.getAttribute("data-material-id");

                alert("material");
                materialIds.push(materialId);
            });
        }

        const selectedFormat = document.querySelector('input[name="reportFormat"]:checked').value;

        if (selectedFormat === "word") {
            console.log(materialIds)
            reportWordLessonByMaterialsAsync(materialIds);
        }
        else if (selectedFormat === "excel") {
            console.log(materialIds)
            reportExcelLessonByMaterialsAsync(materialIds);
        }

    });
});

async function reportWordLessonByMaterialsAsync(materialIds) {
    let usersData = JSON.parse(sessionStorage.getItem("usersData"));
    alert(JSON.stringify(usersData))
    const queryParams = `storekeeperId=${usersData.id}&` + materialIds.map(id => `materialIds=${id}`).join("&");

    try {
        var response = await axios.get(`https://localhost:7235/api/report/CreateWordDocumentLessonByMaterials/CreateWordDocumentLessonByMaterialsAsync?${queryParams}`, {
            headers: {
                "Authorization": `Bearer ${usersData.token}`,
                "Accept": "application/octet-stream"
            },
            responseType: 'blob'
        });
        console.log(response);
        if (response.status === 200) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'LessonsByMaterials.docx'); // Имя файла
            document.body.appendChild(link);
            link.click();
            
            // Очистка
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        }
    }
    catch (error) {
        alert("ОШИБКА " + error)
    }
}

async function reportExcelLessonByMaterialsAsync(materialIds) {
    let usersData = JSON.parse(sessionStorage.getItem("usersData"));
    alert(JSON.stringify(usersData))
    const queryParams = `storekeeperId=${usersData.id}&` + materialIds.map(id => `materialIds=${id}`).join("&");

    try {
        var response = await axios.get(`https://localhost:7235/api/report/CreateExcelDocumentLessonByMaterials?${queryParams}`, {
            headers: {
                "Authorization": `Bearer ${usersData.token}`,
                "Accept": "application/octet-stream"
            },
            responseType: 'blob'
        });
        console.log(response);
        if (response.status === 200) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'LessonsByMaterials.xlsx');
            document.body.appendChild(link);
            link.click();
            
            // Очистка
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        }
    }
    catch (error) {
        alert("ОШИБКА " + error)
    }
}