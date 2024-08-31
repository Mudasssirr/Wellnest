import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../componenets/Navbar/navbar";
import ShortDescription from '../componenets/ShortDescription/shortDescription';
import MainLayout from '../componenets/MainLayout/mainLayout';
import AboutUs from '../componenets/About/about';
import OurServices from '../componenets/Services/services';
import Footer from '../componenets/Footer/footer';

function Home() {
  return (
    <div>
      <Navbar />
      <MainLayout />
      <ShortDescription />
      <AboutUs />
      <OurServices />
      <Footer />
    </div>
  );
}

export default Home;