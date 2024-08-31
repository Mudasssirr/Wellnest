import './footer.css'

function Footer() {
    return (
        <div className="footer">
            <div className='contactBannerContainer'>
                <div className='contactBanner'>
                    <p>Feel Free to Contact</p>
                    <div className='contactBannerNumberContainer'>
                        <p className='contactBannerNumber'>555-333-212</p>
                    </div>
                </div>
            </div>
            <div className="fLists">
                <div className="fList Outro">
                    <h2 className='fHeading footerlogo'>WellNest</h2>
                    <p className='fParagraph'>Welcome to WellNest, your premier destination for comprehensive online mental health services in Pakistan.</p>
                </div>
                <ul className="fList">
                    <h2 className='fHeading'>Useful Links</h2>
                    <li className="fListItem">Products</li>
                    <li className="fListItem">Features</li>
                    <li className="fListItem">Marketplace</li>
                    <li className="fListItem">Pricing</li>
                    <li className="fListItem">Company</li>
                </ul>
                <ul className="fList">
                    <h2 className='fHeading'>Contact Us</h2>
                    <p className='contactDetails'><i className="bi bi-telephone-fill"></i> 555-333-212</p>
                    <p className='contactDetails'><i className="bi bi-envelope-at-fill"></i> mudassir@wellnest.com</p>
                </ul>
                <div className="fList">
                    <h2 className='fHeading'>Social Links</h2>
                    <div className='socialIcons'>
                        <div>
                            <i className="bi bi-facebook"></i>
                            <i className="bi bi-youtube"></i>
                        </div>
                        <div>
                            <i className="bi bi-instagram"></i>
                            <i className="bi bi-twitter-x"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fText">Copyright © 2024 WellNest.</div>
        </div>
    )
}

export default Footer;