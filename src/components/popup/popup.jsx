import { useState } from "react";
import QueryService from "../../services/getApi";
import "./popup.scss"

function Popup({ closePopup }) {

    const dataApi = new QueryService();
    const [newItem, setNewItem] = useState({
        imageUrl: null,
        name: null,
        count: null,
        size: null,
        weight: null,
        description: null,
    })

    function addNewItem(e) {
        e.preventDefault();
        dataApi.postData(newItem)
    }

    function handlerChangeNewObject(el) {
        setNewItem({ [el.target.name]: el.target.value })
    }

    return (
        <div className="popup-wrapper">
            <header>
                <span onClick={closePopup()}>x</span>
            </header>
            <form onSubmit={addNewItem}>
                <div>
                    <input
                        type='text'
                        name="name"
                        value={newItem.name}
                        placeholder="Name"
                        onChange={handlerChangeNewObject} />
                </div>
                <div>
                    <input type="number" name="count" value={newItem.count} placeholder="Count"
                        onChange={handlerChangeNewObject} />
                </div>
                <div>
                    <input type="number" name="size" value={newItem.size} placeholder="Size"
                        onChange={handlerChangeNewObject} />
                </div>
                <div>
                    <textarea name="description" rows="5" cols="40" value={newItem.description} placeholder="description"
                        onChange={handlerChangeNewObject} ></textarea>
                </div>
                <div>
                    <input type="file" id="photo" name="imageUrl" value={newItem.imageUrl}
                        onChange={handlerChangeNewObject} />
                </div>
                <div className="buttons">
                    <button type="submit" onClick={closePopup()}>Add</button>
                    <button>Cancle</button>
                </div>
            </form>
        </div>
    )
}

export default Popup;