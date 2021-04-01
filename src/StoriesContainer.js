import React, { Component } from 'react';
import axios from 'axios'
import  Story  from './Story'
class StoriesContainer extends Component {
  constructor(props) {
    
    super(props);
    
    this.state = {
      error: false,
      items: [],
      searchItem: "newstories",
      promises: [{}],
      base:'https://hacker-news.firebaseio.com/v0/',
      extension: ".json?print=pretty"
     };}
    
    componentDidMount() { 
   
      this.getData();
  
    
    
      
    }
    getData = () =>{
      axios
      .get(
       `${this.state.base}newstories.json`
          
          
      )
      .then(result => {console.log(result.data)
       const topStories = result.data;
       const promises = topStories.map(story => {
         return axios.get(`https://hacker-news.firebaseio.com/v0/item/${story}.json`).then(res => res.data)
       })
       Promise.all(promises).then(data => {
         console.log(data)
         this.setState({ promises: data })
       });
  })
  
    }
    
    componentWillUnmount = () => {
     
    };
    render() {
    
    let counter = 0;
    
    return (<div >
      
      {this.state.promises.length<200?<div className="loading"></div>: (<>
        
        <Story story={this.state.promises}/></> )}
      </div>
     );
     }
    }
 
export default StoriesContainer;
