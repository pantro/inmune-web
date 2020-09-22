import React, {useReducer} from 'react';

import PositionContext from './PositionContext';
import PositionReducer from './PositionReducer';
import { 
    UPDATE_POSITION
} from '../../types';

const PositionState = props => {
    
    const initialState = {
        currentPosition: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(PositionReducer, initialState);

    //Funciones
    const UpdatePosition = (position) => {
        debugger;
        dispatch({
            type: UPDATE_POSITION,
            payload: position
        });
    }

    return(
        <PositionContext.Provider
            value={{
                currentPosition: state.currentPosition,
                UpdatePosition
            }}
        >
            {props.children}
        </PositionContext.Provider>
    );
}

export default PositionState;