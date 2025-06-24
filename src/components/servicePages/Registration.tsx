import SignUpForm from "../templates/SignUpForm.tsx";
import type {SignupData} from "../../utils/shop-types.ts";


const Registration = () => {
    const signUpSubmit = (data:SignupData) => {
        console.log(JSON.stringify(data))
    }
    return (
        <div>
            <SignUpForm submitFunc={signUpSubmit}/>
            </div>
    );
};

export default Registration;