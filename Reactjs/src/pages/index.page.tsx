import React from "react";

export default function IndexPage(){
    return(
        <div className=" w-full">
        <header className="w-full">
            <nav className="flex flex-row justify-between bg-pink-500">
                <a className="logo my-2 mx-5 hover:opacity-90 " href="#">
                    <img src="./imgs/logo.jpg" className="w-12 rounded-full" alt="Logo"/>
                </a>
                <div className="user flex flex-row items-center my-2 mx-5">
                    <div className=" w-12 h-12 rounded-full overflow-hidden relative">
                        <img src="./imgs/churang.jpg" className="w-full h-full object-cover object-center absolute z-0" alt="avatar"/>
                    </div>
                    <div className="ml-3 dropdown relative cursor-pointer">
                        <i className="fas fa-angle-down"></i>
                        <div className="dropdown-box w-40 flex p-2 flex-col bg-white rounded-md absolute 
                        -right-4 top-11 border border-gray-200 divide-y divide-gray-200 divide-solid">
                            <a href="./profile.html" className="py-1 text-center text-gray-600 hover:bg-gray-200 hover:text-gray-800">
                                Profile
                            </a>
                            <a href="./login.html" className="py-1 text-center text-gray-600 hover:bg-gray-200 hover:text-gray-800" >
                                Đăng xuất
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        <div className="content w-full flex flex-row">
            <div className="w-1/4 bg-pink-400 text-center">
                <h1 className="text-2xl ">Snake's Boss</h1>
                <div className="rate flex flex-col p-3">
                    <div className="p-1 rate__item bg-white border border-gray-400 flex flex-row items-center justify-center">
                        <p className="rank w-1/6 text-xl">1</p>
                        <p className="name w-4/6">Truong Hoang Ngoc Lam</p>
                        <p className="score w-1/6 text-2xl font-bold">300</p>
                    </div>
                    <div className="p-1 rate__item bg-white border border-gray-400 flex flex-row items-center justify-center">
                        <p className="rank w-1/6 text-xl">1</p>
                        <p className="name w-4/6">Truong Hoang Ngoc Lam 1</p>
                        <p className="score w-1/6 text-2xl font-bold">300</p>
                    </div>
                    <div className="p-1 rate__item bg-white border border-gray-400 flex flex-row items-center justify-center">
                        <p className="rank w-1/6 text-xl">1</p>
                        <p className="name w-4/6">Truong Hoang Ngoc Lam</p>
                        <p className="score w-1/6 text-2xl font-bold">300</p>
                    </div>
                </div>
            </div>
            <div className="w-3/4 bg-white">
                <div className="w-full h-12 flex flex-row items-center p-3">
                    <p>Your hight score: </p> <span className="pl-2 text-2xl">300</span>
                </div>
                <div className="w-full h-full bg-gray-200">
                    
                </div>
            </div>
        </div>
    </div>
    );
}