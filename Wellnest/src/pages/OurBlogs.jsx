import './OurBlogs.css';
import Navbar from "../componenets/Navbar/navbar";
import Footer from '../componenets/Footer/footer';
import MainPageBanner from '../componenets/MainPageBanner/mainPageBanner';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { db, collection, getDocs } from '../config/firebase';
import Swal from 'sweetalert2';
import Spinner from 'react-bootstrap/Spinner';

function OurBlogs() {

    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Blogs"));
                const blogList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // console.log(blogList);
                setFilteredBlogs(blogList);
                setLoading(false);
            } catch (error) {
                // console.error("Error fetching Blogs", error);
                Swal.fire("Error!", "An error occurred while fetching Blogs. Please try again.", "error");
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleSearch = async () => {
        setSearching(true);
        try {
            const querySnapshot = await getDocs(collection(db, "Blogs"));
            const searchValue = searchInput.toLowerCase();
            const matchingBlogs = [];

            querySnapshot.forEach(doc => {
                const blogData = doc.data();
                const blogHeading = blogData.blogHeading || ''; // Avoid null or undefined headings
                const blogDetails = blogData.blogDetails || ''; // Avoid null or undefined details

                // Check for matches in both heading and details
                const headingMatches = searchValue ? blogHeading.toLowerCase().includes(searchValue) : true;
                const detailsMatches = searchValue ? blogDetails.toLowerCase().includes(searchValue) : true;

                if (headingMatches || detailsMatches) {
                    blogData.id = doc.id;
                    matchingBlogs.push(blogData);
                }
            });

            // console.log("Matching blogs:", matchingBlogs); // Log the matching blogs
            setFilteredBlogs(matchingBlogs);
            setSearching(false);
        } catch (error) {
            // console.error("Error searching blogs:", error);
            Swal.fire("Error!", "An error occurred while searching. Please try again.", "error");
            setSearching(false);
        }
    };

    return (
        <div>
            <Navbar />
            <MainPageBanner heading="Our" spanHeading="Blogs" />
            <div className='Filter-Featured-Container'>
                <div className='Filter-Featured'>
                    <div className='Filter-Tag-Container'>
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder='Enter keywords'
                            className='Blog-Search-Input'
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                    <div className='Blog-Search-Btn-Container'>
                        <button className='Blog-Search-Btn' onClick={handleSearch} disabled={searching}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className='Blogs-Container'>
                {loading || searching ? (
                    <Spinner animation="grow" variant="info" style={{ width: 50, height: 50 }} />
                ) : (
                    filteredBlogs.length === 0 ? (
                        <p className='OB-Error-404'>There was an error processing your request. Please try again.</p>
                    ) : (
                        filteredBlogs.map(blog => (
                            <div className="row Blogs-Inner-Container" key={blog.id}>
                                <div className="col">
                                    <img src={blog.ImgUrl} className='Blogs-Img' alt='' />
                                </div>
                                <div className="col Blogs-Text-Container">
                                    <p className='Blogs-Date'>{blog.blogDate}</p>
                                    <h2 className='Blogs-Heading'>{blog.blogHeading}</h2>
                                    <p className='Blogs-Paragraph'>{truncateText(blog.blogDetails, 45)}</p>
                                    <div className="Blog-Btn-Container">
                                        <NavLink to={`../fullblog?uid=${blog.id}`}>
                                            <button className='Blog-Read-More-Btn'>Read More</button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        ))
                    ))
                }
            </div>
            <Footer />
        </div>
    );
}

export default OurBlogs;