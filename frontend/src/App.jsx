
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useSelector } from "react-redux";


function App() {
  const isLoggedIn=useSelector((state)=>state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ?
          <Route path="/auth" element={<Auth/>}/>:
          <>
         <Route path="/blogs" element={<Blogs/>}/>
         <Route path="/myBlogs" element={<UserBlogs/>}/>
         <Route path="/myBlogs/:id" element={<BlogDetail/>}/>
         <Route path="/blogs/add" element={<AddBlog/>}/>
         </>}
        </Routes>
      </main>




    </>
  )
}

export default App
