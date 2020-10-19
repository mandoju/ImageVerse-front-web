import { Image } from '../models/Image';
import { ApiConn } from '../utils/apiConn';
import { refreshToken } from '../utils/UserManager';

export const getRecentImages = async (pageIndex: number) => {
    try {
        await refreshToken();
    } catch (error) {}
    const images = await ApiConn.get(`./images?page=${pageIndex}`);
    return images;
};

export const deleteImageById = async (imageId: number) => {
    await ApiConn.delete(`./images/${imageId}`);
};

export const ImageAddLike = (image: Image): Image => {
    const likesCount = image.liked === true ? image.likesCount : image.likesCount + 1;
    const dislikesCount = image.disliked === true ? image.dislikesCount - 1 : image.dislikesCount;
    const liked = true;
    const disliked = false;
    return { ...image, likesCount, dislikesCount, liked, disliked };
};

export const ImageAddDislike = (image: Image): Image => {
    const likesCount = image.liked === true ? image.likesCount - 1 : image.likesCount;
    const dislikesCount = image.disliked === true ? image.dislikesCount : image.dislikesCount + 1;
    const liked = false;
    const disliked = true;
    return { ...image, likesCount, dislikesCount, liked, disliked };
};

export const ImageRemoveReaction = (image: Image): Image => {
    const likesCount = image.liked === true ? image.likesCount - 1 : image.likesCount;
    const dislikesCount = image.disliked === true ? image.dislikesCount - 1 : image.dislikesCount;
    const liked = false;
    const disliked = false;
    return { ...image, likesCount, dislikesCount, liked, disliked };
};
