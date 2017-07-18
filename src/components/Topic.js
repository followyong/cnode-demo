import React from 'react'
import {url} from '../config'
import {message,Spin,BackTop,Input,Button,Avatar,Icon,Modal,Card} from 'antd'
import axios from 'axios'
import moment from 'moment';
import {Link} from 'react-router-dom'

class Topic extends React.Component{
  constructor(){
    super()
    this.state={
      data:null,
      comment:'',
      tabs:{
        ask:"问答",
        share:"分享",
        job:"招聘"
      },
      reply:'',
			visible: false,
			replyInfo: null,
      collect:false
    }
  }
  getData(){
    let id=this.props.match.params.id
    axios.get(`${url}/topic/${id}`)
    .then(res => {
      console.log(res)
      this.setState({data:res.data.data})
    })
    .catch(error => message.error('数据请求失败'))
  }
  componentDidMount(){
    this.getData()
  }
  handleComment(type){
    if(sessionStorage.accesstoken){
      var accesstoken=sessionStorage.accesstoken
    }else{
      message.error('请登录')
      return
    }
    if(type==='comment'){
      var content = this.state.comment;
    }else{
      var content = this.state.reply;
    }
    let id = this.state.data.id
    console.log(id)
    axios.post(`${url}/topic/${id}/replies`,{accesstoken,content})
    .then(res => {
      console.log(res)
      this.setState({comment: ''})
      this.getData()
      if (type==='reply') this.setState({visible: false});
    })
    .catch(err => message.error('评论失败'))
  }
  handleLike(reply_id){
    if(sessionStorage.accesstoken){
      var accesstoken=sessionStorage.accesstoken
    }else{
      message.error('请登录')
      return
    }
    axios.post(`${url}/reply/${reply_id}/ups`,{accesstoken})
    .then(res => console.log(res))
    .catch(err => message.error('点赞失败'))
  }
  handleReply(reply){
    this.setState({visible: true, replyInfo: reply, reply: `@${reply.author.loginname} `})
  }
  handleCollect(topic_id){
    if(sessionStorage.accesstoken){
      var accesstoken=sessionStorage.accesstoken
    }else{
      message.error('请登录')
      return
    }
    let {collect} = this.state
    if(!collect){
      axios.post(`${url}/topic_collect/collect`,{accesstoken,topic_id})
      .then(res => {
        console.log(res)
        this.setState({collect:true})
      })
      .catch(err => message.error('收藏失败'))
    }else{
      axios.post(`${url}/topic_collect/de_collect`,{accesstoken,topic_id})
      .then(res => {
        console.log(res)
        this.setState({collect:false})
      })
      .catch(err => message.error('取消收藏失败'))
    }
  }
  render(){
    let {data,tabs,comment,reply,visible,replyInfo,collect} =this.state
    return(
      <div style={{padding:'10px'}}>
        <Card>
          {
            data ? (
              <div className="content">
                <div className="titleBar">
                  <span className="tab">
                    {
                    data.top ? "置顶" :
                    data.good ? "精华" :
                    tabs[data.tab]
                    }
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <h2>{data.title}</h2>
                </div>
                <p className="author">
                  <strong>
                    ·发布于{moment(data.create_at).fromNow()}&nbsp;&nbsp;
                    ·作者{data.author.loginname}&nbsp;&nbsp;
                    ·来自 {tabs[data.tab]}
                  </strong>
                </p>
                <Button type="primary" onClick={this.handleCollect.bind(this,data.id)}>{collect ? "取消收藏" : "收藏"}</Button>
                <div dangerouslySetInnerHTML={{__html: data.content}} className="substance" />
                <div className="reply">
                  <h3>添加回复</h3>
                  <Input type="textarea" value={comment} onChange={e=>this.setState({comment: e.target.value})} />
                  <Button type="primary" onClick={this.handleComment.bind(this,'comment')}>回复</Button>
                  <h3>全部回复</h3>
                  {
                    data.replies.map(item =>(
                      <div key={item.id} className="comments">
                        <div className="comments-top">
                          <Link to={`/user/${item.author.loginname}`}>
                            <Avatar src={item.author.avatar_url} shape="square" size="large"/>
                          </Link>
                          <span ><strong>{item.author.loginname}</strong>· {moment(item.create_at).fromNow()}</span>
                          <span style={{fontSize:"14px",color:'red'}}>
                            <Icon type="like-o" onClick={this.handleLike.bind(this,item.id)}/>&nbsp;&nbsp;&nbsp;
                            <Icon type="edit" onClick={this.handleReply.bind(this,item)} />
                          </span>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: item.content}}  className="comments-bottom"/>
                      </div>
                    ))
                  }
                </div>
              </div>
            ) :
            <div style={{textAlign:'center'}}><Spin size="large" /></div>
          }
          <BackTop style={{position:'fixed',left:'20px'}}/>
        </Card>
        <Modal
          title={replyInfo? `回复：${replyInfo.author.loginname}` : '回复：'}
          visible={visible}
          onOk={this.handleComment.bind(this,'reply')}
          onCancel={()=>this.setState({visible: false})}
        >
          <Input type="textarea" rows={4} value={reply} onChange={e=>this.setState({reply: e.target.value})} ref={input=> this.input = input}/>
        </Modal>
      </div>
    )
  }
}

export default Topic
