import React, { useState } from 'react'
import "./Header.css"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from './store';

const Header = () => {
    const dispath=useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [value, setValue] = useState();
    return (
        <>
            <nav className='nav-main'>
                <div className='nav-logo'>
                    <h1>
                        <span>B</span>logs
                    </h1>
                </div>
                {isLoggedIn && <div className='menu-links'>


                    <ul>
                        <li>
                            <Link className='menu-Allblogs-links' value={value} onChange={(e, val) => setValue(val)} to={'/blogs'}>AllBlogs</Link>
                        </li>
                        <li>
                            <Link className='menu-MyBlogs-links' value={value} onChange={(e, val) => setValue(val)} to={'/myBlogs'}>MyBlogs</Link>

                        </li>
                        <li>
                            <Link className='menu-MyBlogs-links' value={value} onChange={(e, val) => setValue(val)} to={'/blogs/add'}>Add Blogs</Link>

                        </li>
                    </ul></div>
                }
                <div className='menu-btns'>
                    {!isLoggedIn &&
                     <>
                    <Link to={'/auth'}><button className='btn-login'>Login</button></Link>
                    <Link to={'/auth'}><button className='btn-signup'>Signup</button></Link> 
                     </>
                     }
                  
                   {isLoggedIn && 
                    <Link to={'/auth'}><button className='btn-logout' onClick={()=>dispath(authActions.logout())}>Logout</button></Link>
                    }
                </div>


            </nav>
        </>
    )
}
export default Header;
