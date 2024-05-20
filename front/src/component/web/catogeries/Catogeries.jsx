import { useQuery } from 'react-query';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import { Link } from 'react-router-dom';

export default function Catogeries() {
  const getCatogeries = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active`);
    return data;
  }
  const { data, isLoading } = useQuery('web_categories', getCatogeries);
  if (isLoading) {
    return <div className='loading w-100   vh-100 z-3'><span className="loader "></span></div>
  }

  return (

    <>
      <div className='categories-img container p-5 mt-5 py-5'>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={7}
          navigation
          pagination={{
            clickable: true,
            el: '.swiper-custom-pagination'
          }}
          loop={true}
          autoplay={{
            delay: 1000
          }}
        >
          {data?.categories?.length ? data?.categories.map((catogory) =>

            <SwiperSlide key={catogory._id}>
              <Link to={`/catogory/${catogory._id}`}>
                <img src={catogory.image.secure_url} />
              </Link>

            </SwiperSlide>


          ) : <h2>no</h2>}
        </Swiper>
        <div className='swiper-custom-pagination'></div>
      </div>


    </>
  )
}
