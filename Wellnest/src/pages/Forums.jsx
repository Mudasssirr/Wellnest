import './Forums.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "../componenets/Navbar/navbar";
import Footer from '../componenets/Footer/footer';
import MainPageBanner from '../componenets/MainPageBanner/mainPageBanner';
import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2';
import { auth, db, collection, addDoc, getDocs, doc, getDoc } from '../config/firebase';
import WellnestLogo from '../Images/WellNest-Logo.jfif';
import UserImg from '../Images/Default-User-Img.jpg';

function Forums() {
    const [question, setQuestion] = useState('');
    const [postLoading, setPostLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Forum-Question"));
                const questionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setQuestions(questionsList);
            } catch (error) {
                console.error("Error fetching questions: ", error);
            } finally {
                setPostLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const saveQuestion = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) {
            Swal.fire("Error!", "Please sign up to ask a question", "error");
        } else if (auth.currentUser && question !== '') {
            setLoading(true);
            const userId = auth.currentUser.uid;
            const docRef = doc(db, "Users", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                const userEmail = userData.email;

                await addDoc(collection(db, "Forum-Question"), {
                    userId,
                    userEmail,
                    question,
                    response: ''
                });

                setLoading(false);
                setQuestion('');
                Swal.fire("Success!", "Your question has been posted successfully!", "success");

                const querySnapshot = await getDocs(collection(db, "Forum-Question"));
                const questionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setQuestions(questionsList);
            } else {
                setLoading(false);
                Swal.fire("Error!", "User data not found.", "error");
            }
        } else {
            Swal.fire("Error!", "Please enter a question", "error");
        }
    };

    return (
        <div>
            <Navbar />
            <MainPageBanner heading="Forums" />
            <div className='Forums'>
                <div className='Forums-Container'>
                    {postLoading ? (
                        <div className='Post-Loader-Container'>
                            <Spinner animation="grow" variant="info" />
                        </div>
                    ) : (
                        questions.map((q) => (
                            <div key={q.id} className='Forum-Cards'>
                                <div className='FM-Details'>
                                    <img src={UserImg} alt="" className='FM-Card-Img' />
                                    <h4 className='FM-Card-Name'>{q.userEmail}</h4>
                                </div>
                                <div>
                                    <p className='FM-Card-Question'>{q.question}</p>
                                </div>
                                {q.response && (
                                    <>
                                        <div className='FM-Details'>
                                            <img src={WellnestLogo} alt="" className='FM-Response-Card-Img' />
                                            <h4 className='FM-Card-Name'>WellNest <i className="bi bi-check-circle-fill"></i></h4>
                                        </div>
                                        <div>
                                            <p className='FM-Card-Question'>{q.response}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
                <div className='Forums-Question-Container'>
                    <div className='Forums-Questions'>
                        <input type="text" className='Question-Input' placeholder='Write a question' value={question} onChange={(e) => setQuestion(e.target.value)} />
                        <button className='Question-Send' onClick={saveQuestion} disabled={loading}>
                            {loading ? <Spinner animation="grow" variant="light" className='Btn-Spinner' /> : 'Post'}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Forums;