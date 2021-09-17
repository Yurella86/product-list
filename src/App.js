import { useEffect, useState } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import DetailsItem from './components/detailsItem/detailsItem';
import Item from './components/Item/Item';
import Popup from './components/popup/popup';
import QueryService from './services/getApi';

function App() {
  const dataApi = new QueryService();

  const [arrayItems, setArrayItems] = useState([])
  const [wordFilter, setWordFilter] = useState('')
  const [directionPriseFilter, setDirectionPriseFilter] = useState('')
  const [filterArray, setFilterArray] = useState([])
  const [popup, setPopup] = useState(false)
  const [idItemOpen, setIdItemOpen] = useState()

  function sortByName(word) {
    setWordFilter(word)
    const sortArrayByName = arrayItems.filter((el) => {
      return el.name.toUpperCase().slice(0, word.length) === word.toUpperCase()
    })
    if (word) {
      setFilterArray(sortArrayByName)
    } else {
      return setFilterArray('')
    }
  }

  function changeDirectionPrise(el) {
    setDirectionPriseFilter(el)
  }

  function OpenClosePopup() {
    setPopup(!popup)
  }

  function delItem(id) {
    dataApi.deleteItem(id)
    setArrayItems(arrayItems.filter((el) => el.id !== id))
  }

  useEffect(() => {
    if (directionPriseFilter === "smaller") {
      console.log(directionPriseFilter);
      setArrayItems(arrayItems.sort((a, b) => a.count - b.count))
    } else if (directionPriseFilter === "larger") {
      console.log(directionPriseFilter);
      setArrayItems(arrayItems.sort((a, b) => b.count - a.count))
    }
  }, [changeDirectionPrise])

  useEffect(() => {
    dataApi.getData()
      .then((body) => {
        setArrayItems(body)
      })
  }, [popup])

  useEffect(() => {
    dataApi.getData()
      .then((body) => {
        setArrayItems(body)
      })
  }, [])

  return (
    <BrowserRouter>
      <div>
        <div className={`popup ${popup}`}>
          <Popup
            closePopup={() => OpenClosePopup} />
        </div>
        <div className="wrapper-products">
          <header>
            <div>
              <label for="name" >Sort by name</label>
              <input
                type="text"
                id="name"
                name="filterBy"
                value={wordFilter}
                onChange={(el) => sortByName(el.target.value)} />
            </div>
            <div>
              <select onChange={(el) => changeDirectionPrise(el.target.value)}>
                <option disabled selected hidden>sorting by sum product</option>
                <option value="larger">smaller to larger</option>
                <option value="smaller" >larger to smaller</option>
              </select>
            </div>
            <div>
              <button type="button" onClick={OpenClosePopup}>
                New Product
              </button>
            </div>
          </header>
          <main>
            <Route exact path="/">
              <div className="items">
                {wordFilter.length ?
                  filterArray.length ?
                    filterArray.map(el => <Item
                      key={el}
                      id={el.id}
                      imageUrl={el.imageUrl}
                      name={el.name}
                      count={el.count}
                      description={el.description}
                      callbackIdItem={(id) => setIdItemOpen(id)}
                      callbackdelItem={(id) => delItem(id)} />) :
                    <div className="not-items">
                      Not found
                    </div> :
                  arrayItems.map(el => <Item
                    key={el}
                    id={el.id}
                    imageUrl={el.imageUrl}
                    name={el.name}
                    count={el.count}
                    description={el.description}
                    callbackIdItem={(id) => setIdItemOpen(id)}
                    callbackdelItem={(id) => delItem(id)} />)
                }
              </div>
            </Route>
            <Route path={`/product/${idItemOpen}`}>
              <div className="item-details">
                {idItemOpen ?
                  arrayItems.filter(el => el.id === idItemOpen)
                    .map((el) => <DetailsItem
                      id={el.id}
                      imageUrl={el.imageUrl}
                      name={el.name}
                      count={el.count}
                      color={el.color}
                      size={el.size}
                      weight={el.weight}
                      description={el.description}
                    />
                    ) : null}
              </div>
            </Route>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
