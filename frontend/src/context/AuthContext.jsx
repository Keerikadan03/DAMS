import { createContext, useContext,useEffect,useReducer } from 'react'

const initialState = {
    user: null,
    role:null,
    token:null
}

export const authContext = createContext(initialState)

const authReducer = (state,action) => {
    switch(action.type){
        case 'LOGIN_START':
            return {
                user:null,
                role:null,
                token:null
            }
            break;
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload.user,
                role: action.payload.role,
                token: action.payload.token
            }
            break;
        case 'LOGOUT':
            return {
                user:null,
                role:null,
                token:null
            }
            break;
        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(authReducer,initialState);
    return <authContext.Provider value={{user:state.user, role:state.role, token:state.role,dispatch}}>
        {children}
    </authContext.Provider>
};