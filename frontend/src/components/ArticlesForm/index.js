import { useDispatch, useSelector } from "react-redux";
import { addArticles } from "../../store/articles";
import { useState } from "react";
import './articlesForm.css';

const ArticleForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [coverPhoto, setCoverPhoto] = useState('');

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newArticle = {
            userId: userId.id,
            title,
            body,
            coverPhoto
        };

        const response = await dispatch(addArticles(newArticle))
        if (response.message === "Success") reset()
    };

    const reset = () => {
        setTitle('');
        setBody('');
        setCoverPhoto('');
    }

    return (
        <div>
            <h1>Create Article</h1>
            <form onSubmit={handleSubmit}>
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
        </div>
    )
}

export default ArticleForm
