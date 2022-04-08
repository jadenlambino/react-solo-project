import { csrfFetch } from "./csrf"

const GRAB = '/comments/GRAB'
const ADD = '/comments/add'

const grab = comments => ({
    type: GRAB,
    comments
})

const add = comments => ({
    type: ADD,
    comments
})

export const getComments = () => async dispatch => {
    const response = await fetch('/api/comments');

    if (response.ok) {
        const comments = await response.json()
        dispatch(grab(comments))
    }
}

export const addComment = (payload) => async dispatch => {
    const response = await csrfFetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const comment = await response.json()
        dispatch(add(comment))
        return comment
    }
}

let initialState = {
    entries: []
}

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GRAB:
            return {...state, entries: [...action.comments]}
        case ADD:
            return {...state, entries: [...state.entries, action.comments]}
        default:
            return {state}
    }
}

export default commentsReducer
