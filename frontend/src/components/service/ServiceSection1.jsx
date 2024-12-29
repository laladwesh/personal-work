import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from 'react-router-dom';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
};

const ServiceSection1 = ({onKnowMoreClick}) => {
  const { id } = useParams(); // Extract the dynamic part from the URL
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/services/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch slides");
        }
        const data = await response.json();
        setSlides(data.slides); // Assuming the backend returns a `slides` array
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchSlides();
  }, [id]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/price"); // Redirect to PricePage
  }
  return (
    <div className="px-4 md:px-16 lg:px-28 bg-gray-100 gap-y-8 gap-x-8 font-montserrat flex flex-col lg:flex-row h-auto lg:h-[85vh]">
      {/* Left Section: Slider */}
      <div className="bg-white shadow-xl rounded-3xl items-center px-6 w-full lg:w-7/12 md:px-12 lg:px-16 py-6 md:py-8 flex">
        <Slider {...settings} className="w-full h-full">
        {slides.map((slide, index) => (
        <div
          key={index}
          className={`w-full h-[50vh] lg:h-[60vh] flex justify-center items-center bg-gray-200 rounded-2xl`}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-contain rounded-2xl"
          />
        </div>
      ))}
        </Slider>
      </div>

      {/* Right Section: Content */}
      <div className="bg-white shadow-xl gap-y-6 lg:gap-y-8 rounded-3xl flex flex-col px-6 w-full lg:w-5/12 md:px-12 lg:px-16 py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading font-montserrat mb-2 text-center lg:text-left">
          Book Printing
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-[#3d3d3d] leading-relaxed md:leading-loose font-medium text-center lg:text-left">
          Transform your manuscript into a beautifully bound book with our
          top-tier quality and competitive pricing.
        </p>
        <div className="mt-auto w-full flex flex-col gap-4">
          <button
            type="button"
            onClick={onKnowMoreClick}
            className="w-full px-6 py-2 md:px-12 md:py-3 border-2 border-[#5230b2] text-[#5230b2] hover:bg-secondary text-sm md:text-lg lg:text-xl font-semibold rounded-2xl"
          >
            Know the price
          </button>
          <button onClick={handleClick} className="w-full px-6 py-2 md:px-12 md:py-3 bg-[#5230b2] flex justify-center text-white text-sm md:text-lg lg:text-xl font-bold rounded-2xl">
            Place an order
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceSection1