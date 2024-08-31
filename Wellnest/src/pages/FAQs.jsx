import './FAQs.css'
import { useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Navbar from "../componenets/Navbar/navbar";
import Footer from '../componenets/Footer/footer';
import MainPageBanner from '../componenets/MainPageBanner/mainPageBanner';

function ContextAwareToggle({ eventKey }) {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(eventKey);
    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <button
            type="button"
            className='Accordion-Button'
            onClick={decoratedOnClick}
        >
            {isCurrentEventKey ? '-' : '+'}
        </button>
    );
}

function FAQItem({ eventKey, question, answer }) {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
        <Card className='Card'>
            <Card.Header
                className='Card-Header'
                onClick={decoratedOnClick}
            >
                <ContextAwareToggle eventKey={eventKey} />
                <span>{question}</span>
            </Card.Header>
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body>{answer}</Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

function FAQs() {
    const faqItems = [
        {
            question: "How can I book an appointment?",
            answer: "To schedule an appointment, please visit our website and navigate to the 'Contact' section. From there, select 'Book an Appointment.' Choose your preferred category and doctor, and then click 'Book Appointment' to secure a session with your selected doctor or therapist."
        },
        {
            question: "What types of mental health professionals do you have on your platform?",
            answer: "Our platform features a diverse range of mental health professionals to cater to your unique needs. We have licensed psychiatrists, clinical psychologists, child psychologists, and counselors. You can choose from experts such as Dr. Sarah Ahmed, a renowned psychiatrist, or Dr. Ali Khan, a highly experienced clinical psychologist. Navigate to our 'Contact' section and select 'Book an Appointment' to find the right professional for you."
        },
        {
            question: "Is my consultation confidential?",
            answer: "Absolutely! Your consultation on our platform is completely confidential. We prioritize your privacy and ensure that all interactions with our mental health professionals are secure and discreet. Our platform adheres to strict confidentiality protocols, so you can feel safe discussing your concerns with our experts. Your privacy is our utmost priority."
        },
        {
            question: "How much do your services cost?",
            answer: "The cost of our services varies depending on the mental health professional you choose to book an appointment with. Each professional sets their own rates, ensuring a range of options to fit different budgets. To view specific pricing, simply visit our website, select the category and the professional you're interested in, and the associated costs will be displayed. We strive to make our services accessible and affordable for everyone."
        },
        {
            question: "What can I expect during a therapy session?",
            answer: "During a therapy session at WellNest, you can expect a safe, confidential, and supportive environment where you can openly discuss your thoughts and feelings. Your therapist will work with you to explore your concerns, set goals, and develop strategies to address your issues. Sessions typically involve talking through your challenges, identifying patterns, and learning coping mechanisms. The therapist may also provide practical exercises or homework to help you apply what you've discussed in your daily life. The approach will be tailored to your individual needs, ensuring that you receive personalized care aimed at promoting your mental and emotional well-being."
        },
        {
            question: "How do online therapy sessions work?",
            answer: "Online therapy sessions at WellNest are convenient, flexible, and effective. You can schedule a session through our website by selecting your preferred therapist and time. Before the session, you'll receive a confirmation email with a secure link to the virtual meeting room. Ensure you have a stable internet connection and a private, comfortable space. At the scheduled time, click the link to join the video call with your therapist. During the session, you'll discuss your concerns and goals, and your therapist will provide insights and therapeutic techniques tailored to your needs. After the session, you may receive additional resources or exercises. You can schedule future appointments as needed, ensuring continuous, high-quality mental health support from home."
        },
        {
            question: "Can I get a prescription for medication through your platform?",
            answer: "Yes, you can receive prescriptions for medication through our platform. Our licensed psychiatrists are qualified to assess your condition and, if necessary, prescribe appropriate medication. During your online consultation, the psychiatrist will review your symptoms, medical history, and any previous treatments. If a prescription is deemed appropriate, it will be sent to your preferred pharmacy for pickup or delivery. Please note that the availability of prescriptions may vary depending on your location and the regulations in place."
        },
        {
            question: "What If I'm not satisfied with your consultation?",
            answer: "If you're not satisfied with your consultation, we are committed to addressing your concerns and ensuring you receive the support you need. Please reach out to our customer service team, and they will assist you in resolving the issue. We can arrange a follow-up consultation with a different professional or explore other options to meet your mental health needs. Your well-being and satisfaction are our top priorities."
        },
        {
            question: "How can I enroll as a physician?",
            answer: "To become a certified physician on our platform, please follow these steps: Firstly, navigate to the 'Contact' section and select 'Enroll as a Physician.' Next, complete the enrollment form with all the necessary details. Once you've submitted the form, our team will review your application promptly. Upon approval, you will be featured on our list of distinguished physicians within a short period. Thank you for considering joining our platform as a healthcare professional."            
        },
        {
            question: "How can I update my profile as an enrolled physician?",
            answer: "If you're already enrolled as a physician on our platform and need to update your profile, simply re-fill the form section on our 'Enroll as a Physician' page. Here, you can fill out any new information or make necessary changes. Once you've completed the form, our team will review the updates and ensure they are accurately reflected on your profile and your profile will be updated promptly. Your dedication to keeping your profile current is greatly appreciated and contributes to maintaining the integrity of our platform."            
        },
        {
            question: "How can I reach out if I have a specific question?",
            answer: "If you have any specific questions, please don't hesitate to contact us through the 'Contact Us' link on our website. Our team is here to assist you and provide the information you need."
        },
    ];

    return (
        <div>
            <Navbar />
            <MainPageBanner heading="Frequently Asked" spanHeading="Questions" />
            <div className="Accordion-Container">
                <div className='Accordion-Card'>
                    <Accordion defaultActiveKey={null}>
                        {faqItems.map((item, index) => (
                            <FAQItem
                                key={index}
                                eventKey={String(index)}
                                question={item.question}
                                answer={item.answer}
                            />
                        ))}
                    </Accordion>
                </div>
            </div>
            <Footer />
        </div >
    );
}

export default FAQs;