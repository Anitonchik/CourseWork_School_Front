import { createMedalCard } from '../entitiesCardHelper/medal-card-helper'

export default class MedalView {

    constructor(data, parentElement) {
        this.data = data;
        this.parentDiv = parentElement;
    } 

    render(MedalController, medalData) {
        createMedalCard(
            MedalController,
            this.data.id,
            medalData.MedalName,
            medalData.MaterialName,
            medalData.Range,
            medalData.Description
        );
    }

    async loadMedal(data, controller) {
        try {
            this.data = data;
            this.render(controller);
            return Medal;
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
        const postElement = document.getElementById(`Medal-${this.data.id}`);
        if (postElement) {
            postElement.remove();
        }
    }

    
} 