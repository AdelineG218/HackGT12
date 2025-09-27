import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Post from './pages/Post'
import { Link } from 'react-router-dom'


const App = () => {

  let element = useRoutes([
    {
      path: "/",
      element:<Home />
    },
    {
      path:"/show/:id/edit",
      element: <EditPost />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path:"/show/:id",
      element: <Post />
    }
  ]);
  

  return ( 

    <div className="App">

      <div className="header">
        <h1>Crewmates</h1>
        <Link to="/"><button className="headerBtn"> Explore Crewmates 🔍  </button></Link>
        <Link to="/new"><button className="headerBtn"> Add New Crewmates 🏆 </button></Link>
      </div>
        {element}
    </div>

  )
}

export default App
