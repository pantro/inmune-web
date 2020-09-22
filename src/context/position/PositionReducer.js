import { 
    UPDATE_POSITION
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case UPDATE_POSITION:
            return{
                currentPosition: action.payload
            }
        default:
            return state;
    }
}