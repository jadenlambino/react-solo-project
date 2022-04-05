import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './singleArticle.css';

import { deleteArticles } from '../../store/articles';

const SingleArticle = () => {
    const { id } = useParams();
    const articles = useSelector(state => state.articleState.entries)
    const dispatch = useDispatch();
    const history = useHistory()

    const singleArticle = articles.find(article => article.id === +id)

    const deleteRedirect = () => {
        dispatch(deleteArticles(singleArticle.id))
        history.push('/articles')
    }

    return (
        <>
            {singleArticle && (
               <div>
                   <h1>{singleArticle.title}</h1>
                   <img
                    src={singleArticle.coverPhoto}
                    alt={singleArticle.title}
                    />
                    <p>
                        {singleArticle?.body}
                    </p>
               </div>
            )}
            <button onClick={deleteRedirect}>Delete</button>
        </>
    )
}

export default SingleArticle
