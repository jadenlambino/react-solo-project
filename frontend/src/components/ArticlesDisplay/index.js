import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch, Route } from 'react-router-dom';
import SingleArticle from '../SingleArticle';
import './articles.css'

import { getArticles } from '../../store/articles';

function ArticlesDisplay() {
    const dispatch = useDispatch();
    const articles = useSelector(state => state.articleState.entries)
    //console.log(articles)
    useEffect(() => {
        dispatch(getArticles())
    }, [dispatch])

    const [hidden, setHidden] = useState(false);

    const hideArticles = () => setHidden(!hidden)

    return (
        <div>
            <h1 className={`swag ${hidden ? 'hidden': 'show'}`}>All Articles</h1>
            <ul className={`cool ${hidden ? 'hidden': 'show'}`}>
                {articles?.map(({ id , title}) => (
                    <li key={id}>
                        <NavLink to={`/articles/${id}`} onClick={hideArticles}>{title}</NavLink>
                    </li>
                ))}
            </ul>

            <Switch>
                    <Route path='/articles/:id' exact>
                        <SingleArticle articles={articles}/>
                    </Route>
            </Switch>
        </div>

    )
}

export default ArticlesDisplay
