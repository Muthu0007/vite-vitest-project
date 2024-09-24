import { useNavigate } from 'react-router-dom';
import '../../App.css';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
const Dashboard: React.FC = () => {
    const { userData } = useContext(UserContext);
    console.log(userData);
    
    const navigate =useNavigate();
    const handleLogbtnClick = () => {
        localStorage.removeItem('token');
        navigate('/');
    }
   
    return (
        <>
            <h1>Hai {userData.name}</h1>
            <h2 className="heading">Welcome to dashboard</h2>
            <button className="dashbtn" onClick={handleLogbtnClick}>Logout</button>
        </>
    )
};
export default Dashboard;