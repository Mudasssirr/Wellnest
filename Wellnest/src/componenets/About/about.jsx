import './about.css'
import Col from 'react-bootstrap/Col';
import { NavLink } from 'react-router-dom';
import AboutImg1 from '../../Images/AboutImg-1.jpg';
import AboutImg2 from '../../Images/AboutImg-2.jpg';

function AboutUs() {
    return (
        <div style={{ display: 'flex' }}>
            <div className='About-Design-Container'></div>
            <div className='About-Container'>
                <div className="img-container">
                    <div className="row">
                        <div className="col" style={{ position: 'relative' }}>
                            <img src={AboutImg1} className='About-Img' alt='' />
                            <img src={AboutImg2} className='About-Img2' alt='' />
                        </div>
                    </div>
                </div>
                <Col className='About-Heading'>
                    <h2>About <span className='colored-Txt'>Us</span></h2>
                    <div className='About-Details'>
                        <p>Welcome to WellNest, your premier destination for comprehensive online mental health service in Pakistan. At WellNest, we understand the importance of mental well-being and are dedicated to providing confidential consultation with the best psychiatrists, psychologists and trainers, right at your fingertips.</p>
                        <p>WellNest is commited to offering personalized care & support to individuals and corporates across Pakistan. Our mission is to ensure that everyone, regardless of their location, has access to top-notch mental health service conveniently through online consultations.</p>
                        <NavLink to={'../about'}><button className='Learn-More-Btn'>Learn More</button></NavLink>
                    </div>
                </Col>
            </div>
        </div>
    );
}

export default AboutUs;