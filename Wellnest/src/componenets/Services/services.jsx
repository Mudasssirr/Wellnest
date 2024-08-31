import './services.css'
import { NavLink } from 'react-router-dom';
import ServiceImg1 from '../../Images/Service-Card-Img1.png';
import ServiceImg2 from '../../Images/Service-Card-Img2.webp';
import ServiceImg3 from '../../Images/Service-Card-Img3.png';
import ServiceImg4 from '../../Images/Service-Card-Img4.png';
import ServiceImg5 from '../../Images/Service-Card-Img5.png';
import ServiceImg6 from '../../Images/Service-Card-Img6.png';

function OurServices() {
    const ServiceCards = [
        {
            cardTitle: "Individual Therapy",
            cardDetails: "We offer individual therapy to offer you support in your journey toward mental and emotional well-being. Our experienced therapists provide",
            cardImage: ServiceImg1,
        },
        {
            cardTitle: "Audio/ Video Consultation",
            cardDetails: "We understand that accessing mental health support should be convinient and flexible. That's why we offer video & audio",
            cardImage: ServiceImg2,
        },
        {
            cardTitle: "Relationship/ Family Counselling",
            cardDetails: "You have to fight your issue together, not against each other. No martial life is perfect. That's why we offer Relationship/ Family",
            cardImage: ServiceImg3,
        },
        {
            cardTitle: "Child & Adolescent Counselling",
            cardDetails: "Improve the thinking and attitudes of children Stubbornness, lack of interest, screen time, can be improved.",
            cardImage: ServiceImg4,
        },
        {
            cardTitle: "Emotional Well-Being of University Students",
            cardDetails: "Online Counselling Services Tailored for Emotional Well-being of University Students.",
            cardImage: ServiceImg5,
        },
        {
            cardTitle: "Text Messaging Therapy",
            cardDetails: "Text messaging therapy for the well-being of its customers, which is deliverd via text or audio notes on Whatsapp.",
            cardImage: ServiceImg6,
        },
    ]
    return (
        <div>
            <div className='separator'></div>
            <div className='Services-Txt'>
                <h2>Our <span className='colored-Txt'>Services</span></h2>
                <h5>Discover the range of services offered including</h5>
            </div>
            <div className='Services-Cards'>
                {ServiceCards.map((v, i) => (
                    <div className='Cards' key={i}>
                        <div className='card-Image-Container'>
                            <img src={v.cardImage} alt="" className='card-Img' />
                        </div>
                        <div className='card-detail-container'>
                            <p className='card-heading'>{v.cardTitle}</p>
                            <p className='card-paragraph'>{v.cardDetails}</p>
                        </div>
                        <div className='card-btn-container'>
                            <NavLink to={'../services'}><button className='card-btn'>Learn More</button></NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OurServices;