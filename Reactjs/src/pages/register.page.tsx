import React,{useState} from "react";
import { Link, Redirect } from "react-router-dom";
import { Alert } from "reactstrap";
import { ButtonSubmitComponent, InputComponent } from "../components";
import API from "../helper";

export default function RegisterPage(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [errorLabel, setError] = useState("");
    const [isRegisterSuccess, setRegisterStatus] = useState(false);

    const onSubmitClick = (_event: any)=>{
        if(password !== confirmPassword){
            setError("Password must be the same as confirm");
            return 
        }
        let data:IDataPostRegister = {email:email, password: password, displayName: name, confirmPassword: confirmPassword};
        API.Post("http://localhost:5000/user/register",data)
        .then((result: any)=>{
            let dataResult = result.data as IDataReceiveLogin;
            if(dataResult.success === false){
                if(dataResult.validate === false){
                    setError("name or email or password is not valid");
                }
                setError("Your email has been created");
            }
            else{
                localStorage.setItem("user",JSON.stringify(dataResult.user))
                setRegisterStatus(true)
                // history.push("/");
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

    const onNameChange = (_event: any)=>{
        setName(_event.target.value);
        setError("");
    }
    const onEmailChange = (_event: any)=>{
        setEmail(_event.target.value);
        setError("");
    }
    const onPasswordChange = (_event: any)=>{
        setPassword(_event.target.value);
        setError("");
    }
    const onConfirmPassChange = (_event: any)=>{
        setConfirmPassword(_event.target.value);
        setError("");
    }
    if(isRegisterSuccess){
        return <Redirect to='/'  />
    }
    else{
        return(
            <div>
                <div className=" w-full lg:w-2/5 md:w-2/5 sm:w-4/5 mx-auto items-center flex justify-center h-screen">
                    <div className="py-5 px-12 border border-gray-400 w-full">
    
                        <div className=" flex items-center justify-center pb-3 flex-col">
                            <img className="w-1/5 rounded-full" src="./imgs/logo.jpg" alt="My logo"/>
                            <h1 className="text-xl pt-2 font-bold text-gray-600">Đăng ký</h1>
                        </div>
                        <InputComponent icon={()=>(<i className="fas fa-user"></i>)} label="Name" name="name" 
                            id="name" type="text" placeholder="Type your name" value={name} onChangeEvent={onNameChange} />
                        <InputComponent icon={()=>(<i className="fas fa-envelope"></i>)} label="Email" name="email" 
                            id="email" type="email" placeholder="Email" value={email} onChangeEvent={onEmailChange} />
                        <InputComponent icon={()=>(<i className="fas fa-lock"></i>)} label="Password" name="password" 
                            id="password" type="password" placeholder="Password" value={password} onChangeEvent={onPasswordChange} />
                        <InputComponent icon={()=>(<i className="fas fa-lock"></i>)} label="Confirm password" name="confirm-password" 
                            id="confirm-password" type="password" placeholder="Password" value={confirmPassword} onChangeEvent={onConfirmPassChange} />
                        {
                            errorLabel === "" ? <span></span>:<Alert color="danger">{errorLabel}</Alert>
                        }
                        <div className="flex items-center mb-6 -mt-4">
                            <div className="flex mr-auto">
                                <Link to="/login" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Sign in</Link>
                            </div>
                        </div>
                        <ButtonSubmitComponent onClickEvent={onSubmitClick} text="CREATE"/>
                    </div>
            </div>
            </div>
        );
    }
    
}

interface IDataPostRegister{
    displayName: string,
    email: string,
    password: string,
    confirmPassword: string,
}