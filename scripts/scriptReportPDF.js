import axios from "axios";
document.addEventListener("DOMContentLoaded", async () => {
    const usersData = JSON.parse(sessionStorage.getItem("usersData"));
    if (!usersData) {
        window.location.href = "login.html";
        return;
    }
    
    const storekeeperId = usersData.id;
    const token = usersData.token;
    const showReportBtn = document.getElementById("showReportBtn");
    const sendEmailBtn = document.getElementById("sendEmailBtn");
    const pdfViewerContainer = document.getElementById("pdfViewerContainer");

    // Установка дат по умолчанию
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    document.getElementById("fromDate").valueAsDate = firstDay;
    document.getElementById("toDate").valueAsDate = today;

    showReportBtn.addEventListener("click", async () => {
        const fromDate = document.getElementById("fromDate").value;
        const toDate = document.getElementById("toDate").value;
        
        if (!fromDate || !toDate) {
            alert("Выберите период");
            return;
        }

        try {
            // Показываем индикатор загрузки
            showReportBtn.disabled = true;
            showReportBtn.textContent = "Загрузка...";
            pdfViewerContainer.innerHTML = '<div class="text-center">Загрузка PDF...</div>';
            pdfViewerContainer.style.display = 'block';

            const response = await axios.get(
                `https://localhost:7235/api/report/CreateDocumentCirclesWithInterestsWithMedals`,
                {
                    params: {
                        storekeeperId,
                        fromDate,
                        toDate
                    },
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/pdf"
                    },
                    responseType: "blob"
                }
            );

            if (!response.data || response.data.size === 0) {
                throw new Error("Получен пустой PDF файл");
            }

            const blob = new Blob([response.data], { type: 'application/pdf' });
const url = URL.createObjectURL(blob);

// Очищаем контейнер
pdfViewerContainer.innerHTML = '';

// Создаем embed элемент (более надежный, чем iframe для PDF)
const embed = document.createElement('embed');
embed.src = url;
embed.type = 'application/pdf';
embed.style.width = '100%';
embed.style.height = '600px';

pdfViewerContainer.appendChild(embed);
            
        } catch (error) {
            console.error("Ошибка:", error);
            pdfViewerContainer.innerHTML = `
                <div class="alert alert-danger">
                    Ошибка при загрузке PDF: ${error.message || 'Неизвестная ошибка'}
                </div>`;
        } finally {
            showReportBtn.disabled = false;
            showReportBtn.textContent = "Показать отчет";
        }
    });

    sendEmailBtn.addEventListener("click", async () => {
        const fromDate = document.getElementById("fromDate").value;
        const toDate = document.getElementById("toDate").value;
        const email = document.getElementById("emailInput").value;
        
        if (!fromDate || !toDate) {
            alert("Выберите период");
            return;
        }
        
        if (!email || !email.includes("@")) {
            alert("Введите корректный email");
            return;
        }

        try {
            sendEmailBtn.disabled = true;
            sendEmailBtn.textContent = "Отправка...";
            
            const response = await axios.post(
                "https://localhost:7235/api/report/SendInterestsPdfReportByEmail",
                {
                    workerId,
                    fromDate,
                    toDate,
                    email
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 200) {
                alert("PDF отчет успешно отправлен на указанный email");
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert(`Ошибка при отправке отчета: ${error.response?.data?.message || error.message}`);
        } finally {
            sendEmailBtn.disabled = false;
            sendEmailBtn.textContent = "Отправить на почту";
        }
    });
});