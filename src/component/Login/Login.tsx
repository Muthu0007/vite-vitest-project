import { useContext, useState } from 'react';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

const Login = () => {
    const { setUserData } = useContext(UserContext);
    const [input, setInput] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Reset any previous errors
        const userData = {
            email: input.email,
            password: input.password // Use the createpassword as the password field
        };
        try {
            setLoading(true); // Set loading to true when submission starts
            const response = await axios.post("http://localhost:3000/api/login", userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            if (response.data.token) {
                const { token } = response.data;
                console.log(response.data.user);
                setUserData(response.data.user);
                localStorage.setItem('token', token);
                console.log(token);
                navigate('/dashboard');
                console.log('Login successful!');
            } else {
                console.log('no token');
            }

        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                const errorData = error.response.data
                console.log(errorData);
                setError(errorData.message);
                console.log(errorData.error || `HTTP error! status: ${error.response.status}`);
            }
            console.error('Error during login:', error.message);
            setLoading(false); // Set loading to true when submission starts

        }
    };

    return (
        <div className="container">
            <p>Login to the new World</p>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <input
                        name="email"
                        placeholder=" "
                        className="form_input"
                        value={input.email}
                        onChange={handleChange}
                    />
                    <label className="form_label">Email</label>
                </div>

                <div className="form">
                    <input
                        type="password"
                        name="password"
                        placeholder=" "
                        className="form_input"
                        value={input.password}
                        onChange={handleChange}
                    />
                    <label className="form_label">Password</label>
                </div>

                {error && <label style={{ color: 'red' }}>{error}</label>}
                <div className="form">
                    <button
                        type="submit"
                        className="button"
                        disabled={loading} // Disable button during loading
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
                <label><Link to={'/register'}>Need to Register ?</Link></label>
            </form>
        </div>
    );
};

export default Login;
