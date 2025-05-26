import { createMaterialCard } from '../entitiesCardHelper/material-card-helper.js'

export default class MaterialView {

    constructor(data, parentElement) {
        this.data = data;
        this.parentDiv = parentElement;
    } 

    render(MaterialController) {
        if (!this.data) return;
        let type = "material";

        createMaterialCard(
            MaterialController,
            this.data.id,
            type,
            this.data.materialName,
            this.data.description
        );
    }

    async loadMaterial(data, controller) {
        try {
            this.data = data;
            this.render(controller);
            return Material;
        } catch (error) {
            console.error("Ошибка при загрузке поста:", error);
        }
    }

    async addComment(profileId, profileName, profileAvatar, commentContentText) {
        const newComment = {
            profileId,
            postId: this.postId,
            commentId: Date.now().toString(),
            profileAvatar,
            profileName,
            commentContentText
        };

        try {
            await createItem("comments", newComment);
            this.comments.push(newComment);
            this.render(); // перерисовываем пост с новым комментарием
        } catch (error) {
            console.error("Ошибка при добавлении комментария:", error);
        }
    }

    async remove() {
        const postElement = document.getElementById(`material-${this.data.id}`);
        if (postElement) {
            postElement.remove();
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