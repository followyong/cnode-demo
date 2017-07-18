import React from 'react'
import axios from 'axios'
import {url} from '../config'
import {Avatar,Button} from 'antd'
import {Link} from 'react-router-dom'


class Collect extends React.Component{
  constructor(){
    super()
    this.state={
      data:null,
      collect:true,
      visible:true,
      tabs:{
        ask:"问答",
        share:"分享",
        job:"招聘"
      }
    }
  }
  getData(){
    let loginname=this.props.match.params.loginname
    axios.get(`${url}/topic_collect/${loginname}`)
    .then(res => {
      console.log(res)
      this.setState({data:res.data.data})
    })
    .catch(err => alert('获取数据失败'))
  }
  componentDidMount(){
    this.getData()
  }
  render(){
    console.log(this.props)
    let {data,tabs,collect,visible} = this.state
    console.log(data)
    return(
      <div style={{padding:'10px'}}>
        <h1 >收藏的话题</h1>
        {
          data ?
            data.map(item =>(
              <div key={item.id} className="collects">
                  <Link to={`/user/${item.author.loginname}`}>
                    <Avatar src={item.author.avatar_url} size="large" />
                  </Link>
                  <div  className="collect">
                    <h3><Link to={`/topic/${item.id}`}>{item.title}</Link></h3><br/>
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
            )): null
          }
      </div>
    )
  }
}
export default Collect
