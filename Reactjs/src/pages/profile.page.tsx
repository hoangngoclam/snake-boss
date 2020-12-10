import React,{useEffect,useState} from "react";
import { ButtonSubmitComponent, HeaderComponent, InputComponent } from "../components";
import API from "../helper";
import {Alert} from 'reactstrap';

export default function ProfilePage(props: any){
    const [userInfo,setUserInfo]:[IUserModel?,Function?] = useState(undefined);
    const [errorLabel,setError] = useState('');
    const [avatarUpload,setAvatarUpload] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [changePassword, setChangePassword] = useState(false);
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const onDisplayNameChange = (_event: any)=>{
        setDisplayName(_event.target.value);
        setError('');
    }
    const onCheckBoxClick = (_event: any)=>{
        setChangePassword(preState=>{
            return !preState
        });
        setError('');
    }
    const onPasswordChange = (_event: any)=>{
        setPassword(_event.target.value);
        setError('');
    }
    useEffect(()=>{
        try {
            let currentUser: any = JSON.parse(localStorage.getItem('user') || 'null');
            API.Get("http://localhost:5000/user/"+currentUser.id)
            .then((result: any)=>{
                let dataResult = result.data.user as IUserModel;
                setUserInfo(dataResult);
                setDisplayName(dataResult.displayName);
                setPassword(dataResult.password);
                setImageUrl(`http://localhost:5000/imgs/${dataResult.avatarUrl}`)
            })
        } catch (error) {
            localStorage.removeItem('user');
            props.history.push('/login')
        }
       
    }, [])
    const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const onButtonSubmitClick = async()=>{
        let user: IUserModel = userInfo as unknown as IUserModel
        var bodyFormData = new FormData();
        if(avatarUpload){
            bodyFormData.append("avatar",avatarUpload||"");
        }
        bodyFormData.append("id",user.id.toString());
        bodyFormData.append("displayName",displayName);
        bodyFormData.append("changePassword", changePassword?"1":"0");
        bodyFormData.append("password",password);
        let result: any = await API.PostFormData("http://localhost:5000/user/edit",bodyFormData).catch(e=>{
            setError("Save profile error");
        });
        let dataResult =  result.data as ISaveProfileData
        if(dataResult.success){
            localStorage.setItem("user",JSON.stringify(dataResult.user))
            alert("Save success");
        }
    }
    const onAvatarChange = async (_event: any)=>{
        try {
            let files = _event.target.files;
            let data: any = await toBase64(files[0]);
            setImageUrl(data);
            setAvatarUpload(files[0]);
        } catch (error) {
            setImageUrl(`http://localhost:5000/imgs/default.jpg`);
        }
        
    }
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
                        <div className="py-5 px-12 border border-gray-400 w-full rounded-md">
                            <div className=" flex items-center justify-center pb-3 flex-row justify-between">
                                <div>
                                    <p className="text-md">RANK</p>
                                    <p className="font-bold text-xl">{user.rate}</p>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <div className=" w-32 h-32 rounded-full overflow-hidden relative">
                                        <img src={imageUrl} className="w-full h-full object-cover object-center absolute z-0" alt="avatar"/>
                                    </div>
                                    <input className="mt-2 w-60" type="file" onChange={onAvatarChange} accept="image/png, image/jpeg"/>
                                </div>
                                <div>
                                    <p className="text-md">Score</p>
                                    <p className="font-bold text-xl">{user.score}</p>
                                </div>
                            </div>
                            <InputComponent icon={()=>(<i className="fas fa-lock"></i>)} label="Name" name="name" 
                                id="name" type="text" placeholder="Name" value={displayName} onChangeEvent={onDisplayNameChange}/>

                            <InputComponent icon={()=>(<i className="fas fa-lock"></i>)} label="Email" name="email" disable={true} 
                                id="email" type="email" placeholder="Email" value={user.email}/>
            
                            <div className="flex flex-col mb-6">
                                <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                                <div className="flex flex-row items-center">
                                    <input type="checkbox" onChange={(e)=>{onCheckBoxClick(e)}} className="form-checkbox h-5 w-5 text-red-600 mr-2"/>
                                    <div className="relative w-full">
                                        <div className="inline-flex items-center justify-center absolute left-0 top-0 
                                        h-full w-10 text-gray-400">
                                            <i className="fas fa-lock"></i>
                                        </div>
                                        <input id="password" type="password" name="password" value={password} onChange={onPasswordChange} placeholder="Password" disabled={!changePassword}
                                        className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border 
                                        border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" />
                                    </div>
                                </div>
                            </div>
                            
                            {
                                errorLabel === "" ? <span></span>:<Alert color="danger">{errorLabel}</Alert>
                            }
                            <ButtonSubmitComponent text="SAVE" onClickEvent={onButtonSubmitClick} />
                        </div>
                    </div>
                </div>
            </div>
            );
    }

}

interface ISaveProfileData{
    success: boolean;
    validate: boolean;
    user?: IUserModel;
}