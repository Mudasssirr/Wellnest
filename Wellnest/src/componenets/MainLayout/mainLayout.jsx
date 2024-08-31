import './mainLayout.css'
import Col from 'react-bootstrap/Col';
import mainLayoutImg1 from '../../Images/mainLayoutImg-1.jpg';
import mainLayoutImg2 from '../../Images/mainLayoutImg-2.jpg';
import mainLayoutImg3 from '../../Images/mainLayoutImg-3.jpg';
import mainLayoutImg4 from '../../Images/mainLayoutImg-4.jpg';
import mainLayoutImg5 from '../../Images/mainLayoutImg-5.webp';

function MainLayout() {
    return (
        <div style={{ display: 'flex', marginTop: '-15px' }}>
            <div className='MainLayout-Container'>
                <Col className='MainLayout-Heading'>
                    <h2>Welcome to WellNest</h2>
                    <h1>Your Gateway to</h1>
                    <h1 className="Important-Txt">Mental Wellness!</h1>
                </Col>
                <div className="img-container">
                    <div className="row">
                        <div className="col">
                            <img src={mainLayoutImg1} className='MainLayout-Img1' alt='' />
                        </div>
                        <div className="col">
                            <img src={mainLayoutImg2} className='MainLayout-Img2' alt="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <img src={mainLayoutImg3} className='MainLayout-Img3' alt="" />
                        </div>
                        <div className="col">
                            <img src={mainLayoutImg4} className='MainLayout-Img4' alt="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <img src={mainLayoutImg5} className='MainLayout-Img5' alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='design-Container'></div>
        </div>
    );
}

export default MainLayout;