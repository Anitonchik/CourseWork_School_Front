import axios from "axios";

export default class MaterialModel { 
    constructor() {
        this.data = [];
    }

    async getAll(userId, token) {
        //alert("MODEL getall model token " + token);
        try {
            var response = await axios.get(`https://localhost:7235/api/materials/getallrecords`, {
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


    async createMaterial(userId, token, data) {
        alert(JSON.stringify(data))
        try {
            alert("model")
            var response = await axios.post(`https://localhost:7235/api/Materials`, data, {
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
            const response = await axios.put(`https://localhost:7235/api/Materials`, data, {
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

    async delete(storekeeperId, token, MaterialId) {
        try{
            const response = await axios.delete(`https://localhost:7235/api/Materials/${MaterialId}`, {
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