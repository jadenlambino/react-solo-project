import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import './commentDisplay.css'

import { getComments } from "../../store/comments";
import CommentForm from "../CommentForm";
import { useParams } from "react-router-dom";
import { deleteComment } from "../../store/comments";

const CommentDisplay = () => {
    const {id} = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const articles = useSelector(state => state.articleState.entries)
    const singleArticle = articles?.find(article => article.id === +id)
    const comments = useSelector(state => state.commentState.entries)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getComments())
    }, [dispatch])

    const deleteIt = (id) => {
        dispatch(deleteComment(id))
    }

    // let editOrDelete;
    // editOrDelete = (

    // )

    return (
        <div className="comment-display">
            <ul>
                {comments?.map((comment) => {
                    if (comment.articleId === singleArticle.id) {
                        return (
                            <>
                                <li key={comment.id}>{comment.body}</li>
                                {sessionUser.id === comment.userId && (
                                    <>
                                      <button className='delete-comment' onClick={() => deleteIt(comment.id)}>Delete</button>
                                    </>
                            )}
                            </>
                            )
                    } else return
                    })}
            </ul>
            <CommentForm />
        </div>
    )
}

export default CommentDisplay
