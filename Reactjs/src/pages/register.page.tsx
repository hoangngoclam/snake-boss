import React from "react";

export default function RegisterPage(){
    return(
        <div>
            <div className=" w-full lg:w-2/5 md:w-2/5 sm:w-4/5 mx-auto items-center flex justify-center h-screen">

                <form action="#" className="py-5 px-12 border border-gray-400 w-full">

                    <div className=" flex items-center justify-center pb-3 flex-col">
                        <img className="w-1/5 rounded-full" src="./imgs/logo.jpg" alt="My logo"/>
                        <h1 className="text-xl pt-2 font-bold text-gray-600">Đăng ký</h1>
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
                        <div className="relative">
                            <div className="inline-flex items-center justify-center absolute left-0 top-0 
                            h-full w-10 text-gray-400">
                                <i className="fas fa-lock"></i>
                            </div>
                            <input id="password" type="password" name="password" placeholder="Password" 
                            className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border 
                            border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" />
                        </div>
                    </div>

                    <div className="flex flex-col mb-6">
                        <label htmlFor="confirm-password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Confirm password:</label>
                        <div className="relative">
                            <div className="inline-flex items-center justify-center absolute left-0 top-0 
                            h-full w-10 text-gray-400">
                                <i className="fas fa-lock"></i>
                            </div>
                            <input id="confirm-password" type="password" name="confirm-password" placeholder="typing your password again" 
                            className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border 
                            border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" />
                        </div>
                    </div>
                    
                    <div className="flex w-full">
                        <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                        <span className="mr-2 uppercase">CREATE</span>
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
    );
}