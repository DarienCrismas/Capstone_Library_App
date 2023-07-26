import { createSlice } from "@reduxjs/toolkit";


export interface BookState {
    cover: string;
    title: string;
    author: string;
    key: string;
    description: string;
    first_published: string;
    status: string;
    owned: string;
    user_score: string;
    user_notes: string;
};


const initialState: BookState = {
    cover: "",
    title: "",
    author: "",
    key: "",
    description: "",
    first_published: "",
    status: "",
    owned: "",
    user_score: "",
    user_notes: "",
};

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseCover: (state, action) => { state.cover = action.payload },
        chooseTitle: (state, action) => { state.title = action.payload },
        chooseAuthor: (state, action) => { state.author = action.payload },
        chooseKey: (state, action) => { state.key = action.payload },
        chooseDescription: (state, action) => { state.description = action.payload },
        chooseFirstPublished: (state, action) => { state.first_published = action.payload },
        chooseStatus: (state, action) => { state.status = action.payload },
        chooseOwned: (state, action) => { state.owned = action.payload },
        chooseUserScore: (state, action) => { state.user_score = action.payload },
        chooseUserNotes: (state, action) => { state.user_notes = action.payload }
    }
});


export const reducer = rootSlice.reducer;
console.log(rootSlice)
export const {
    chooseCover,
    chooseTitle,
    chooseAuthor,
    chooseKey,
    chooseDescription,
    chooseFirstPublished,
    chooseStatus,
    chooseOwned,
    chooseUserScore,
    chooseUserNotes
} = rootSlice.actions;