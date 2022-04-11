import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../store/comments";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import './CommentForm.css'

const CommentForm = () => {
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state) => state.session.user)
    const {id} = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = {
            userId: userId.id,
            articleId: id,
            body
        }

        const response = await dispatch(addComment(newComment))
        .catch( async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors)
        })
        if (response.id) {
            reset()
        }
    }

    const reset = () => setBody('')

    return (
        <div className="comments-form-container">
            {/* <h3 className="comm-form-title">New Comment</h3> */}
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) =>
                        <li key={idx}>{error}</li>
                    )}
                </ul>
                <label className="comm-form-label">
                    New Comment
                    <input
                    type='text'
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                    placeholder="Comment Here!"
                    name='title'
                    />
                </label>
                <button type='submit' className="comm-button">Submit</button>
            </form>
        </div>
    )
}

export default CommentForm
