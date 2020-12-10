import React, {useEffect, useState} from "react";
import "./App.css";
import axios from 'axios'

function App() {
  const [data,setData] = useState(null)

  useEffect(() => {

    const fetchData = () => {

      axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2012-03-14')
        .then(res => setData(res.data))
        .catch(err => console.log(err))

    }

    fetchData()

  },[])


  console.log(data)

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
      </div>


    </div>
  );
}

export default App;
