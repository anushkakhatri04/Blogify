import { Routes, Route } from 'react-router-dom'
import About from './pages/About/About'
import Home from './pages/Home/Home'
import AddPost from './pages/AddPost/AddPost'
import Contact from './pages/Contact/Contact'
import EditPost from './pages/EditPost/EditPost'
import Login from './pages/Login/Login'
import MyPosts from './pages/MyPosts/MyPosts'
import Signup from './pages/Signup/Signup'
import ViewPost from './pages/ViewPost/ViewPost'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './pages/Dashboard/Dashboard'
import Comments from './pages/Comments/Comments'
import FooterComp from './components/FooterComp/FooterComp'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/about' element={ <About /> } />
      <Route path='/add' element={ <AddPost /> } />
      <Route path='/contact' element={ <Contact /> } />
      <Route path='/posts/:id' element={ <ViewPost /> } />
      <Route path='/edit/:id' element={ <EditPost /> } />
      <Route path='/myPosts' element={ <MyPosts /> } />
      <Route path='/comments' element={ <Comments />} />
      <Route path='/login' element={ <Login /> } />
      <Route path='/signup' element={ <Signup /> } />
    </Routes>
    <FooterComp />
    </>
  )
}

export default App
