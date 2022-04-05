import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getArticles } from '../../store/articles';

function ArticlesDisplay() {
    const dispatch = useDispatch();
    const articles = useSelector(state => state.articleState.entries)
    //console.log(articles)
    useEffect(() => {
        dispatch(getArticles())
    }, [dispatch])

    return (
        <div>
            <h1>New Articles</h1>
            <ul>
                {articles?.map(({ id , title}) => (
                    <li key='id'>{title}</li>
                ))}
            </ul>
        </div>
    )
}

export default ArticlesDisplay
