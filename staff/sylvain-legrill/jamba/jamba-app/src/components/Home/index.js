import React, { useState, useEffect } from 'react'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'

export default withRouter(function ({ history, onLogout }) {
    const [user, setUser] = useState()

    useEffect(() => {
        (async () => {
            const user = await logic.retrieveUser()

            setUser(user)
        })()
    }, [history.location])

    return <main className="home">
        Hola, {user && user.name}!
        <button onClick={onLogout}>Logout</button>
        <section class="home__search">
                <h3 class= "home__title-search"> Tell us more about your project</h3> 
             
                <form class= "home__searchlists">
                    <select required class ="home__searchlist--professional">
                        <option value="" disabled selected hidden>Select type of professional</option>
                        <option value="0">residential architect</option>
                        <option value="1">technical architect</option>
                        <option value="2">interior architect</option>
                        <option value="2">landscaper</option>
                    </select>
                    <select required class ="home__searchlist--housing">
                        <option value="" disabled selected hidden>Select type of housing</option>
                        <option value="0">individual house</option>
                        <option value="1">appartment</option>
                        <option value="2">business shop</option>
                        <option value="2">office</option>
                    </select>
                    <select required class ="home__searchlist--city">
                        <option value="" disabled selected hidden>Select a city</option>
                        <option value="0">Barcelona</option>
                        <option value="1">Madrid</option>
                        <option value="2">Valencia</option>
                        <option value="2">Sevilla</option>
                    </select>    
                    
                    <button type="search"class="home__searchlist--button" >search</button>
                    {/* onClick={onSearch} */}
                </form>
            </section>
            <section class= "home__presentation">

                    <h3 class= "home__presentation--scrolldown">How it works</h3>
                    <i class="home__presentation--scrolldown-icon"></i>
                
                <article class= "home__presentation--steps">
                    <i class="home__presentation--icon">icon</i>
                    <i class="home__presentation--number">1</i>
                    <h4 class="home__presentation--title">Find architects</h4>
                    <p class="home__presentation--subtitle"  >Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </article>

                <article class= "home__presentation--steps">
                    <i class="home__presentation--icon">icon</i>
                    <i class="home__presentation--number">2</i>
                    <h4 class="home__presentation--title">Meet them</h4>
                    <p class="home__presentation--subtitle"  >Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </article>

                <article class= "home__presentation--steps">
                        <i class="home__presentation--icon">logo</i>
                        <i class="home__presentation--number">3</i>
                        <h4 class="home__presentation--title">Start the adventure</h4>
                        <p class="home__presentation--subtitle"  >Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </article>
            </section> 
            <section class="home__projects">
                    <div class="home__projects-div">
                        <h3 class="home__projects--title">Latest Projects</h3>
                    </div>  
                    <figure class="home__projects-figure">
                        <img class="home__projects--carousel" alt="" src="../../img/project1.jpg"></img>
                    </figure>     
            </section>
            <section class="home__architects">
                    <div class="home__architects-div">
                        <h3 class="home__architects--title">The architects</h3>
                    </div>  
                    <figure class="home__architects-figure">
                        <img class="home__architects--img" alt="" src="../../img/architects1.jpg"></img>
                        <img class="home__architects--img" alt="" src="../../img/architects2.jpg"></img>
                    </figure>
                    <div class="home__architects-div">
                            <a class= "home__architects--link" href="" title="more architects">more architects</a>
                    </div>    
            </section>

            <section class="home__testimony">
                    <div class="home__testimony-div">
                        <h3 class="home__testimony--title">What people say</h3>
                    </div> 
                    <div>
                    <article class="home__testimony-article">
                            <p class="home__testimony--subtitle"  >Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <h5 class="home__testimony--name"> Jane Doe </h5>
                            <p class="home__testimony--subname"> happy user</p>
                    </article>
                    </div> 
                    <div>
                    <article class="home__testimony-article">
                            <p class="home__testimony--subtitle"  >Lorem ipsum dolor sit amet, consectetur adipist pricing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <h5 class="home__testimony--name"> Justin Doit </h5>
                            <p class="home__testimony--subname"> happy architect</p>
                    </article>
                    </div> 
            </section>


    </main>
})