//components
import TestimonialSlider from "../TestimonialSlider/TestimonialSlider";

export default function Testimonial() {
  return (
    <section
      className="section flex items-center bg-green-200"
      id="testimonials"
    >
      <div className="container mx-auto">
        <TestimonialSlider />
      </div>
    </section>
  );
}
