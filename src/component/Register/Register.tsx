import { ChangeEvent, Suspense, useCallback, useContext, useState } from "react";
import '../../App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

interface InputType {
    username: string;
    email: string;
    createpassword: string;
    confirmpassword: string;
}

const Register = () => {
    const [input, setInput] = useState<InputType>({
        username: '',
        email: '',
        createpassword: '',
        confirmpassword: ''
    });
    const [array, setArray] = useState<InputType[]>([]);
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Disable button during submission
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({ ...prevInput, [name]: value }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        // Validation logic moved inside handleSubmit
        const { username, email, createpassword, confirmpassword } = input;
        if (!username || !email || !createpassword || !confirmpassword) {
            setError('Please fill out all fields.');
            return;
        }
        if (createpassword !== confirmpassword) {
            setError('Passwords do not match.');
            return;
        }

        const userData = { name: username, email, password: createpassword };

        try {
            setIsSubmitting(true); // Disable submit button
            const response = await axios.post('http://localhost:3000/api/user', userData, {
                headers: { "Content-Type": 'application/json' }
            });
            const { token } = response.data;
            localStorage.setItem("token", token);
            setUserData(userData);
            navigate('/dashboard');
            setArray((prevArray) => [...prevArray, input]);
            setInput({ username: '', email: '', createpassword: '', confirmpassword: '' });
            setError('');  // Clear error on successful submission
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMsg = error.response.data?.error || 'An error occurred';
                setError(errorMsg[0]?.msg);
            }
        } finally {
            setIsSubmitting(false); // Re-enable submit button
        }
    }, [input, setUserData, navigate]);

    return (
        <Suspense fallback={
            <h1 style={{
                width: '600%', color: 'white', height: '100vh',
                backgroundColor: 'black', margin: 0, padding: 0, display: 'flex',
                justifyContent: 'center', alignItems: 'center'
            }}>Loading...</h1>
        }>
            <div className="container">
                <p>Register to Get into the new World</p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    {['username', 'email', 'createpassword', 'confirmpassword'].map((field) => (
                        <div key={field} className="form">
                            <input
                                name={field}
                                placeholder=" "
                                className="form_input"
                                value={input[field as keyof InputType]}
                                onChange={handleChange}
                            />
                            <label className="form_label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        </div>
                    ))}
                    <div className="form">
                        <button
                            type="submit"
                            className="button"
                            disabled={isSubmitting}  // Disable button during submission
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </Suspense>
    );
}

export default Register;
