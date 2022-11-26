import {CourseContext} from '../context/AuthContext'

import { useContext } from 'react'
import { AuthContext } from './../context/AuthContext';

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw Error('Error found in context')
    }
    
    return context
}