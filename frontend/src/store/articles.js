const GRAB = '/articles/GRAB'

const grab = articles => ({
    type: GRAB,
    articles
})

export const getArticles = () => async dispatch => {
    const response = await fetch ('/api/articles');

    if (response.ok) {
        const articles = await response.json();
        dispatch(grab(articles))
    }
}

const initialState = {
    entries: []
}

export default function articlesReducer(state = initialState, action) {
    switch (action.type) {
        case GRAB:
            return { ...state, entries: [...action.articles]};
        default:
            return state;
    }
}
