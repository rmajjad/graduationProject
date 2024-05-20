import React, { useContext } from 'react'
import Catogeries from '../catogeries/Catogeries'
import { Link } from 'react-router-dom';
import UserContex from '../context/User.jsx';

export default function Home() {
  const image = ["img/header2.png", "img/header3.png", "img/header1.png"];
  let { UserToken, userData } = useContext(UserContex);


  return (
    <div >
      <section className='header'>

        <div id="carouselExampleCaptions" class="carousel slide">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"><span></span> </button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"><span></span></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"><span></span></button>
          </div>
          <div class="carousel-inner">

            {image.map((ele) => <div class="carousel-item active">

              <img src={ele} class="d-block w-100" alt="background"></img>
              <div class="overlay"></div>

              <div class="carousel-caption">
                <div class="container">
                  <span>Welcome</span>
                  <h1 class="mb-4 text-uppercase">The Best online pharmacy website Experience</h1>
                  <p class="mb-4 mb-md-5">The pharmacist is part of the healthcare team, striving to ensure the safety and health of patients.</p>
                  {UserToken == null ? <> <Link className="btn-one text-capitalize p-sm-3 me-1  text-decoration-none text-uppercase  " to='/login'>Sign IN</Link>
                    <Link className="btn-two text-capitalize p-sm-3 text-decoration-none text-white text-uppercase" to='/register'>Sign up</Link></> :
                    <>
                      <Link className="btn-one text-capitalize p-sm-3 me-1  text-decoration-none text-uppercase  " to='/products'>Proderct</Link>
                      <Link className="btn-two text-capitalize p-sm-3 text-decoration-none text-white text-uppercase" to="/chat">Al's chat</Link></>
                  }


                </div>
              </div></div>)}


          </div>
        </div>
      </section>

      <section>
        <Catogeries />

      </section>
    </div>
  )
}
