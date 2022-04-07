import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ArticleEditorModal from '../ArticleEditorModal';
import { useState, useEffect } from "react";
import './singleArticle.css';

import { getSingleArticle } from '../../store/articles';
import { deleteArticles } from '../../store/articles';

const SingleArticle = ( {articles} ) => {
    const { id } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory()

    const singleArticle = articles?.find(article => article.id === +id)

    const deleteRedirect = () => {
        dispatch(deleteArticles(singleArticle.id))
        history.push('/articles')
    }

    let editDeleteButtons;
    if (singleArticle.userId === sessionUser.id) {
        editDeleteButtons = (
            <>
                <ArticleEditorModal />
                <button onClick={deleteRedirect}>Delete</button>
            </>
        );
    }

    return (
        <>
            {singleArticle && (
               <div>
                   <NavLink to='/articles'>Home</NavLink>
                   <h1>{singleArticle.title}</h1>
                   <img
                    src={singleArticle.coverPhoto}
                    alt={singleArticle.title}
                    />
                    <p>
                        {singleArticle?.body}
                    </p>
                    {editDeleteButtons}
               </div>
            )}
        </>
    )
}

export default SingleArticle
