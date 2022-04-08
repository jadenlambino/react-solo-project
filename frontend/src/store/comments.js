import { csrfFetch } from "./csrf"

const GRAB = '/comments/GRAB'
const ADD = '/comments/DEL'
const DEL = '/comments/DEL'

const grab = comments => ({
    type: GRAB,
    comments
})

const add = comments => ({
    type: ADD,
    comments
})

const del = comments => ({
    type: DEL,
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

export const deleteComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const { id: deletedCommentId } = await response.json();
        dispatch(del(deletedCommentId));
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
        case DEL:
            const newState = {...state}
            delete newState[action.commentId]
            return {newState}
        default:
            return {state}
    }
}

export default commentsReducer
