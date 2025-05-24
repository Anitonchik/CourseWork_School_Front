import axios from "axios";

export default class CircleModel { 
    constructor() {
        this.data = [];
    }

    async getAll(userId, token) {
        try {
            var response = await axios.get(`https://localhost:7235/api/circles/getallrecords`, {
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


    async createCircle(userId, token, data) {
        try {
            var response = await axios.post(`https://localhost:7235/api/circles/register`, data, {
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
            //alert(JSON.stringify(data))
            const response = await axios.put(`https://localhost:7235/api/circles/changeinfo`, JSON.stringify(data), {
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

    async delete(storekeeperId, token, circleId) {
        try{
            const response = await axios.delete(`https://localhost:7235/api/circles/${circleId}`, {
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