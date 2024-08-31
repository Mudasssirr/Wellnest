import './verticalTimeline.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

function VerticalTimelineComp() {
    const AboutDetails = [
        {
            AboutTitle: "Our Mission",
            serviceDetails: "WellNest is committed to offering personalized care and support to individuals and corporates across Pakistan. Our Mission is to ensure that everyone, regardless of their location, has access to top-notch mental health services conveniently through online consultations.",
            position: 'right',
            textEnd: false
        },
        {
            AboutTitle: "Our Journey",
            serviceDetails: "WellNest was founded with a vision to revolutionize mental healthcare in Pakistan. Since our inception, we have been on a mission to break down barriers to accessing quality mental health services and provide a safe space for individuals to seek support and guidance.",
            position: 'left',
            textEnd: true
        },
        {
            AboutTitle: "Our Values",
            serviceDetails: "At WellNest, we are guided by the principles of empathy, confidentiality and professionalism. We believe in the power of compassionate care and are committed to upholding the highest standards in mental health service delivery.",
            position: 'right',
            textEnd: false
        },
    ];

    return (
        <div className='container'>
            <VerticalTimeline>
                {AboutDetails.map((detail, index) => (
                    <VerticalTimelineElement
                        key={index}
                        className={`vertical-timeline-element--work ${detail.textEnd ? 'text-end' : ''}`}
                        position={detail.position}
                    >
                        <h3 className="vertical-timeline-element-title">{detail.AboutTitle}</h3>
                        <p className='vertical-timeline-element-paragraph'>
                            {detail.serviceDetails}
                        </p>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
        </div>
    );
}

export default VerticalTimelineComp;