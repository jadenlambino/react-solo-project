import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from "react";
import './singleArticle.css';

import { deleteArticles } from '../../store/articles';
import { editArticles } from '../../store/articles';

const SingleArticle = () => {
    const { id } = useParams();
    const articles = useSelector(state => state.articleState.entries)
    const dispatch = useDispatch();
    const history = useHistory()

    const singleArticle = articles.find(article => article.id === +id)

    const [title, setTitle] = useState(singleArticle.title);
    const [body, setBody] = useState(singleArticle.body);
    const [coverPhoto, setCoverPhoto] = useState(singleArticle.coverPhoto);
    const [errors, setErrors] = useState([])

    const deleteRedirect = () => {
        dispatch(deleteArticles(singleArticle.id))
        history.push('/articles')
    }

    const editMode = async (e) => {
        e.preventDefault();

        const editedBody = {
            title,
            body,
            coverPhoto
        }

        const response = await dispatch(editArticles(editedBody, id))
        if (response) {
            console.log('swag')
        }
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
            <form onSubmit={editMode}>
                <ul>
                    {errors.map((error, idx) =>
                        <li key={idx}>{error}</li>
                        )}
                    </ul>
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder='Title'
                        name='title'
                    />
                    <input
                        type='textarea'
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                        placeholder='Body'
                        name='Body'
                    />
                    <input
                        type='text'
                        onChange={(e) => setCoverPhoto(e.target.value)}
                        value={coverPhoto}
                        placeholder='Photo Url Goes Here!'
                        name='coverPhoto'
                    />
                    <button type='submit'>Publish</button>
            </form>
        </>
    )
}

export default SingleArticle
