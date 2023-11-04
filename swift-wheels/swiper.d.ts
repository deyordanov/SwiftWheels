declare module "swiper" {
  const Swiper: any;
  export default Swiper;
}

declare namespace JSX {
  interface IntrinsicElements {
    "swiper-container": any;
    "swiper-slide": any;
  }
}
