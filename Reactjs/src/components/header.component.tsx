import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import DropdownComponent from "./dropdown.component";
function DropdownItems(){
    const onSighOutClick = ()=>{
        localStorage.removeItem('user');
        window.location.reload();
    }
    return(
        <div className="dropdown-box w-40 flex p-2 flex-col bg-white rounded-md absolute 
        -right-4 top-11 border border-gray-200 divide-y divide-gray-200 divide-solid ">
            <Link to="/profile" className="py-1 text-center text-gray-600 hover:bg-gray-200 hover:text-gray-800">
                Profile
            </Link>
            <a href="#" className="py-1 text-center text-gray-600 hover:bg-gray-200 hover:text-gray-800" onClick={onSighOutClick} >
                Đăng xuất
            </a>
        </div>
    )
}
export default function HeaderComponent(){
    const [avatarUrl, setAvatar] = useState('/imgs/default.jpg');
    useEffect(()=>{
        let currentUser: IUserModel = JSON.parse(localStorage.getItem('user') || 'null');
        setAvatar(`http://localhost:5001/imgs/${currentUser.avatarUrl}`);
    },[]);
    return(
        <header className="w-full">
            <nav className="flex flex-row justify-between bg-pink-500">
                <Link className="logo my-2 mx-5 hover:opacity-90 " to="/">
                    <img src="/imgs/logo.jpg" className="w-12 rounded-full" alt="Logo"/>
                </Link>
                <div className="user flex flex-row items-center my-2 mx-5">
                    <div className=" w-12 h-12 rounded-full overflow-hidden relative">
                        <img src={avatarUrl} className="w-full h-full object-cover object-center absolute z-0" alt="avatar"/>
                    </div>
                    <div>
                        <p className="text-md font-bold ml-2">sdfsdf</p>
                    </div>
                    <DropdownComponent dropdownItems={DropdownItems}/>
                </div>
            </nav>
        </header>
    )
}