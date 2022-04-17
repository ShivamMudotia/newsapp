//rce

import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    // document.title=`Daily News - ${capitalizeFirstLetter(props.category)}`;


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updateNews = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false)

    }

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };

    return (
        <>
            <h2 className="text-center" style={{ margin: '30px', marginTop: '70px' }}>Daily News - Top {capitalizeFirstLetter(props.category)}  Headlines</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>

                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <NewsItem title={element.title ? element.title : " "} description={element.description ? element.description : " "} newsUrl={element.url}
                                    imageUrl={element.urlToImage} author={element.author} time={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}


News.defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
    apikey: "170ccfe47e0c4d4c8c52ee71e3d19dc7",
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apikey: PropTypes.string,
}
export default News