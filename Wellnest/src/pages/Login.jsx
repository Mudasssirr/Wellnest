import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { auth, signInWithEmailAndPassword } from '../config/firebase';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email && password) {
            setLoading(true);
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                setLoading(false);
                console.log(user);
                navigate('/');
            } catch (error) {
                setLoading(false);
                const errorMessage = error.message;
                setError(errorMessage);
            }
        }
    };

    const navigate = useNavigate();

    return (
        <div className='Login-Container'>
            <div className='Login-Content'>
                <h3>Login</h3>
                {error &&
                    <div className='Error-Container'>
                        <p className='Error'><i class="bi bi-x-circle-fill"></i> {error}</p>
                    </div>
                }
                <form onSubmit={handleSubmit}>
                    <div className='Input-Container'>
                        <p>Email</p>
                        <input
                            type="email"
                            className="Login-Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <p>Password</p>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="Login-Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='Toggle-Password'>
                        <label>
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={togglePasswordVisibility}
                            /> Show Password
                        </label>
                    </div>
                    <div className='Btn-Container'>
                        <button type="submit" disabled={loading}>
                            {loading ? <Spinner animation="grow" variant="light" className='Btn-Spinner' /> : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
            <div className='Form-Link'>
                <NavLink to={'../signup'} className='Link'>Signup</NavLink> | <NavLink to={'https://www.sehatyab.com/privacy-policy/'} target='_blank' className='Link'> Privacy Policy</NavLink>
            </div>
        </div>
    );
}

export default Login;