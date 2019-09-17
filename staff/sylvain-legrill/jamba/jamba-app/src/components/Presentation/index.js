import React from 'react'
//import './index.sass'

export default function (){
    
    return <>
    <section className="home__presentation">
    <h3 className="home__presentation--scrolldown">How it works</h3>
    <i className="home__presentation--scrolldown-icon"></i>

    <article className="home__presentation--steps">
      <i className="home__presentation--icon">icon</i>
      <i className="home__presentation--number">1</i>
      <h4 className="home__presentation--title">Find architects</h4>
      <p className="home__presentation--subtitle">
        Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </article>

    <article className="home__presentation--steps">
      <i className="home__presentation--icon">icon</i>
      <i className="home__presentation--number">2</i>
      <h4 className="home__presentation--title">Meet them</h4>
      <p className="home__presentation--subtitle">
        Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </article>

    <article className="home__presentation--steps">
      <i className="home__presentation--icon">logo</i>
      <i className="home__presentation--number">3</i>
      <h4 className="home__presentation--title">Start the adventure</h4>
      <p className="home__presentation--subtitle">
        Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </article>
  </section>
  <section className="home__projects">
    <div className="home__projects-div">
      <h3 className="home__projects--title">Latest Projects</h3>
    </div>
    <figure className="home__projects-figure">
      <img
        className="home__projects--carousel"
        alt=""
        src="../../img/project1.jpg"
      ></img>
    </figure>
  </section>
 
  {/* <section className="home__testimony">
    <div className="home__testimony-div">
      <h3 className="home__testimony--title">What people say</h3>
    </div>
    <div>
      <article className="home__testimony-article">
        <p className="home__testimony--subtitle">
          Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <h5 className="home__testimony--name"> Jane Doe </h5>
        <p className="home__testimony--subname"> happy user</p>
      </article>
    </div>
    <div>
      <article className="home__testimony-article">
        <p className="home__testimony--subtitle">
          Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <h5 className="home__testimony--name"> Justin Doit </h5>
        <p className="home__testimony--subname"> happy architect</p>
      </article>
    </div>
    </section> */}

  </>
    

}