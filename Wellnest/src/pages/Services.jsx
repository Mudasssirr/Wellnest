import './Services.css'
import Navbar from "../componenets/Navbar/navbar";
import Footer from '../componenets/Footer/footer';
import MainPageBanner from '../componenets/MainPageBanner/mainPageBanner';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ServiceImg1 from '../Images/Service-Page-Img1.jpg';
import ServiceImg2 from '../Images/Service-Page-Img2.webp';
import ServiceImg3 from '../Images/Service-Page-Img3.jfif';
import ServiceImg4 from '../Images/Service-Page-Img4.jfif';
import ServiceImg5 from '../Images/Service-Page-Img5.jpg';
import ServiceImg6 from '../Images/Service-Page-Img6.jpeg';

function Services() {
    const services = [
        {
            serviceTitle: "Individual Therapy",
            serviceDetails: "We offer individual therapy to offer you support in your journey toward mental and emotional well-being. Our experienced therapists provide a safe and confidential space where you can explore your thoughts, feelings, and concerns without judgement.",
            serviceImage: ServiceImg1,
            order: 'normal'
        },
        {
            serviceTitle: "Audio/ Video Consultation",
            serviceDetails: "We understand that accessing mental health support should be convinient and flexible. That's why we offer video & audio consultation services, allowing you to recieve professional therapy from the comfort & privacy of your own space.",
            serviceImage: ServiceImg2,
            order: 'reverse'
        },
        {
            serviceTitle: "Relationship/ Family Counselling",
            serviceDetails: "You have to fight your issue together, not against each other. No marital life is perfect. That's why we offer Relationship/ Family Counselling to help you better understand each other's point of view, beter communicate, build mutual trust & help deal with issues together.",
            serviceImage: ServiceImg3,
            order: 'normal'
        },
        {
            serviceTitle: "Child & Adolescent Counselling",
            serviceDetails: "Improve the thinking and attitudes of children Stubbornness, lack of interest, screen time, can be improved. Self confidence, adaptability, resilience can be learned. ADHD, depression, social anxiety can be treated. Comparison in children, not becoming a role model, are parenting mistakes. Important point: According to World Health Organization, 50% of mental health issues mature by the age 14 and 75% by the age 24.",
            serviceImage: ServiceImg4,
            order: 'reverse'
        },
        {
            serviceTitle: "Emotional Well-Being of University Students",
            serviceDetails: "Online Counselling Services Tailored for Emotional Well-being of University Students. Emotional issues are unique. We specialize in improving the emotional well-being of university students by helping them resolve their issues.",
            serviceImage: ServiceImg5,
            order: 'normal'
        },
        {
            serviceTitle: "Text Messaging Therapy",
            serviceDetails: "Text messaging therapy for the well-being of its customers, which is deliverd via text or audio notes on Whatsapp. Message your therapist 24/7 or send audio notes. With 100% confidentiality. For Mental health issues, frequent sessions are needed, and text messaging facilitates this greatly. It is provided with confidentiality and at an affordable price.",
            serviceImage: ServiceImg6,
            order: 'reverse'
        },
    ];

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts
    }, [location]);

    return (
        <div>
            <Navbar />
            <MainPageBanner heading="Our" spanHeading="Services" />
            <div className='Services-Container'>
                {services.map((service, i) => (
                    <div className="row Services-Inner-Container" key={i}>
                        {service.order === 'normal' ? (
                            <>
                                <div className="col Services-Text-Container">
                                    <h2 className='Services-Heading'>{service.serviceTitle}</h2>
                                    <p className='Services-Paragraph'>{service.serviceDetails}</p>
                                </div>
                                <div className="col">
                                    <img src={service.serviceImage} className='Services-Img' alt='' />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col">
                                    <img src={service.serviceImage} className='Services-Img' alt='' />
                                </div>
                                <div className="col Services-Text-Container">
                                    <h2 className='Services-Heading'>{service.serviceTitle}</h2>
                                    <p className='Services-Paragraph'>{service.serviceDetails}</p>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Services;