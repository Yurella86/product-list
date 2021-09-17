import { NavLink } from "react-router-dom";
import QueryService from "../../services/getApi";
import "./item.scss"

function Item({ id, imageUrl, name, count, description, callbackIdItem, callbackdelItem }) {



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
                <div className="buttons">
                    <button className="button-item" >
                        <NavLink to={`/product/${id}`} onClick={() => callbackIdItem(id)}>Details</NavLink>
                    </button>
                    <button className="button-item" onClick={() => callbackdelItem(id)} >
                        Delete
                    </button>
                </div>

            </div>




        </div>
    )
}

export default Item;