import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../store/comments";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

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
        // .catch( async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors)
        // })
        if (response.id) {
            reset()
        }
    }

    const reset = () => setBody('')

    return (
        <div className="comments-form-container">
            <h3>New Comment</h3>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) =>
                        <li key={idx}>{error}</li>
                    )}
                </ul>
                <input
                type='text'
                onChange={(e) => setBody(e.target.value)}
                value={body}
                placeholder="Comment Here!"
                name='title'
                />
                <button type='submit' onSubmit={() => handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default CommentForm
