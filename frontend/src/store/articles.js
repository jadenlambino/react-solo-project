import { csrfFetch } from "./csrf";

const GRAB = '/articles/GRAB'
const ADD = '/articles/ADD'
const DEL = '/articles/DEL'
const EDIT ='/articles/EDIT'

const grab = articles => ({
    type: GRAB,
    articles
})

const add = articles => ({
    type: ADD,
    articles
})

const del = articles => ({
    type: DEL,
    articles
})

const edit = articles => ({
    type: EDIT,
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
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const article = await response.json();
        dispatch(add(article));
        return article
    } else {
        const error = await response.json()
        Promise.reject(error.errors).then(console.log('hello'));
    }
}

export const deleteArticles = (articleId) => async dispatch => {
    const response = await csrfFetch (`/api/articles/${articleId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const { id: deletedArticleId } = await response.json();
        dispatch(del(deletedArticleId));
        return deletedArticleId
    }
}

export const editArticles = (payload, articleId) => async dispatch => {
    const response = await csrfFetch(`/api/articles/${articleId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        let article = await response.json;
        dispatch(edit(article))
        return article
    }
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
        case DEL:
            const newState = {...state}
            delete newState[action.itemId]
            return newState
        default:
            return state;
    }
}
