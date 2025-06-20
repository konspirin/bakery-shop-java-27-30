
import SignInForm from "../templates/SighInForm.tsx";
import type {LoginData} from "../../utils/shop-types.ts";

const Login = () => {
    const submitFn = (loginData: LoginData)=> {
        console.log(JSON.stringify(loginData))
    }
    return (
        <div>
            <SignInForm submitFn={submitFn}/>
            </div>
    );
};

export default Login;