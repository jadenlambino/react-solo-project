import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { getArticles } from '../../store/articles';

function ArticlesDisplay() {
    const dispatch = useDispatch();
    const articles = useSelector(state => state.articleState.entries)
    //console.log(articles)
    useEffect(() => {
        dispatch(getArticles())
    }, [dispatch])
    const history = useHistory();

    history.push('/articles')

    return (
        <div>
            <h1>New Articles</h1>
            <ul>
                {articles?.map(({ id , title}) => (
                    <li key={id}>
                        <NavLink to={`/articles/${id}`}>{title}</NavLink>
                    </li>
                ))}
            </ul>
            <NavLink to={'/articles/new'}>New Post</NavLink>
        </div>
    )
}

export default ArticlesDisplay
