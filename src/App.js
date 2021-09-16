import { useEffect, useState } from 'react';
import './App.scss';
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

  useEffect(() => {
    if (directionPriseFilter === "smaller") {
      console.log(directionPriseFilter);
      setArrayItems(arrayItems.sort((a, b) => a.count - b.count))
      console.log(arrayItems)
    } else if (directionPriseFilter === "larger") {
      console.log(directionPriseFilter);
      setArrayItems(arrayItems.sort((a, b) => b.count - a.count))
      console.log(arrayItems)
    }
  }, [changeDirectionPrise])

  useEffect(() => {
    dataApi.getData()
      .then((body) => {
        setArrayItems(body)
      })
  }, [popup, !popup])

  useEffect(() => {
    dataApi.getData()
      .then((body) => {
        setArrayItems(body)
      })
  }, [])

  return (
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
          {wordFilter.length ?
            filterArray.length ?
              filterArray.map(el => <Item
                key={el}
                imageUrl={el.imageUrl}
                name={el.name}
                count={el.count}
                description={el.description} />) :
              <div className="not-items">
                Not found
              </div> :
            arrayItems.map(el => <Item
              key={el}
              imageUrl={el.imageUrl}
              name={el.name}
              count={el.count}
              description={el.description} />)
          }
        </main>
      </div>
    </div>
  );
}

export default App;
