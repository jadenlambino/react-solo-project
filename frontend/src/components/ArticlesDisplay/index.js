import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './articles.css'

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
                <ul>
                    {articles?.map(({ id , title}) => (
                        <li key={id}>
                            <NavLink to={`/articles/${id}`}>{title}</NavLink>
                        </li>
                    ))}
                 </ul>
                <NavLink to={'/articles/new'}>New Post</NavLink>
            </>
        )
    }

    return (
        <div className='articles-container'>
            <h1>New Articles</h1>
            {loggedIn}
        </div>
    )
}

export default ArticlesDisplay
