import { createPath } from 'react-router'
import { commentCreate } from '../../services/dinners'
import './AllComments.css'
import { useState, useEffect } from 'react'


const AllComments = ({ dinnerId, comments }) => {
    //State variables
    const [newComment, setNewComment] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [allComments, setAllComments] = useState(comments)

    //Use Effect
    useEffect(() => {
        if (comments) {
            setAllComments(comments)
        }
    }, [comments])

    //Functions
    const handleCreateComment = async () => {
        setSuccessMsg('')
        setErrorMsg('')

        if (newComment.trim() === '') { return setErrorMsg('Comment cannot be empty') }
        try {
            const formData = { text: newComment }
            const commentResponse = await commentCreate(dinnerId, formData)
            setAllComments([...allComments, commentResponse.data])

            setNewComment('')
            setSuccessMsg('Thank you for sharing your thoughts')
        } catch (error) {
            setErrorMsg('Something went wrong when creating the comment')
        }
    }


    return (
        <>
            <div id="new-comment-box">
                <div id="make-comment-div">
                    <textarea
                        name=""
                        id="make-comment-area"
                        placeholder="Don't be shy, why did you really think?"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}

                    ></textarea>
                    <button className="action-button" id="make-comment-button" onClick={handleCreateComment}>Submit comment</button>
                </div>
                {errorMsg && <p className="error-message">{`${errorMsg}`}</p>}
                {successMsg && <p className="success-message">{`${successMsg}`}</p>}
            </div >
            <div id="comments-list-box">
                {allComments && allComments.length > 0 ? (
                    allComments.map((comment) => (

                        <div id="existing-comment-box" key={comment._id}>
                            <div id="comment-details">
                                <span>{comment.owner.username} </span>
                                <span>{new Date(comment.updatedAt).toLocaleString()}</span>
                            </div>
                            <p>{comment.text} </p>
                        </div>
                    )

                    )

                ) : (
                    <p>Be bold, be daring, leave the first comment!</p>
                )}

            </div>

        </>
    )
}
export default AllComments