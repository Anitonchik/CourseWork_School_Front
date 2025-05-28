import axios from "axios";

export default class MedalModel { 
    constructor() {
        this.data = [];
    }

    async getAll(userId, token) {
        try {
            var response = await axios.get(`https://localhost:7235/api/medals/getallrecords/getallrecords`, {
                params: { storekeeperId: userId }, 
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            console.log(response);
            if (response.status === 200) {
                this.data = response.data;
                return response.data;
            }
        }
        catch (error) {
            alert("ОШИБКА " + error)
        }
    } 


    async createMedal(userId, token, data) {
        try {
            alert(JSON.stringify(data))
            var response = await axios.post(`https://localhost:7235/api/Medals/register/register`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200) {
                this.data = response.data;
                return response;
            }
        }
        catch (error) {
            alert("ОШИБКА " + error)
        }
    }

    async update(token, data) {
        try {
            const response = await axios.put(`https://localhost:7235/api/Medals/changeinfo/changeinfo`, JSON.stringify(data), {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
        }
        catch (error) {
            alert("ОШИБКА " + error)
        }
    }

    async delete(storekeeperId, token, MedalId) {
        try{
            const response = await axios.delete(`https://localhost:7235/api/Medals/delete/${MedalId}`, {
                params: {
                    storekeeperId: storekeeperId
                },
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
        }
        catch (error) {
            alert("ОШИБКА " + error)
        }
    }
}