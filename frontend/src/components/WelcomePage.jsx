import { Link } from 'react-router-dom'
import '../styles/home-welcome.css'

const WelcomePage = () => {
    return (
        <div className="home-welcome-page">
            <div className="content">
                <h1>Welcome to UMELecturers</h1>
                <p>
                    On this platform, you will be able to leave positive reviews to your past lecturers/tutors who have helped 
                    you throughout your journey in university for others to see. We hope that this platform will also be
                    able to help facilitate the decisions of incoming students based on peer feedback.
                </p>
                <p>If you're here to look around, the search bar at the top will greatly help you</p>
                <p>If you're here to post feedback, start by <Link to="/home/add-staff">adding your first ever rating</Link></p>
            </div>
        </div>
    )
}

export default WelcomePage