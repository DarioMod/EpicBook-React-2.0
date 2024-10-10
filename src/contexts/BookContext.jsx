import { createContext, useEffect, useState } from "react";

export const BookContext = createContext()

export const BookContextProvider = ({ children }) => {

    const [isBookError, setIsBookError] = useState("")
    const [isBookLoading, setIsBookLoading] = useState(false)
    const [books, setBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([])

    const endPoint = "https://epibooks.onrender.com/"

    const getBooksFromApi = async () => {
        setIsBookLoading(true)

        try {
            const response = await fetch(endPoint)
            const data = await response.json()
            setBooks(data)
            setIsBookLoading(false)
            setAllBooks(data)

        } catch (error) {
            setIsBookError(error.message)
            console.log(error);
        }
        finally {
            setIsBookLoading(false)
        }
    };

    useEffect(() => {
        getBooksFromApi()
    }, [])

    return (
        <BookContext.Provider
            value={{ isBookError, isBookLoading, books, setBooks, allBooks }}
        >
            {children}
        </BookContext.Provider>
    )
}