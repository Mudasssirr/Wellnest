import './BookAppointment.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from '../componenets/Navbar/navbar';
import Footer from '../componenets/Footer/footer';
import MainPageBanner from '../componenets/MainPageBanner/mainPageBanner';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { db, collection, getDocs } from '../config/firebase';
import Swal from 'sweetalert2';
import Spinner from 'react-bootstrap/Spinner';


const RenderPhysicians = () => {
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const FilterBy = [
        'Counseling Psychology',
        'School Psychology',
        'Marriage and Family Therapy',
        'Psychiatric-Mental Health Nursing',
        'Substance Abuse Counseling',
        'Dietetics',
        'Psychiatry',
        'Clinical Psychology',
        'Counseling'
    ];

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Enrolled-Physicians"));
                const doctorsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFilteredDoctors(doctorsList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching doctors:", error);
                Swal.fire("Error!", "An error occurred while fetching doctors. Please try again.", "error");
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const handleSearch = async () => {
        setSearching(true);
        try {
            let doctorsRef = collection(db, "Enrolled-Physicians");
            let q = doctorsRef;

            // Fetch all doctors first
            const querySnapshot = await getDocs(q);
            const searchValue = searchInput.toLowerCase();
            const matchingDoctors = [];

            querySnapshot.forEach(doc => {
                const doctorData = doc.data();
                const fullName = doctorData.fullName || ''; // Avoid null or undefined full names
                const field = doctorData.field || ''; // Avoid null or undefined fields

                // Check for matches in both name and field
                const nameMatches = searchValue ? fullName.toLowerCase().includes(searchValue) : true;
                const fieldMatches = selectedCategory ? field.toLowerCase() === selectedCategory.toLowerCase() : true;

                if (nameMatches && fieldMatches) {
                    doctorData.id = doc.id;
                    matchingDoctors.push(doctorData);
                }
            });

            // console.log("Matching doctors:", matchingDoctors);  Log the matching doctors
            setFilteredDoctors(matchingDoctors);
            setSearching(false);

        } catch (error) {
            // console.error("Error searching doctors:", error);
            Swal.fire("Error!", "An error occurred while searching. Please try again.", "error");
            setSearching(false);
        }
    };


    return (
        <>
            <div className='Filter-Featured-Container'>
                <div className='Filter-Featured'>
                    <div className='Filter-Tag-Container'>
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder='Search by name'
                            className='BA-Search-Input'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                    <div className='Filter-Tag-Container'>
                        <select
                            name=""
                            id=""
                            className='BA-Search-Input'
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="" disabled selected>
                                Any Category
                            </option>
                            {FilterBy.map((v, i) => (
                                <option key={i} value={v}>
                                    {v}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='Feature-Btn-Container'>
                        <button className='Feature-Btn' onClick={handleSearch} disabled={searching}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className='Appointment-Para-Container'>
                <p>Ready to take the next step towards mental wellness? Book an appointment with one of our experienced professionals today. Simply choose your preferred doctor, and we'll take care of the rest. Your path to healing starts here.</p>
            </div>
            <div className='Featured-Cards'>
                {loading || searching ? (
                    <Spinner animation="grow" variant="info" style={{ width: 50, height: 50 }} />
                ) : (
                    filteredDoctors.length === 0 ? (
                        <p className='BA-Error-404'>No doctors match your search results.</p>
                    ) : (
                        filteredDoctors.map(doctor => (
                            <div className="Doctor-Card" key={doctor.userId}>
                                <div>
                                    <img src={doctor.photoUrl || "default-doctor-image.png"} alt="Doctor" className='Doctor-Img' />
                                </div>
                                <div>
                                    <p className='Doctor-Name'>{doctor.fullName}</p>
                                    <p className='Doctor-Field'>{doctor.field}</p>
                                </div>
                                <div className='Doctor-PV-Container'>
                                    <p className='Doctor-Fee'>PKR {doctor.fee} ({doctor.minutes} Min)</p>
                                    <p className='Doctor-Review'><i className="bi bi-star-fill"></i> ({doctor.rating})</p>
                                </div>
                                <div>
                                    <NavLink to={`../doctorprofile?uid=${doctor.userId}`}>
                                        <button className='Doctor-Profile-Btn'> View Profile </button>
                                    </NavLink>
                                </div>
                            </div>
                        ))
                    )
                )}
            </div>
        </>
    );
};

const BookAnAppointment = () => {

    return (
        <div>
            <Navbar />
            <MainPageBanner heading="Book an" spanHeading="Appointment" />
            <RenderPhysicians />
            <Footer />
        </div>
    );
}

export default BookAnAppointment;