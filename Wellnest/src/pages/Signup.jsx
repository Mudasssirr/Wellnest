import './Signup.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from '../config/firebase';

function SignUp() {
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
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await setDoc(doc(db, "Users", user.uid), {
                    email: email,
                    password: password
                });
                setLoading(false);
                // console.log(user);
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
        <div className='SignUp-Container'>
            <div className='Signup-Content'>
                <h3>Signup</h3>
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
                            className="Signup-Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <p>Password</p>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="Signup-Password"
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
                            {loading ? <Spinner animation="grow" variant="light" className='Btn-Spinner' /> : 'Register'}
                        </button>
                    </div>
                </form>
            </div>
            <div className='Form-Link'>
                <NavLink to={'../login'} className='Link'>Login</NavLink> | <NavLink to={'https://www.sehatyab.com/privacy-policy/'} target='_blank' className='Link'> Privacy Policy</NavLink>
            </div>
        </div>
    );
}

export default SignUp;