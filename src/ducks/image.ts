import { AxiosError } from 'axios';
import { Action, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ReduxState } from '.';
import { Image } from '../models/Image';
import { ApiConn } from '../utils/apiConn';
import {
    ImageAddLike,
    ImageRemoveReaction,
    ImageAddDislike,
    getRecentImages,
    deleteImageById,
} from '../controllers/ImageManager';
import { IMAGES_PAGE_SIZE } from '../constants/Constants';

const GET_IMAGES = 'get_images';
const GET_IMAGES_SUCESS = 'get_images_sucess';
const GET_IMAGES_FAIL = 'get_images_fail';
const IMAGES_DATA = 'images_data';
const IMAGES_INDEX_DATA = 'images_index_data';
const IMAGES_END_REACHED_DATA = 'images_end_reached_data';

interface ImageState {
    images: Image[];
    pageIndex: number;
    imagesError: boolean;
    endReached: boolean;
}

const INITIAL_STATE: ImageState = {
    images: [],
    pageIndex: 0,
    imagesError: false,
    endReached: false,
};

export default (state = INITIAL_STATE, action: AnyAction): ImageState => {
    switch (action.type) {
        case GET_IMAGES:
            return { ...state, imagesError: false };
        case GET_IMAGES_SUCESS:
            return { ...state, imagesError: false };
        case GET_IMAGES_FAIL:
            return { ...state, imagesError: true };
        case IMAGES_DATA:
            return { ...state, images: action.payload };
        case IMAGES_INDEX_DATA:
            return { ...state, pageIndex: action.payload };
        case IMAGES_END_REACHED_DATA:
            return { ...state, endReached: action.payload };
        default:
            return state;
    }
};

export const getImages = ({
    pageIndex,
}: {
    pageIndex: number;
}): ThunkAction<void, ReduxState, unknown, Action<string>> => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: GET_IMAGES });
            const {
                data: { images },
            } = await getRecentImages(pageIndex);
            const oldImages = getState().image.images;
            const payload = pageIndex > 0 ? [...oldImages, ...images] : images;

            if (images && images.length >= IMAGES_PAGE_SIZE) {
                dispatch({ type: IMAGES_END_REACHED_DATA, payload: false });
            } else {
                dispatch({ type: IMAGES_END_REACHED_DATA, payload: true });
            }

            dispatch({ type: GET_IMAGES_SUCESS });
            dispatch({ type: IMAGES_INDEX_DATA, payload: pageIndex });
            dispatch({ type: IMAGES_DATA, payload });
        } catch (error) {
            dispatch({ type: GET_IMAGES_FAIL });
            console.log(error);
        }
    };
};

export const likeImage = ({
    image,
    type,
}: {
    image: Image;
    type: 'like' | 'dislike' | 'remove';
}): ThunkAction<void, ReduxState, unknown, Action<string>> => {
    return async (dispatch, getState) => {
        try {
            await ApiConn.post(`./like/${image.id}`, { type });
            const images = getState().image.images;
            const payload = images.map((i) => {
                if (i.id === image.id) {
                    switch (type) {
                        case 'like':
                            return ImageAddLike(i);
                        case 'dislike':
                            return ImageAddDislike(i);
                        default:
                            return ImageRemoveReaction(i);
                    }
                }
                return i;
            });
            dispatch({ type: IMAGES_DATA, payload });
        } catch (error) {
            if ((error as any).isAxiosError) {
                // check to make sure type assertion is right
                const e = error as AxiosError;
                if (e.response?.status === 401) {
                    return Promise.reject('unauthorized');
                }
            }
        }
    };
};

export const uploadImage = ({ title, image }: { title: string; image: File }) => {
    return async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('image', image);
            await ApiConn.post(`./images`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        } catch (error) {
            if ((error as any).isAxiosError) {
                // check to make sure type assertion is right
                const e = error as AxiosError;
                switch (e.response?.status) {
                    case 401:
                        throw new Error('Unauthorized, please sign in');
                    case 422:
                        throw new Error(e.response?.data.message);
                    default:
                        throw new Error('Unknown Error');
                }
            }
            throw new Error('Unknown Error');
        }
    };
};

export const deleteImage = ({ image }: { image: Image }): ThunkAction<void, ReduxState, unknown, Action<string>> => {
    return async (dispatch, getState) => {
        try {
            await deleteImageById(image.id);
            const oldImages = getState().image.images;
            const payload = oldImages.filter((i) => i.id !== image.id);
            dispatch({ type: IMAGES_DATA, payload });
            console.log(payload);
        } catch (error) {
            dispatch({ type: GET_IMAGES_FAIL });
            console.log(error);
        }
    };
};
