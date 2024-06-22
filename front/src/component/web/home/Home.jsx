import React, { useContext } from 'react'
import Catogeries from '../catogeries/Catogeries'
import { Link } from 'react-router-dom';
import UserContex from '../context/User.jsx';
import './Home.css'
export default function Home() {
  const image = ["img/header2.png","img/header3.png","img/header1.png"];
  let {UserToken,userData} = useContext(UserContex);

  
  return (
    <div >
 <section className='header'>
  <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-indicators">
      {image.map((_, index) => (
        <button key={index} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className={index === 0 ? 'active' : ''} aria-current="true" aria-label={`Slide ${index + 1}`} />
      ))}
    </div>
    <div className="carousel-inner">
      {image.map((ele, index) => (
        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
          <img src={ele} className="d-block w-100" alt="background" />
          <div className="overlay"></div>
          <div className="carousel-caption">
            <div className="container">
              <span>Welcome</span>
              <h1 className="mb-4  text-uppercase">The Best online pharmacy website Experience</h1>
              <p className="mb-4 mb-md-5">The pharmacist is part of the healthcare team, striving to ensure the safety and health of patients.</p>
              {UserToken == null ? (
                <div className='btn'>
                  <Link className="btn-one text-capitalize p-sm-3 me-1 text-decoration-none text-uppercase" to='/login'>Sign IN</Link>
                  <Link className="btn-two text-capitalize p-sm-3 text-decoration-none text-white text-uppercase" to='/register'>Sign up</Link>
                </div>
              ) : (
                <div className='btn'>
                  <Link className="btn-one text-capitalize p-sm-3 me-1 text-decoration-none text-uppercase" to='/products'>Product</Link>
                  <Link className="btn-two text-capitalize p-sm-3 text-decoration-none text-white text-uppercase" to="/chat">Al's chat</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>




     <section>
     <Catogeries/>

     </section>
    </div>
  )
}
