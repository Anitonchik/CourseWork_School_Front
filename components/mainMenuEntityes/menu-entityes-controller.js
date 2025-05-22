export default class MenuEntityes extends HTMLElement {
    constructor(role) { //елис флаг false, значит загружается лента всех постов
        super(); 
        let firstEntity = "";
        let secondEntity = "";
        let thirdEntity = "";
        let hrefFirstEntity = "";
        let hrefSecondEntity = ""; 
        let hrefThirdEntity = "";
        let firstReport = "";
        let secondReport = "";
        if (role === "worker") {
            firstEntity = "Занятия";
            secondEntity = "Интерес";
            thirdEntity = "Должность";
            firstReport = "Получить список материалов";
            secondReport = "Получить отчет по инетерсам";
        }
    }
}