import React, {useEffect, useState} from "react";
import "./App.css";
import axios from 'axios'
import MarsPic from './components/MarsPic'

const api_key = '0avHIUOCDyO6rN1DkHeZyEFkaO2LSLwPMewn3Bbb'
const base_url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`

function App() {
  const [data,setData] = useState(null)
  const [deDate, setDeDate] = useState('')
  const [marsData, setMarsData] = useState([])
  const [pageNumber, setPageNumber] = useState(2)

  // initial start launching daily NASA info
  useEffect(() => {

    const fetchData = () => {

      axios.get(base_url)
        .then(res => setData(res.data))
        .catch(err => console.log(err))

    }

    fetchData()

  },[])
  // Chaning NASA info from user selecting a date
  useEffect(() => {
    axios.get(`${base_url}${deDate}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  },[deDate])

  const dateValue = (e) => {
    const date = `&date=${e.target.value}`
    setDeDate(date)
  }



  axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${pageNumber}&api_key=${api_key}`)
      .then(res => setMarsData(res.data.photos))
      .catch(err => console.log(err))


  const nextBtn = () => {
    // e.preventDefault()
    setPageNumber(pageNumber + 1)
    console.log(pageNumber)
  }

  const prevBtn = () => {
    // e.preventDefault()

    if(pageNumber > 1 || !1){
      setPageNumber(pageNumber - 1)

    }
  }


  return (
    <div className="App">

      <div className="card">

        <div className="imgContainer">
          <img src={data && data.hdurl} alt="picture" />
        </div>

        <div className="cardContent">
            <h1>{data && data.title}</h1>
            <p>
              {data && data.explanation}
            </p>
        </div>

        <input type="date" onChange={dateValue} />

      </div>

      <div className="marsCard">

        <header>
          <h2>The mars project</h2>
          <p>title goes here</p>
        </header>
        <div>
          <button onClick={prevBtn}>prev</button>
          <span>{pageNumber}</span>
          <button onClick={nextBtn}>Next</button>
          <div className="marsPhotos">
            {
              marsData.map(marsArr => {
                return <MarsPic dataArray={marsArr} />
              })
            }
          </div>
        </div>

      </div>


    </div>
  );
}

export default App;
