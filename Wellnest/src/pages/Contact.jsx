import './Contact.css'
import Navbar from '../componenets/Navbar/navbar';
import Footer from '../componenets/Footer/footer';
import MainPageBanner from '../componenets/MainPageBanner/mainPageBanner';
import { useState } from 'react';
import { db, collection, addDoc } from '../config/firebase';
import Swal from 'sweetalert2';
import Spinner from 'react-bootstrap/Spinner';

const ContactForm = () => {
    const [loading, setLoading] = useState(false);

    const handleContact = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.fullName.value;
        const email = form.email.value;
        const message = form.message.value;
    
        try {
            setLoading(true);

            await addDoc(collection(db, "Contact-Message"), {
                name: name,
                email: email,
                message: message,
            });
    
            setLoading(false);
            Swal.fire("Success!", "Submitted Successfully", "success");
            form.reset();
        } catch (error) {
            setLoading(false);
            // console.error("Error enrolling:", error);
            Swal.fire("Error!", "An error occurred while submitting. Please try again.", "error");
        }
    }

    return (
        <form className='Contact-Form' onSubmit={handleContact}>
            <div className="row Contact-Form-Row">
                <div className="col">
                    <p className='Contact-Form-Details'>Full Name<span className='Req-Star'>*</span></p>
                    <input type="text" name="fullName" className='Contact-Form-Input' placeholder='Full Name' required />
                </div>
                <div className="col">
                    <p className='Contact-Form-Details'>Email<span className='Req-Star'>*</span></p>
                    <input type="email" name="email" className='Contact-Form-Input regex-input' placeholder='Email' required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" />
                </div>
                <div className="col Full-Width">
                    <p className='Contact-Form-Details'>Message<span className='Req-Star'>*</span></p>
                    <textarea name="message" rows={7} className='Contact-Form-Input' placeholder='Message...' required></textarea>
                </div>
            </div>
            <div className='Form-Btn-Container'>
                <button type="submit" disabled={loading}>
                    {loading ? <Spinner animation="grow" variant="light" className='Btn-Spinner' /> : 'Submit'}
                </button>
            </div>
        </form>
    );
};

const ContactUs = () => {
    return (
        <div>
            <Navbar />
            <MainPageBanner heading="Contact" spanHeading="Us" />
            <div>
                <ContactForm/>
            </div>
            <Footer />
        </div>
    );
}

export default ContactUs;