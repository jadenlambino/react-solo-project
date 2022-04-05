const GRAB = '/articles/GRAB'

const grab = list => ({
    type: GRAB,
    list
})

export const getArticles = () => async dispatch => {
    const response = await fetch ('/api/articles');

    if (response.ok) {
        const list = await response.json();
        dispatch(grab(list))
    }
}

const initialState = {
    list: []
}

export default function articlesReducer(state = initialState, action) {
    switch (action.type) {
        case GRAB:
            const allArticles = {};
            action.list.forEach(article => {
                allArticles[article.id] = article
            });
            return {
                ...allArticles,
                ...state,
                list: action.list
            }

        default:
            break;
    }
}
