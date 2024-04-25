import { useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email');//phuong thuc chay ra loi
            return;
        }

        if (!password) {
            toast.error('Invalid password');
        }
        //submit API
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/')
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <div className="login-container">
            <div className='header '>
                <span> Don't have an account yet?</span>
                <button onClick={() => navigate('/register')}>Sign up</button>
            </div>
            <div className='title col-4 mx-auto'>
                Anh &amp; Hoang
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello,who/s this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type={"email"}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="form-control"></input>
                </div>  <div className='form-group'>
                    <label>Password</label>
                    <input type={"password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="form-control"></input>

                </div>
                <span className='forgot-password'><u>Forgot password ?</u></span>
                <div>

                    <button className='btn-submit'
                        onClick={() => handleLogin()}
                    > Login to BaiLam</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/') }}>
                        &#60;&#60;Go to HomePage
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Login;