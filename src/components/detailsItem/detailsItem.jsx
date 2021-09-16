
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import QueryService from "../../services/getApi";
import "./detailsItem.scss"
import Comment from './../comment/comment';

function DetailsItem({ id, imageUrl, name, count, color, size, weight, description }) {
    const dataApi = new QueryService();
    const [comments, setComments] = useState([])

    useEffect(() => {

        dataApi.getComments(id)
            .then((body) => {
                setComments(body)
            })
    }, [])

    return (
        <div className="detail-item">
            <div className="detail-item-img">
                <img src={imageUrl} alt="" />
            </div>
            <div className="detail-item-description">
                <h3>{name}</h3>
                <div className="item-description">
                    Description: <span>{description}</span>
                </div>
                <div className="item-properties">
                    Properties:
                    <ul>
                        <ol className="pieces"><span>{count}</span> pieces.</ol>
                        <ol className="color-item">Color: {color}.</ol>
                        <ol className="size-item">Size: {size} sm.</ol>
                        <ol>Weight: {weight} kg.</ol>
                    </ul>
                </div>
                <div className="comments-wrapper">
                    All reviews:
                    <hr />
                    <div className="comments">

                        {
                            comments.map((el, index) => <Comment
                                key={el}
                                description={el.description}
                                numberComent={index + 1}
                                date={el.date} />)
                        }                    </div>
                </div>
            </div>




        </div>
    )
}

export default DetailsItem;