import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getArticles } from '../../store/articles';

function articlesDisplay() {
    const dispatch = useDispatch();
    const { articlesId } = useParams();

    const article = useSelector(state => {
        return state.article.list.map(articlesId => state.article[articlesId])
    });
    useEffect(() => {
        dispatch(getArticles())
    }, [dispatch])

    if(!article) return null

    return (
        <>
            <div>
                does this work
            </div>
        </>
    )
}

export default articlesDisplay
