import { AxiosError } from 'axios';
import { Action, ActionCreator, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ReduxState } from '.';
import { Image } from '../models/Image';
import { ApiConn } from '../utils/apiConn';
import { refreshToken } from '../utils/UserManager';
import { ImageAddLike, ImageRemoveReaction, ImageAddDislike, getRecentImages } from '../controllers/ImageManager';

const GET_IMAGES = 'get_images';
const GET_IMAGES_SUCESS = 'get_images_sucess';
const GET_IMAGES_FAIL = 'get_images_fail';
const IMAGES_DATA = 'images_data';
const IMAGES_INDEX_DATA = 'images_index_data';

interface ImageState {
    images: Image[];
    pageIndex: number;
    imagesError: boolean;
}

const INITIAL_STATE: ImageState = {
    images: [],
    pageIndex: 0,
    imagesError: false,
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
        default:
            return state;
    }
};

export const getImages = ({ pageIndex }: { pageIndex: number }) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GET_IMAGES });
            const images = await getRecentImages(pageIndex);
            const payload = images.data.images;
            dispatch({ type: GET_IMAGES_SUCESS });
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
            const resp = await ApiConn.post(`./like/${image.id}`, { type });
            const images = getState().image.images;
            const payload = images.map((i) => {
                if (i.id == image.id) {
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
    return async (_: any) => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('image', image);
            await ApiConn.post(`./images`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
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
