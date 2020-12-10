import React from 'react'

function MarsPic({dataArray}) {

  return (
    <div className="marsProject">
      <img src={dataArray.img_src} alt={dataArray.camera.id} />
      <p>{dataArray.rover.name}</p>
      <p>{dataArray.earth_date}</p>
    </div>
  )
}

export default MarsPic
