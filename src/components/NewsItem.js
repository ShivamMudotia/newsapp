//rce

import React from 'react'

const NewsItem = (props) => {

    let {title, description , imageUrl, newsUrl, author, time, source} = props
    return (
      <div className='my-3'>
            <div className="card">
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left: '30%', zIndex: '1'}}>{source}</span>
                <img src={!imageUrl?'https://images.livemint.com/img/2022/04/15/600x338/OnePlus_10R_1650012854721_1650012855104.png':imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                       <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(time).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More..</a>
                </div> 
            </div>
      </div>
    )
}

export default NewsItem