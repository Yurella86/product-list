import "./item.scss"

function Item({ imageUrl, name, count, description }) {
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
                <button className="button-item">
                    Details
                </button>
            </div>




        </div>
    )
}

export default Item;