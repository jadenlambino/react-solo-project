import { useDispatch, useSelector } from "react-redux";
import { addArticles } from "../../store/articles";
import { useState } from "react";
import './articlesForm.css';
import { useHistory } from "react-router-dom";

const ArticleForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [coverPhoto, setCoverPhoto] = useState('');
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch();
    const history = useHistory();
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
        // console.log(response)
        if (response.id) {

            history.push(`/articles/${response.id}`)
        }
    };

    return (
        <div className="articles-form-container">
            <h1>Create Article</h1>
            <form onSubmit={handleSubmit}>
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
        </div>
    )
}

export default ArticleForm
