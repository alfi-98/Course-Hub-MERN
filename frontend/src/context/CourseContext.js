import {createContext } from "react";


export const CourseContext = createContext()

export const CourseContextProvider = ({children}) => {
    return(
        <CourseContext.Provider>
            {children}
        </CourseContext.Provider>
    )
    }