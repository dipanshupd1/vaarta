
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from '/src/pages/Home.jsx'
import Chat from '/src/pages/Chat.jsx'
// import UserContext from './contexts/UserContext.js'

function App() {
//   let loggedUser
// const getUserName=(name)=>{
//   loggedUser=name;
//   console.log("logged user is ",loggedUser)
// }
  return (
    <>
    {/* <UserContext.Provider value={{getName:getUserName,loggedUser}}> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
    {/* </UserContext.Provider> */}
    </>
  )
}

export default App
