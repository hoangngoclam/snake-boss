/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState} from "react";
import { InputComponent,ButtonSubmitComponent } from './../components/index';
import {Link} from 'react-router-dom';
import {Alert} from 'reactstrap';
import {API} from './../helper';

export default function AdminLoginPage(props: any){
    const [errorLabel,setError] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const onSubmitClick = (_event: any)=>{
        let data:IDataPostLogin = {userName:userName, password: password};
        API.Post("http://localhost:5001/admin/login",data)
        .then((result: any)=>{
            let dataResult = result.data as IDataReceiveLoginAdmin;
            if(dataResult.success === false){
                setError("your email or password is wrong");
            }
            else{
                localStorage.setItem("admin",JSON.stringify(dataResult.admin))
                // window.location.reload();
                props.history.push('/user-admin');
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }
    const onUserNameChange = (_event: any)=>{
        setUserName(_event.target.value);
        setError("");
    }
    const onPasswordChange = (_event: any)=>{
        setPassword(_event.target.value);
        setError("");
    }
    return(
        <div className=" w-full lg:w-2/5 md:w-2/5 sm:w-4/5 mx-auto items-center flex justify-center h-screen" >
            <div className="py-10 px-12 border border-gray-400">
                <div className=" flex items-center justify-center pb-3 flex-col">
                    <img className="w-2/6 rounded-full" src="/imgs/logo.jpg" alt="My logo"/>
                    <p className="mt-2 text-xl">Login Admin</p>
                </div>
                <InputComponent icon={()=>(<i className="fas fa-user"></i>)} label="UserName" name="userName" 
                id="userName" type="text" placeholder="userName" value={userName} onChangeEvent={onUserNameChange} />

                <InputComponent icon={()=>(<i className="fas fa-lock"></i>)} label="Password" name="password" 
                id="password" type="password" placeholder="Password" value={password} onChangeEvent={onPasswordChange}/>
        
                <div className="flex items-center mb-6 -mt-4">
                    <div className="flex mr-auto">
                        <Link to="/register" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Create account</Link>
                    </div>
                    <div className="flex ml-auto">
                    <Link to="#" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Forgot Your Password?</Link>
                    </div>
                </div>
                {
                    errorLabel === "" ? <span></span>:<Alert color="danger">{errorLabel}</Alert>
                }
                <ButtonSubmitComponent text="Login" onClickEvent={onSubmitClick} />
            </div>
        </div>
    );
}

interface IDataPostLogin{
    userName: string,
    password: string,
}


interface IDataReceiveLoginAdmin{
    success: boolean,
    validate?: boolean,
    admin?: IAdminModel,
}
interface IAdminModel{
    userName: string,
    password: string,
    id: number,
}