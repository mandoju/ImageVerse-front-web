import { AnyAction } from 'redux';
import { Image } from '../models/Image';
import { ApiConn } from '../utils/apiConn';

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
            const images = await ApiConn.get(`./images?pageIndex=${pageIndex}`);
            const payload = images.data.images;
            dispatch({ type: GET_IMAGES_SUCESS });
            dispatch({ type: IMAGES_DATA, payload });
        } catch (error) {
            dispatch({ type: GET_IMAGES_FAIL });
            console.log(error);
        }
    };
};

export const likeImage = ({ image, type }: { image: Image; type: 'like' | 'dislike' }) => {
    return async (dispatch: any) => {
        try {
            const message = await ApiConn.post(`./like/${image.id}`, { type });
            console.log(message);
        } catch (error) {
            dispatch({ type: GET_IMAGES_FAIL });
            console.log(error);
        }
    };
};
