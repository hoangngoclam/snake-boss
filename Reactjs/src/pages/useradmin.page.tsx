import React from "react";

export default function UserAdminPage(){
    return(
        <div className=" w-full">
        <header className="w-full">
            <nav className="flex flex-row justify-between bg-pink-500">
                <a className="logo my-2 mx-5 hover:opacity-90 " href="./index.html">
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
        <div className=" content w-full flex flex-row">
            <div className="container mx-auto">
                <table id="custom" className="mt-10">
                    <thead >
                        <tr className="text-left "> 
                          <th className="w-1/12 py-3">STT</th>
                          <th className="w-4/12">Display name</th>
                          <th className="w-4/12">Email</th>
                          <th className="w-1/12">Status</th>
                          <th className="w-2/12">###</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Adam</td>
                            <td>adam@gmail.com</td>
                            <td></td>
                            <td>
                                <div className="flex flex-row items-center">
                                    <div className="mr-3 cursor-pointer text-green-600 opacity-80 hover:opacity-100">
                                        <i className="fas fa-sync-alt"></i>
                                    </div>
                                    <div className="mr-3 cursor-pointer text-green-600 opacity-80 hover:opacity-100">
                                        <i className="fas fa-sync-alt"></i>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Adam</td>
                            <td>adam@gmail.com</td>
                            <td></td>
                            <td>
                                <div className="flex flex-row items-center">
                                    <div className="mr-3 cursor-pointer text-green-600 opacity-80 hover:opacity-100">
                                        <i className="fas fa-sync-alt"></i>
                                    </div>
                                    <div className="mr-3 cursor-pointer text-green-600 opacity-80 hover:opacity-100">
                                        <i className="fas fa-sync-alt"></i>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}