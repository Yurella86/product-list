import { NavLink } from "react-router-dom";
import "./item.scss"

function Item({ id, imageUrl, name, count, description, callbackIdItem }) {
    return (
        <div className="item">

            <div className="item-img">
                <img src={imageUrl} alt="" />
            </div>

            <div className="item-description">
                <h3>{name}</h3>
                <div className="pieces">
                    <span>{count}</span> pieces
                </div>
                <div className="description">
                    Description: <span>{description}</span>
                </div>
                <button className="button-item" >
                    <NavLink to={`/product/${id}`} onClick={() => callbackIdItem(id)}>Details</NavLink>
                </button>
            </div>




        </div>
    )
}

export default Item;