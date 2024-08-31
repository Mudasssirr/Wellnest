import './DoctorProfile.css'
import Navbar from '../componenets/Navbar/navbar';
import Footer from '../componenets/Footer/footer';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { auth, db, doc, getDoc, addDoc, collection } from '../config/firebase';
import Swal from 'sweetalert2';
import Spinner from 'react-bootstrap/Spinner';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const DoctorProfile = () => {
    const [doctor, setDoctor] = useState(null);
    const [error, setError] = useState('');
    const query = useQuery();
    const uid = query.get('uid');
    const location = useLocation();

    // To render the doctor's detail
    useEffect(() => {
        const fetchDoctor = async () => {
            if (uid) {
                try {
                    const docRef = doc(db, "Enrolled-Physicians", uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setDoctor(docSnap.data());
                        setError('');
                    } else {
                        setError('The provided ID did not match any results. Please try again.');
                    }
                } catch (error) {
                    setError('An error occurred while fetching the doctor information. Please try again later.');
                }
            } else {
                setError('Please provide an accurate doctor ID.');
            }
        };

        fetchDoctor();
    }, [uid]);

    // For Calendar
    const [date, setDate] = useState(new Date());
    const today = new Date();

    // For Selected Time
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [loading, setLoading] = useState(false);
    const timeSlots = ["06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM"];

    const handleButtonClick = (index, time) => {
        setSelectedButton(index);
        setSelectedTime(time);
    };

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts
    }, [location]);

    const handleBooking = async () => {
        const userId = auth.currentUser?.uid;

        if (!selectedTime) {
            Swal.fire("Error!", "Please select a time slot", "error");
            return;
        } else if (!userId) {
            Swal.fire("Error!", "Please log in to book an appointment", "error");
            return;
        }

        setLoading(true);
        const appointmentDetails = {
            doctorUid: uid,
            doctorName: doctor.fullName,
            selectedDate: date.toDateString(),
            selectedTime: selectedTime,
            userUid: userId
        };

        try {
            await addDoc(collection(db, 'Booked-Appointments'), appointmentDetails);
            Swal.fire("Success!", "Appointment booked successfully", "success");
        } catch (error) {
            Swal.fire("Error!", "An error occurred while booking the appointment", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            {error ? (
                <div className='DP-Error-Container'>
                    <p className='DP-Error'><i className="bi bi-x-circle-fill"></i> {error}</p>
                </div>
            ) : doctor ? (
                <div>
                    <div className='Doctor-Links'>
                        <a href={doctor.cvUrl} target='_blank' rel='noopener noreferrer'>CV</a>
                        <p><i className="bi bi-arrow-right"></i></p>
                        <a href={doctor.socialLinks} target='_blank' rel='noopener noreferrer'>Social Link</a>
                        <p><i className="bi bi-arrow-right"></i></p>
                        <a href={`mailto:${doctor.email}`} rel='noopener noreferrer'>Email</a>
                    </div>
                    <div className='Doctor-Detail-Container'>
                        <div className='DP-Img-Container'>
                            <img src={doctor.photoUrl} alt="" className='DP-Img' />
                        </div>
                        <div className='DP-Doctor-Details'>
                            <p className='DP-Doctor-Name'>Dr. {doctor.fullName}</p>
                            <p className='DP-Doctor-Field'>Field: <span className='light-text'>{doctor.field}</span></p>
                            <p className='DP-Doctor-Specialization'>Specialization: <span className='light-text'>{doctor.specialization}</span></p>
                            <p className='DP-Doctor-Fees'>Fee: <span className='light-text'>PKR {doctor.fee} ({doctor.minutes} Min)</span></p>
                        </div>
                    </div>
                    <div>
                        <p className='DP-Description'>{doctor.description}</p>
                    </div>
                    <div className='Appointment-Container'>
                        <div className="custom-calendar">
                            <Calendar
                                date={date}
                                onChange={item => setDate(item)}
                                minDate={today}
                            />
                        </div>
                        <div className='Time-Select-Container'>
                            <p className='Selected-Date-Display'>
                                {date.toDateString()}, {selectedTime}
                            </p>
                            {timeSlots.map((time, index) => (
                                <button
                                    key={index}
                                    className={selectedButton === index ? 'selected' : ''}
                                    onClick={() => handleButtonClick(index, time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='Book-Appointment-Btn-Container'>
                        <button className='Book-Appointment-Btn' onClick={handleBooking} disabled={loading}>
                            {loading ? <Spinner animation="grow" variant="light" className='Btn-Spinner' /> : 'Book Now'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className='DP-Loader-Container'>
                    <Spinner animation="grow" variant="info" className='DP-Loader' />
                </div>
            )}
            <Footer />
        </>
    );
};

export default DoctorProfile;