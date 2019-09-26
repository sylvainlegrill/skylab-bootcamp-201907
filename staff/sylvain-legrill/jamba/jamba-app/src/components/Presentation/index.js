  import React from 'react'
  import lastProject from './../../images/last-project.png'

export default function (){
    
    return <>
    <section className="presentation">
    <h3 className="presentation__title">How it works</h3>
    <i class="fas fa-angle-down"></i>

    <article className="presentation__steps"> 
      <h2 className="presentation__number">1</h2>
      <h4 className="presentation__title">Find architects</h4>
      <p className="presentation__subtitle">
        Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </article>

    <article className="presentation__steps">
      <h2 className="presentation__number">2</h2>
      <h4 className="presentation__title">Meet them</h4>
      <p className="presentation__subtitle">
        Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </article>

    <article className="presentation__steps">
      <h2 className="presentation__number">3</h2>
      <h4 className="presentation__title">Start the adventure</h4>
      <p className="presentation__subtitle">
        Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </article>
  </section>
  <section className="projects">
    <div className="projects-div">
      <h3 className="projects__title">Latest Projects</h3>
    </div>
    <figure className="projects-figure">
        <img className="projects__picture"src={lastProject} alt="MainPicture" />
    </figure>
  </section>
 
  {/* <section className="testimony">
    <div className="testimony-div">
      <h3 className="testimony__title">What people say</h3>
    </div>
    <div>
      <article className="testimony-article">
        <p className="testimony__subtitle">
          Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <h5 className="testimony__name"> Jane Doe </h5>
        <p className="testimony__subname"> happy user</p>
      </article>
    </div>
    <div>
      <article className="testimony-article">
        <p className="testimony__subtitle">
          Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <h5 className="testimony__name"> Justin Doit </h5>
        <p className="testimony__subname"> happy architect</p>
      </article>
    </div>
    </section> */}

  </>
    

}