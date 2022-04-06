import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './ArticleEditorForm.css';

import { editArticles } from '../../store/articles';

export default function ArticleEditor() {
    const { id } = useParams();
    const articles = useSelector(state => state.articleState.entries);

    const dispatch = useDispatch();
    const history = useHistory()

    const singleArticle = articles.find(article => article.id === +id)

    const [title, setTitle] = useState(singleArticle.title);
    const [body, setBody] = useState(singleArticle.body);
    const [coverPhoto, setCoverPhoto] = useState(singleArticle.coverPhoto);
    const [errors, setErrors] = useState([])

    const editMode = async (e) => {
        e.preventDefault();

        const editedBody = {
            title,
            body,
            coverPhoto
        }

        const response = await dispatch(editArticles(editedBody, id))
        if (response) {
            history.push(`/articles/${id}`)
        }
    }

    return (
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
    )
}
