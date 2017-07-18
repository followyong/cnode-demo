import React from 'react'
import {Spin,Avatar} from 'antd'
import {Link} from 'react-router-dom'
import {url} from '../config'

class ShowTopics extends React.Component{
  constructor(){
    super()
    this.state={
      tabs:{
        ask:"问答",
        share:"分享",
        job:"招聘"
      }
    }
  }
  render(){
    console.log(this.props.data)
    let {data}=this.props
    let {tabs} =this.state
    return(
      <div className="topics">
        {
          data.length===0 ?
          <div style={{textAlign:"center"}}>
            <Spin size="large" />
          </div>
          :
          data.map(item =>(
            <div key={item.id} className="topic">
              <Link to={`/user/${item.author.loginname}`}><Avatar size="large" src={item.author.avatar_url} className="img"/></Link>
              <div className="title">
                <h3><Link to={`/topic/${item.id}`}>{item.title}</Link></h3>
                <span className="tab">
                  {
                  item.top ? "置顶" :
                  item.good ? "精华" :
                  tabs[item.tab]
                  }
                </span>
                &nbsp;&nbsp;
                <span><strong>回复量：{item.reply_count}</strong></span>
                &nbsp;&nbsp;
                <span><strong>访问量：{item.visit_count}</strong></span>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default ShowTopics
