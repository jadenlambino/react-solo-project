import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './articles.css'
import defaultPicture from '../../utils/picture/crime.jpeg'

import { getArticles } from '../../store/articles';

function ArticlesDisplay() {
    const dispatch = useDispatch();
    const articles = useSelector(state => state.articleState.entries)
    const sessionUser = useSelector(state => state.session.user);
    //console.log(articles)
    useEffect(() => {
        dispatch(getArticles())
    }, [dispatch])
    const history = useHistory();

    const stringCutter = (text) => {
        const count = 100
        let res = text.slice(0, count) + (text.length > count ? '' : '');
        return res
    }

    history.push('/articles')

    let loggedIn
    if (!sessionUser) {
        loggedIn = (
            <ul>
                {articles?.map(({ id , title}) => (
                    <li key={id}>
                        <NavLink to={`/signup`}>{title}</NavLink>
                    </li>
                ))}
            </ul>
        )
    } else {
        loggedIn = (
            <>
                <NavLink to={'/articles/new'} className='art-post'>New Post</NavLink>
                <ul className='art-list'>
                    {articles?.map(({ id , title, coverPhoto, body}) => (
                        <li className='art-list-items' key={id}>
                            <div className='single-container'>
                                <img className='articleImage' src={!coverPhoto.length ? defaultPicture: `${coverPhoto}`}></img>
                                <div className='art-content'>
                                    <NavLink className='art-link' to={`/articles/${id}`}>{title}</NavLink>
                                    <p className='art-preview'>{stringCutter(body)}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                 </ul>
            </>
        )
    }

    return (
        <div className='articles-container'>
            <h1 className='title'>New Articles</h1>
            <div className='display-container'>
                {loggedIn}
            </div>
        </div>
    )
}

export default ArticlesDisplay
