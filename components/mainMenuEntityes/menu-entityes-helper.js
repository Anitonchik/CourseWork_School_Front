// еще нужно передавать методы для отчетов

function createEntityes (firstEntity, secondEntity, thirdEntity, hrefEntity, 
     firstReport, secondReport) {
    
    const container = document.createElement("div");
    
    container.appendChild(createLink(firstEntity, hrefEntity, "container-green-p"));
    container.appendChild(createLink(secondEntity, hrefEntity, "container-green-p"));
    container.appendChild(createLink(thirdEntity, hrefEntity, "container-green-p"));
    
    const secondContainer = document.createElement("div");
    
    secondContainer.appendChild(createLink(firstReport, "Settings.html", "container-purple-p"));
    secondContainer.appendChild(createLink(secondReport, "Settings.html", "container-purple-p"));
    
    document.body.appendChild(container);
    document.body.appendChild(secondContainer);
    
}

function createLink(text, href, className) {
    const link = document.createElement("a");
    link.href = href;
    link.className = "d-flex align-items-center justify-content-center";
    link.style.margin = "10px 0px 10px 0px";
    link.style.textDecoration = "none";

    const paragraph = document.createElement("p");
    paragraph.className = `h2 mb-2 ${className} milligram-dark-font`;
    paragraph.textContent = text;

    link.appendChild(paragraph);
    return link;
}