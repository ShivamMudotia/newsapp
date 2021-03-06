//rce

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner  from './Spinner';

import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 5,
        category: "general",
        apikey: "170ccfe47e0c4d4c8c52ee71e3d19dc7",
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apikey: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state= {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        }
        document.title=`Daily News - ${this.capitalizeFirstLetter(this.props.category)}`;
    }
  
    async updateNews() {

        const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})

    }
    
    async componentDidMount(){
        this.updateNews()
    }

    handlePrevClick =  async () => {
        
        // let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({loading: false});
 
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles
        //  })

        this.setState({page: this.state.page - 1})
        this.updateNews()

    }

    handleNextClick = async () => {

        // if (!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {

        //     let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page +1}&pageSize=${this.props.pageSize} `;
        //     this.setState({loading: true});
        //     let data = await fetch(url);
        //     let parsedData = await data.json()
        //     this.setState({loading: false});
            
     
        //     this.setState({
        //         page: this.state.page +1,
        //         articles: parsedData.articles
        //      })
        // }

        this.setState({page: this.state.page + 1})
        this.updateNews()
    }

    fetchMoreData = async () => {
        this.setState({page: this.state.page +1})
        const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles), 
            totalResults: parsedData.totalResults
            })
        };

    render() {
    return (
        <>
          <h2 className="text-center" style={{margin: '30px'}}>Daily News - Top {this.capitalizeFirstLetter(this.props.category)}  Headlines</h2>
          {this.state.loading && <Spinner />}
          {/*{this.state.loading && <Spinner/>} */}
          {/* https://codesandbox.io/s/yk7637p62z  -- Infinite Scrolling */}

          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}>
          
          <div className="container">
          <div className="row">
          {this.state.articles.map((element)=> {
              return <div className="col-md-3" key={element.url}>
              {/*<NewsItem  title={element.title?element.title.slice(0,45):" "} description={element.description?element.description.slice(0,100):" "} newsUrl ={element.url} */}
               <NewsItem  title={element.title?element.title:" "} description={element.description?element.description:" "} newsUrl ={element.url}
              imageUrl={element.urlToImage} author={element.author} time={element.publishedAt} source={element.source.name}/>
              </div>
          })}
          </div>
          </div>
          </InfiniteScroll>
          {/*<div className="container d-flex justify-content-between">
          <button disabled={this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={ this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
        </>
    )
  }
}

export default News