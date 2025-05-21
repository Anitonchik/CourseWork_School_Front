import axios from "axios";

const URL = "http://localhost:5281/";

export const fetchRegistration = async (userData) => {
    try{
        var response = await axios.post(`http://localhost:5281/api/userloginaccaunt/Register`, userData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        alert("ну как будто прошло")
    }
    catch (err) {
        alert("ОШИБКА: " + err);
    }
    
}