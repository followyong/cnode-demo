import React from 'react'
import {HashRouter,Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Topic from './components/Topic'
import User from './components/User'
import NewTopic from './components/NewTopic'
import Collect from './components/Collect'
import Message from './components/Message'

class App extends React.Component{
  render(){
    return(
      <HashRouter>
        <div>
          <Header />

          <Route path='/' exact component={Home} />
          <Route path='/topic/:id' component={Topic} />
          <Route path='/user/:loginname' exact component={User}/>
          <Route path='/newtopic' component={NewTopic} />
          <Route path='/topic_collect/:loginname' component={Collect} />
          <Route path='/message/count' component={Message} />

          <Footer />
        </div>
      </HashRouter>
    )
  }
}

export default App
