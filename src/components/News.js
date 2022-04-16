//rce

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

import PropTypes from 'prop-types'

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

    
    constructor(props){
        super(props);
        this.state= {
            articles: [],
            loading: false,
            page: 1     
        }
        document.title= "Daily News - " + this.props.category
    }
  
    async updateNews(pageNo) {

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


    render() {
    return (
      <div className='container mx-3 my-3'>
          <h2 className="text-center" style={{margin: '30px'}}>Daily News - Top {this.props.category} Headlines</h2>
          {this.state.loading && <Spinner/>}
          <div className="row">
          {!this.state.loading && this.state.articles.map((element)=> {
              return <div className="col-md-3" key={element.url}>
              {/*<NewsItem  title={element.title?element.title.slice(0,45):" "} description={element.description?element.description.slice(0,100):" "} newsUrl ={element.url} */}
               <NewsItem  title={element.title?element.title:" "} description={element.description?element.description:" "} newsUrl ={element.url}
              imageUrl={element.urlToImage} author={element.author} time={element.publishedAt} source={element.source.name}/>
              </div>
          })}
          </div>
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={ this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
     </div>
    )
  }
}

export default News