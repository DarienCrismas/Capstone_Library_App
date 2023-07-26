import React, { useState, useEffect } from 'react';
import { serverCalls } from '../api';
import { BookState } from "../redux/slices/rootSlice";

export const useGetData = () => {
    const [libraryData, setData] = useState<BookState[]>([]);

    async function handleDataFetch(){
        const result = await serverCalls.get();
        setData(result)
    }

    useEffect( () => {
        handleDataFetch();
    }, [])

    return {libraryData, getData:handleDataFetch}
}