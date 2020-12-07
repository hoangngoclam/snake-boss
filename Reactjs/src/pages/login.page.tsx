/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState} from "react";
import { InputComponent,ButtonSubmitComponent } from './../components/index';
import {Link, useHistory} from 'react-router-dom';
import {Alert} from 'reactstrap';
import API from './../helper';

export default function LoginPage(){
    const [errorLabel,setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history =  useHistory();
    const onSubmitClick = (_event: any)=>{
        let data:IDataPostLogin = {email:email, password: password};
        API.Post("http://localhost:5000/user/login",data)
        .then((result: any)=>{
            let dataResult = result.data as IDataReceiveLogin;
            if(dataResult.success === false){
                if(dataResult.validate === false){
                    setError("email or password is not valid");
                }
                setError("your email or password is wrong");
            }
            else{
                localStorage.setItem("user",JSON.stringify(dataResult.user))
                history.push("/");
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }
    const onEmailChange = (_event: any)=>{
        setEmail(_event.target.value);
    }
    const onPasswordChange = (_event: any)=>{
        setPassword(_event.target.value);
    }
    return(
        <div className=" w-full lg:w-2/5 md:w-2/5 sm:w-4/5 mx-auto items-center flex justify-center h-screen">
            <div className="py-10 px-12 border border-gray-400">
                <div className=" flex items-center justify-center pb-3">
                    <img className="w-2/6 rounded-full" src="/imgs/logo.jpg" alt="My logo"/>
                </div>
                <InputComponent icon={()=>(<i className="fas fa-user"></i>)} label="E-Mail" name="email" 
                id="email" type="email" placeholder="E-Mail Address" value={email} onChangeEvent={onEmailChange} />

                <InputComponent icon={()=>(<i className="fas fa-lock"></i>)} label="Password" name="password" 
                id="password" type="password" placeholder="Password" value={password} onChangeEvent={onPasswordChange}/>
        
                <div className="flex items-center mb-6 -mt-4">
                    <div className="flex mr-auto">
                        <Link to="/register" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Tạo tài khoản</Link>
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
    email: string,
    password: string,
}


