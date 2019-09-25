import React from 'react'
//import './index.sass'

export default function (){
    
    return <>
    <section className="presentation">
    <h3 className="presentation--title">How it works</h3>
    <i className="presentation--scrolldown-icon"></i>

    <article className="presentation--steps">
      <i className="presentation--icon">icon</i>
      <i className="presentation--number">1</i>
      <h4 className="presentation--title">Find architects</h4>
      <p className="presentation--subtitle">
        Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </article>

    <article className="presentation--steps">
      <i className="presentation--icon">icon</i>
      <i className="presentation--number">2</i>
      <h4 className="presentation--title">Meet them</h4>
      <p className="presentation--subtitle">
        Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </article>

    <article className="presentation--steps">
      <i className="presentation--icon">logo</i>
      <i className="presentation--number">3</i>
      <h4 className="presentation--title">Start the adventure</h4>
      <p className="presentation--subtitle">
        Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </article>
  </section>
  <section className="projects">
    <div className="projects-div">
      <h3 className="projects--title">Latest Projects</h3>
    </div>
    <figure className="projects-figure">
      <img
        className="projects--carousel"
        alt=""
        src="../../img/project1.jpg"
      ></img>
    </figure>
  </section>
 
  {/* <section className="testimony">
    <div className="testimony-div">
      <h3 className="testimony--title">What people say</h3>
    </div>
    <div>
      <article className="testimony-article">
        <p className="testimony--subtitle">
          Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <h5 className="testimony--name"> Jane Doe </h5>
        <p className="testimony--subname"> happy user</p>
      </article>
    </div>
    <div>
      <article className="testimony-article">
        <p className="testimony--subtitle">
          Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <h5 className="testimony--name"> Justin Doit </h5>
        <p className="testimony--subname"> happy architect</p>
      </article>
    </div>
    </section> */}

  </>
    

}