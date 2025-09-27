import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Post from './pages/Post'
import { Link } from 'react-router-dom'


const App = () => {

  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts />
    },
    {
      path:"/edit/:id",
      element: <EditPost />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path:"/crewmate/:id",
      element: <Post />
    }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <h1>Shows</h1>
        <Link to="/"><button className="headerBtn"> Explore Shows 🔍  </button></Link>
        <Link to="/new"><button className="headerBtn"> Add New Shows 🏆 </button></Link>
      </div>
        {element}
    </div>

  )
}

export default App
