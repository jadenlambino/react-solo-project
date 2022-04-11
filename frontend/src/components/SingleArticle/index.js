import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";
import './singleArticle.css';

import { getSingleArticle } from '../../store/articles';
import { deleteArticles } from '../../store/articles';
import { editArticles } from '../../store/articles';
import CommentDisplay from '../CommentsDisplay';
import defaultPicture from '../../utils/picture/crime.jpeg'

const SingleArticle = () => {
    const { id } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const articles = useSelector(state => state.articleState.entries)
    const comments = useSelector(state => state.commentState.entries)
    const dispatch = useDispatch();
    const history = useHistory()

    const singleArticle = articles?.find(article => article.id === +id)

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
            history.push(`/articles/${singleArticle.id}`);
        }
    }

    let editOrDelete;
    editOrDelete = (
        <>
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


    return (
        <div className='single-article-container'>
            {singleArticle && (
               <div className='sing-art-display'>
                   {/* <NavLink to='/articles'>Home</NavLink> */}
                   <h1 className='sing-title'>{singleArticle.title}</h1>
                   <div className='sing-content'>
                        <img
                        src={singleArticle.coverPhoto.length ? singleArticle.coverPhoto : defaultPicture}
                        alt={singleArticle.title}
                        className='sing-pic'
                        />
                        <p className='sing-body'>
                            {singleArticle?.body}
                        </p>
                   </div>
               </div>
            )}
            {sessionUser.id === singleArticle.userId && editOrDelete}
            <CommentDisplay />
        </div>
    )
}

export default SingleArticle
