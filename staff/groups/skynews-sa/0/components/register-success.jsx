function RegisterSuccess({ onLogin }) {
    return <>
    <main>
        <nav className="reg__success-nav">
            <img className="fav-logo-bco" src="style/img/skynews-logo-bco.png"></img> 

        </nav>
        <section className="reg__success-section">
            <p>User successfully registered, you can now proceed to <a href="" onClick={event => {
                    event.preventDefault()

                    onLogin()
                }}>login</a>.
            </p>
        </section>
    </main>
    </>
}