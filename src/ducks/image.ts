import { AnyAction } from 'redux';
import { Image } from '../models/Image';

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
