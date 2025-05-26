import {createCircleCard} from '../entitiesCardHelper/circle-card-helper.js'

export default class CircleView {

    constructor(data, parentElement) {
        this.data = data;
        this.parentDiv = parentElement;
    } 

    render(circleController) {
        if (!this.data) return;
        let type = "circle";

        createCircleCard(
            circleController,
            this.data.id,
            type,
            this.data.circleName,
            this.data.description,
            this.data.materials
        );  
    }

    async loadMaterials(data, controller) {
        try {
            this.data = data;
            this.render(controller);
            return circle;
        } catch (error) {
            console.error("Ошибка при загрузке поста:", error);
        }
    }


    async remove(id) {
        const element = document.getElementById(`circle-${id}`);
        if (element) {
            element.remove();
        }
    }

    /*attachCommentFormListener() {
        const form = document.getElementById("enter-comment");
        const textarea = document.getElementById("comment-textarea");

        if (form && textarea) {
            form.onsubmit = (e) => {
                e.preventDefault();
                const commentText = textarea.value.trim();
                if (commentText) {
                    // Для примера передаём тестовые данные пользователя
                    this.addComment(
                        "2",
                        "name 2",
                        "images/ava2",
                        commentText
                    );
                    textarea.value = "";
                }
            };
        }
    }*/
} 