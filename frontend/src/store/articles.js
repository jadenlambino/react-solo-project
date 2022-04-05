import { csrfFetch } from "./csrf";

const GRAB = '/articles/GRAB'
const ADD = '/articles/ADD'

const grab = articles => ({
    type: GRAB,
    articles
})

const add = articles => ({
    type: ADD,
    articles
})

export const getArticles = () => async dispatch => {
    const response = await fetch ('/api/articles');

    if (response.ok) {
        const articles = await response.json();
        dispatch(grab(articles))
    }
}

export const addArticles = (payload) => async dispatch => {
    const response = await csrfFetch('/api/articles/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const article = await response.json();
        dispatch(add(article));
        // return article
    }
    // else {
    //     const error = await response.json();
    //     return Promise.reject(error.errors)
    // }
}

const initialState = {
    entries: []
}

export default function articlesReducer(state = initialState, action) {
    switch (action.type) {
        case GRAB:
            return { ...state, entries: [...action.articles]};
        case ADD:
            return { ...state, entries: [...state.entries, action.article]}
        default:
            return state;
    }
}
