import './FullBlog.css';
import Navbar from "../componenets/Navbar/navbar";
import Footer from '../componenets/Footer/footer';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db, doc, getDoc } from '../config/firebase';
import Spinner from 'react-bootstrap/Spinner';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

function FullBlog() {
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState('');
    const query = useQuery();
    const uid = query.get('uid');
    const location = useLocation();

    // To render the blog's detail
    useEffect(() => {
        const fetchBlog = async () => {
            if (uid) {
                try {
                    const docRef = doc(db, "Blogs", uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        // console.log(docSnap.data());
                        setBlog(docSnap.data());
                        setError('');
                    } else {
                        setError('The provided ID did not match any results. Please try again.');
                    }
                } catch (error) {
                    // console.log(error);
                    setError('An error occurred while fetching the blog information. Please try again later.');
                }
            } else {
                setError('Please provide an accurate blog ID.');
            }
        };

        fetchBlog();
    }, [uid]);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts
    }, [location]);

    return (
        <div>
            <Navbar />
            {error ? (
                <div className='DP-Error-Container'>
                    <p className='DP-Error'><i className="bi bi-x-circle-fill"></i> {error}</p>
                </div>
            ) : blog ? (
                <div className='fullBlog-Container'>
                    <div className='fullBlogImg-Container'>
                        <div className='fullBlogImg-InnerContainer'>
                            <img src={blog.ImgUrl} alt="" className='fullBlogImg' />
                        </div>
                    </div>
                    <div className='fullBlog-Heading-Container'>
                        <h1>{blog.blogHeading}</h1>
                    </div>
                    <div className='fullBlog-Details-Container'>
                        <p>{blog.blogDetails}</p>
                    </div>
                </div>
            ) : (
                <div className='DP-Loader-Container'>
                    <Spinner animation="grow" variant="info" className='DP-Loader' />
                </div>
            )}
            <Footer />
        </div>
    );
}

export default FullBlog;