import React from 'react'
import axios from 'axios'

class NewTopic extends React.Component{
  constructor(){
    super()
    this.state={
      title:'',
      content:''
    }
  }
  handleSubmit(){
    let accesstoken = sessionStorage.accesstoken
    if(!accesstoken){
      alert('请先登录')
      return
    }
    let {title,content}=this.state
    let tab='dev'
    let data={accesstoken,title,content,tab}
    axios.post('https://cnodejs.org/api/v1/topics',data)
    .then(res =>{
      let id = res.data.topic_id
      this.props.history.push(`/topic/${id}`)
    })
    .catch(err => alert(err))
  }
  render(){
    let {title,content}=this.state
    return(
      <div>
        <h1>发布文章</h1>
        <label htmlFor='title'><h2>标题(大于10个字符)</h2></label><br/>
        <input style={{width:'100%',marginBottom:'50px'}} type='text' id='title' value={title} onChange={e =>
          this.setState({title:e.target.value})}/><br/>
        <label htmlFor="content"><h2>内容（支持markdown语法）</h2></label><br />
        <textarea style={{width:'100%',marginBottom:'50px'}} id='content' rows='10' value={content} onChange={e =>
        this.setState({content:e.target.value})}/><br/>
        <button onClick={this.handleSubmit.bind(this)}>发布</button>
      </div>
    )
  }
}

export default NewTopic
