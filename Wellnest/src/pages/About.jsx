import './About.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../componenets/Navbar/navbar";
import Footer from '../componenets/Footer/footer';
import VerticalTimelineComp from '../componenets/VerticalTimeline/verticalTimeline';
import MainPageBanner from '../componenets/MainPageBanner/mainPageBanner';
import AboutImg1 from '../Images/AboutImg-1.jpg';
import AboutImg2 from '../Images/AboutImg-2.jpg';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function About() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts
    }, [location]);
    return (
        <div>
            <Navbar />
            <MainPageBanner heading="About" spanHeading="Us" />
            <div className='AboutPage-Container'>
                <div className="row AboutPage-Inner-Container">
                    <div className="col AboutPage-Text-Container">
                        <h2 className='AboutPage-Heading'>About Us</h2>
                        <p className='AboutPage-Paragraph'>Welcome to your premium destination for comprehensive online mental health services in Pakistan. At WellNest, we understand the importance of mental well-being and are dedicated to providing confidential consultations with the best psychiatrists, psychologists & trainers, right at your fingertips.</p>
                    </div>
                    <div className="col AboutPage-Img-Container">
                        <img src={AboutImg1} alt='' className='AboutPage-Img1' />
                        <img src={AboutImg2} alt='' className='AboutPage-Img2' />
                    </div>
                </div>
            </div>
            <VerticalTimelineComp />
            <Footer />
        </div>
    );
}

export default About;