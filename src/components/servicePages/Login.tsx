
import SignInForm from "../templates/SighInForm.tsx";
import type {LoginData} from "../../utils/shop-types.ts";
import {useAppDispatch} from "../../redux/hooks.ts";
import {loginAction} from "../../redux/slices/authSlice.ts";

const Login = () => {
    const dispatch = useAppDispatch();
    const submitFn = (loginData: LoginData)=> {
        // console.log(JSON.stringify(loginData))
        dispatch(loginAction(loginData.email))
    }


    return (
        <div>
            <SignInForm submitFn={submitFn}/>
            </div>
    );
};

export default Login;