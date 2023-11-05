//Components
import Brands from "../Brands/Brands";
import CarSlider from "../CarSlider/CarSlider";

export default function Cars() {
  return (
    <section className="h-screen flex" id="cars">
      <div className="container mx-auto">
        <Brands />
        <CarSlider />
      </div>
    </section>
  );
}
