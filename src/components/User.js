import React from 'react'
import axios from 'axios'
import {url} from '../config'
import {message,Spin,Card,BackTop} from 'antd'
import {Link} from 'react-router-dom'

class User extends React.Component{
  constructor(){
    super()
    this.state={
      user:null
    }
  }
  componentDidMount(){
    let loginname=this.props.match.params.loginname
    axios.get(`${url}/user/${loginname}`)
    .then(res => {
      console.log(res)
      this.setState({user:res.data.data})
    })
    .catch(error => message.error('数据请求失败'))
  }
  render(){
    console.log(this.props)
    let {user} = this.state
    console.log(user)
    return(
      <div style={{padding:'10px'}}>
        <Card >
          {
            user ?(
                <div className="userInfo">
                  <img className="ant-avatar"  src={user.avatar_url} alt={user.loginname} />
                  <h2>{user.loginname}</h2><br />
                  <h3>{user.score}积分</h3><br />
                  <Link to={`/topic_collect/${user.loginname}`}><h3>收藏的话题</h3></Link>
                  <h3>最近创建的话题</h3><br />
                  {
                    user.recent_topics.map(item =>(
                      <div key={item.id}  className="create">
                        <img src={item.author.avatar_url} alt={item.author.loginname}/>
                        <span>
                          <Link to={`/topic/${item.id}`}>{item.title}</Link>
                        </span>
                      </div>
                    ))
                  }
                  <h3>最近参与的话题</h3><br />
                  {
                    user.recent_replies.map(item =>(
                      <div key={item.id} className="join">
                        <img src={item.author.avatar_url} alt={item.author.loginname}/>
                        <span>
                          <Link to={`/topic/${item.id}`}>{item.title}</Link>
                        </span>
                      </div>
                    ))
                  }
                </div>
            ):
              <div style={{textAlign:'center'}}><Spin size="large" /></div>
          }
        </Card>
        <BackTop style={{position:'fixed',right:'20px'}}/>
      </div>
    )
  }
}

export default User
