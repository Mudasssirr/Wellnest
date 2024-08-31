import './EnrollAsPhysician.css'
import Navbar from "../componenets/Navbar/navbar";
import Footer from '../componenets/Footer/footer';
import MainPageBanner from '../componenets/MainPageBanner/mainPageBanner';
import { useState } from 'react';
import { auth, db, doc, setDoc, storage, ref, uploadBytes, getDownloadURL } from '../config/firebase';
import Swal from 'sweetalert2';
import Spinner from 'react-bootstrap/Spinner';

const PsychologyFields = [
    { field: 'Psychiatry', specialization: 'General Adult Psychiatry' },
    { field: 'Clinical Psychology', specialization: 'Cognitive Behavioral Therapy (CBT)' },
    { field: 'Counseling Psychology', specialization: 'Trauma and PTSD' },
    { field: 'School Psychology', specialization: 'Educational and Developmental Assessments' },
    { field: 'Psychiatric-Mental Health Nursing', specialization: 'Child and Adolescent Psychiatry' },
    { field: 'Marriage and Family Therapy', specialization: 'Couples Therapy' },
    { field: 'Psychiatric-Mental Health Nursing', specialization: 'Geriatric Psychiatry' },
    { field: 'Substance Abuse Counseling', specialization: 'Addiction Treatment' },
    { field: 'Dietetics', specialization: 'Eating Disorders and Overeating' },
    { field: 'Psychiatry', specialization: 'Depression and Mood Disorders' },
    { field: 'Clinical Psychology', specialization: 'Anxiety Disorders' },
    { field: 'Counseling', specialization: 'Career Counseling and Workplace Stress' },
    { field: 'Clinical Psychology', specialization: 'Bipolar Disorder' },
];

const Cities = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala',
    'Sargodha', 'Sukkur', 'Mardan', 'Jhelum', 'Hyderabad'
];

const EnrollForm = ({ db, storage }) => {
    const [loading, setLoading] = useState(false);

    const handleEnroll = async (e) => {
        e.preventDefault();
        const form = e.target;
        const fullName = form.fullName.value;
        const pmdcPmc = form.pmdcPmc.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const cnic = form.cnic.value;
        const city = form.city.value;
        const fee = form.fee.value;
        const minutes = form.minutes.value;
        const cv = form.cvFile.files[0];
        const photo = form.photoFile.files[0];
        const socialLinks = form.socialLinks.value;
        const description = form.description.value;
        const specialization = form.specialization.value;
        const field = form.specialization.options[form.specialization.selectedIndex].dataset.field;
        const rating = 0;

        const validPhotoTypes = ['image/jpeg', 'image/webp', 'image/png'];
        const validCVTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

        if (!validPhotoTypes.includes(photo.type)) {
            Swal.fire("Error!", "Photo must be in jpeg, webp, or png format.", "error");
            form.photoFile.value = '';
            return;
        }

        if (!validCVTypes.includes(cv.type)) {
            Swal.fire("Error!", "CV must be in pdf or docx format.", "error");
            form.cvFile.value = '';
            return;
        }

        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            try {
                setLoading(true);

                // Upload CV
                const cvRef = ref(storage, `CVs/${userId}/${cv.name}`);
                await uploadBytes(cvRef, cv);
                const cvUrl = await getDownloadURL(cvRef);

                // Upload Photo
                const photoRef = ref(storage, `Photos/${userId}/${photo.name}`);
                await uploadBytes(photoRef, photo);
                const photoUrl = await getDownloadURL(photoRef);

                // Add user data to Firestore
                await setDoc(doc(db, "Enrolled-Physicians", userId), {
                    userId,
                    fullName,
                    pmdcPmc,
                    email,
                    phone,
                    cnic,
                    city,
                    fee,
                    minutes,
                    cvUrl,
                    photoUrl,
                    socialLinks,
                    description,
                    specialization,
                    field,
                    rating,
                });

                setLoading(false);
                Swal.fire("Success!", "You have been enrolled successfully! Please wait a few minutes to be featured on our platform", "success");
            } catch (error) {
                setLoading(false);
                // console.error("Error enrolling:", error);
                Swal.fire("Error!", "An error occurred while enrolling. Please try again.", "error");
            }
        } else {
            Swal.fire("Not Authenticated!", "Please log in to enroll.", "error");
        }
    }

    return (
        <form className='Enroll-Form' onSubmit={handleEnroll}>
            <div className="row Enroll-Form-Row">
                <div className="col">
                    <p className='Enroll-Form-Details'>Full Name<span className='Req-Star'>*</span></p>
                    <input type="text" name="fullName" className='Enroll-Form-Input' placeholder='Full Name' required />
                </div>
                <div className="col">
                    <p className='Enroll-Form-Details'>Specialization<span className='Req-Star'>*</span></p>
                    <select name="specialization" className='Enroll-Form-Input'>
                        {PsychologyFields.map((v, i) => (
                            <option key={i} value={v.specialization} data-field={v.field}>
                                {v.specialization}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <p className='Enroll-Form-Details'>PMDC/ PMC#<span className='Req-Star'>*</span></p>
                    <input type="text" name="pmdcPmc" className='Enroll-Form-Input' placeholder='1234-D' required />
                </div>
                <div className="col">
                    <p className='Enroll-Form-Details'>Email<span className='Req-Star'>*</span></p>
                    <input type="email" name="email" className='Enroll-Form-Input regex-input' placeholder='Email' required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" />
                </div>
                <div className="col">
                    <p className='Enroll-Form-Details'>Phone<span className='Req-Star'>*</span></p>
                    <input type="text" name="phone" className='Enroll-Form-Input regex-input' placeholder='03XX-XXXXXXX' required pattern="^03[0-9]{2}-[0-9]{7}$" />
                </div>
                <div className="col">
                    <p className='Enroll-Form-Details'>CNIC#<span className='Req-Star'>*</span></p>
                    <input type="text" name="cnic" className='Enroll-Form-Input regex-input' placeholder='XXXXX-XXXXXXX-X' required pattern="^[0-9]{5}-[0-9]{7}-[0-9]$" />
                </div>
                <div className="col">
                    <p className='Enroll-Form-Details'>City<span className='Req-Star'>*</span></p>
                    <select name="city" className='Enroll-Form-Input'>
                        {Cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <p className='Enroll-Form-Details'>Fee per Consultation (PKR)<span className='Req-Star'>*</span></p>
                    <input type="number" name="fee" className='Enroll-Form-Input' placeholder='eg. 4000' required min="1" max="50000" />
                </div>
                <div className="col">
                    <p className='Enroll-Form-Details'>Minutes per Consultation<span className='Req-Star'>*</span></p>
                    <input type="number" name="minutes" className='Enroll-Form-Input' placeholder='eg. 40' required min="1" max="60" />
                </div>
                <div className="col">
                    <p className='Enroll-Form-Details'>CV<span className='Req-Star'>*</span></p>
                    <input type="file" name="cvFile" className='form-control Enroll-Form-Input' required />
                </div>
                <div className="col">
                    <p className='Enroll-Form-Details'>Passport Size Photo<span className='Req-Star'>*</span></p>
                    <input type="file" name="photoFile" className='form-control Enroll-Form-Input' required />
                </div>
                <div className="col">
                    <p className='Enroll-Form-Details'>Social Links<span className='Req-Star'>*</span></p>
                    <input type="text" name="socialLinks" className='Enroll-Form-Input' placeholder='e.g. LinkedIn, Instagram, Facebook' required />
                </div>
                <div className="col Full-Width">
                    <p className='Enroll-Form-Details'>Description<span className='Req-Star'>*</span></p>
                    <textarea name="description" rows={7} className='Enroll-Form-Input' placeholder='A short description about yourself and your achievements...' required></textarea>
                </div>
            </div>
            <div className='Form-Btn-Container'>
                <button type="submit" disabled={loading}>
                    {loading ? <Spinner animation="grow" variant="light" className='Btn-Spinner' /> : 'Enroll'}
                </button>
            </div>
        </form>
    );
};

const EnrollAsPhysician = () => {
    return (
        <div>
            <Navbar />
            <MainPageBanner heading="Enroll as" spanHeading="a Physician" />
            <div>
                <EnrollForm db={db} storage={storage} />
            </div>
            <Footer />
        </div>
    );
}

export default EnrollAsPhysician;