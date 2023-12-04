//Components
import About from "./Components/About/About";
import BackToTopBtn from "./Components/BackToTopBtn/BackToTopBtn";
import Brands from "./Components/Brands/Brands";
import Cars from "./Components/Cars/Cars";
import CarSlider from "./Components/CarSlider/CarSlider";
import Copyright from "./Components/Copyright/Copyright";
import Cta from "./Components/Cta/Cta";
import DateSelection from "./Components/DateSelection/DateSelection";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import HoursSelection from "./Components/HoursSelection/HoursSelection";
import LocationSelection from "./Components/LocationSelection/LocationSelection";
import Search from "./Components/Search/Search";
import Testimonial from "./Components/Testimonial/Testimonial";
import TestimonialSlider from "./Components/TestimonialSlider/TestimonialSlider";
import Why from "./Components/Why/Why";

export default function Home() {
    return (
        <main className="max-w-[1920px] bg-white mx-auto relative overflow-hidden text-black">
            <Header />
            <Hero />
            <Cars />
            <About />
            <Why />
            <Testimonial />
            <Cta />
            <Footer />
            <BackToTopBtn />
        </main>
    );
}
