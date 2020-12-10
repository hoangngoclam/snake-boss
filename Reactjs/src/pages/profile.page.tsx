import React,{useEffect,useState} from "react";
import { HeaderComponent } from "../components";
import API from "../helper";

export default function ProfilePage(){
    const [userInfo,setUserInfo]:[IUserModel?,Function?] = useState(undefined);
    const [changePassword, setChangePassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(()=>{
        let currentUser = JSON.parse(localStorage.getItem('user') || 'null');
        console.log(currentUser);
        API.Get("http://localhost:5000/user/"+currentUser.id)
        .then((result: any)=>{
            let dataResult = result.data.user as IUserModel;
            setUserInfo(dataResult);
        })
    },[])
    if(userInfo === undefined){
        return (<div>Error page</div>)
    }
    else{
        let user: IUserModel = userInfo as IUserModel
        return (
            <div className=" w-full">
                <HeaderComponent />
                <div className="content w-full flex flex-row">
                    <div className=" w-full lg:w-2/6 md:w-2/6 sm:w-4/6 mx-auto items-center flex justify-center mt-2">
                        <form action="./index.html" method="GET" className="py-5 px-12 border border-gray-400 w-full rounded-md">
                            <div className=" flex items-center justify-center pb-3 flex-row justify-between">
                                <div>
                                    <p className="text-md">RANK</p>
                                    <p className="font-bold text-xl">{user.rate}</p>
                                </div>
                                <div className=" w-32 h-32 rounded-full overflow-hidden relative">
                                    <img src={`http://localhost:5000/imgs/${user.avatarUrl}`} className="w-full h-full object-cover object-center absolute z-0" alt="avatar"/>
                                </div>
                                <div>
                                    <p className="text-md">Score</p>
                                    <p className="font-bold text-xl">{user.score}</p>
                                </div>
                            </div>
            
                            <div className="flex flex-col mb-6">
                                <label htmlFor="name" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Name:</label>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center absolute left-0 top-0 
                                    h-full w-10 text-gray-400">
                                        <i className="fas fa-user"></i>
                                    </div>
                                    <input id="name" type="text" name="name" placeholder="Type your name"
                                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg 
                                    border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" />
                                </div>
                            </div>
                
                            <div className="flex flex-col mb-6">
                                <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Email:</label>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center absolute left-0 top-0 
                                    h-full w-10 text-gray-400">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <input id="email" type="email" name="email" placeholder="Password" 
                                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border 
                                    border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" />
                                </div>
                            </div>
            
                            <div className="flex flex-col mb-6">
                                <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                                <div className="flex flex-row items-center">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-red-600 mr-2"/>
                                    <div className="relative w-full">
                                        <div className="inline-flex items-center justify-center absolute left-0 top-0 
                                        h-full w-10 text-gray-400">
                                            <i className="fas fa-lock"></i>
                                        </div>
                                        <input id="password" type="password" name="password" placeholder="Password" 
                                        className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border 
                                        border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex w-full">
                                <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                                <span className="mr-2 uppercase">SAVE</span>
                                <span>
                                    <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            );
    }

}