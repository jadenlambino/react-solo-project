const GRAB = '/comments/GRAB'
const ADD = '/comments/add'

const grab = comments => ({
    type: GRAB,
    comments
})

export const getComments = () => async dispatch => {
    const response = await fetch('/api/comments');

    if (response.ok) {
        const comments = await response.json()
        dispatch(grab(comments))
    }
}

let initialState = {
    entries: []
}

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GRAB:
            return {...state, entries: [...action.comments]}
        default:
            return {state}
    }
}

export default commentsReducer
