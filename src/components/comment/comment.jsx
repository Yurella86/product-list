import "./comment.scss"

function Comment({ description, numberComent, date }) {
    return (
        <div className="comment-box">
            <div className="header-comment">
                <div className="date">{date}</div>
            </div>
            <div className="coment-description">
                <span>{numberComent}. </span>{description}
            </div>
        </div>
    )
}

export default Comment;