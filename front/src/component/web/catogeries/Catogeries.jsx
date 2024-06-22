import { useQuery } from 'react-query';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Link } from 'react-router-dom';
import './catogeries.css';  

const getCategories = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active`);
  return data;
};

export default function Categories() {
  const { data, isLoading, error } = useQuery('web_categories', getCategories);

  if (isLoading) {
    return <div className='loading w-100 vh-100 z-3'><span className="loader"></span></div>;
  }

  if (error) {
    return <div className='error-message'>Error loading categories. Please try again later.</div>;
  }

  return (
    <div className='categories-img container p-5 mt-5 py-5'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        slidesPerGroup={1}
        navigation
        pagination={{ clickable: true, el: '.swiper-custom-pagination' }}
        loop={true}
        autoplay={{ delay: 3000 }} // Adjusted delay for better user experience
        breakpoints={{
          340: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 50,
          }
        }}
      >
        {data?.categories?.length ? (
          data.categories.map((category) => (
            <SwiperSlide key={category._id}>
              <Link to={`/catogeries/${category._id}`} className='text-decoration-none text-black text-start-100'>
                <img src={category.image.secure_url} alt={category.name} className='category-img'/>
                <h2 className='category-name '>{category.name}</h2>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <h2>No categories available</h2>
        )}
      </Swiper>
      <div className='swiper-custom-pagination'></div>
    </div>
  );
}
