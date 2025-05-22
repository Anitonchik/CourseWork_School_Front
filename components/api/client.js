import UsersData from "../user-data.js";
import axios from "axios";

const URL = "http://localhost:5281/";

let usersData = null;

export const fetchRegistration = async (userData) => {
    try{
        var response = await axios.post(`http://localhost:5281/api/userloginaccaunt/Register`, userData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(response);
        if (response.status === 200) {
            usersData = new UsersData(userData.login, userData.fio);
            window.location.href = "MainMenu.html";
        }
        return response;
    }
    catch (err) {
        alert("ОШИБКА: " + err);
    }
    
}

export const fetchLogin = async (userData) => {
    try{
        alert("зашли в клиент")
        var response = await axios.post(`https://localhost:7235/api/userloginaccaunt/login`, userData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(response);
        if (response.status === 200) {
            usersData = new UsersData(userData.login, userData.fio);
            window.location.href = "MainMenu.html";
        }
        return response;
    }
    catch (error) {
        if (error.response) {
            console.error(`Ошибка ${error.response.status}: ${error.response.statusText}`);
            
            if (error.response.status === 500) {
                alert("нет пользователя")
            }
        } else {
            console.error("Ошибка запроса:", error.message);
            alert("Ошибка сети, проверьте соединение.");
        }
    }
    
}