import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import logic from '../../logic'


export default withRouter (function ({ onBack, onRegister, history }) { 
    
    
    const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : undefined)

    // const handleRegisterArchitect = async (name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description, role) => {
    //     try {
          
    //       await logic.registerArchitect(name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description, role)
    
    //       history.push('/login')
    //     } catch ({ message }) {
    //       console.error('fail register', message)
    //     }
    //   }

    const handleGoToRegisterArchitect = () => {
       
    
        history.push('/register-architect')
      }
    

    return <>
        
        <button className="register__architect"  title="register" onClick={() => {
            handleGoToRegisterArchitect()}}> 👋🏽 Hi there! Are you an architect? Sign up HERE </button>
        <section>
        <form onSubmit={event => {
            event.preventDefault()
            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, phone:{ value: phone}, password: { value: password }, role:{ value: role} } } = event

            onRegister(name, surname, email, phone, password, role)
        }}> 
            <ul>
                <li className="register__form-item">
                    <label htmlFor="name"></label>
                    <input className="register__form-input" type="text" name="name" id="name" placeholder="name" />
                </li>
                <li className="register__form-item">
                    <label htmlFor="surname"></label>
                    <input className="register__form-input" type="text" name="surname" id="surname" placeholder="surname" />
                </li>
                <li className="login__form-item">
                    <label htmlFor="email"></label>
                    <input className="login__form-input" type="email" name="email" id="email"  placeholder="email"/>
                </li>
                <li className="register__form-item">
                    <label htmlFor="phone"></label>
                    <input className="register__form-input" type="text" name="phone" id="phone" placeholder="phone" />
                </li>
                <li className="register__form-item">
                    <label htmlFor="password"></label>
                    <input className="register__form-input" type="password" name="password" id="password" placeholder="password" />
                </li>
                <li className="register__form-item">
                    <input className="register__form-input" type="text" hidden name="role" defaultValue="customer"/>
                </li>
                <li className="register__form-item">
                <button className="register__form-button" type="submit">Confirm sign up</button>
                </li>
            </ul>
        </form>
        <button href="#" className="register__back-button" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</button>
        </section>
    </>
})


// import React, { useState} from 'react'
// import logic from '../../logic'



// export default function ({ onBack, onRegister }) {
//     //let id
//     const [role, setRole] = useState('customer')

//     function handleChange(event){ 
//         event.preventDefault()
//         const {target: { value: role}} = event

//         if (role === "architect") {
//             setRole('architect') 
//         }
//         if (role === "customer") {
//             setRole('customer')
//         }
//     }

//     // async function onRegister(role, name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description){
//     //     try{
//     //             const register = await logic.registerUser(role, name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description)
//     //             id=register

//     //             await logic.uploadImage(id, profileImg)
        
//     //     }catch(error){
//     //         console.log(error.message)
//     //     }
//     // }


//     return <>
    
//         <h2>Register</h2>

//         <label>
//             Please precise what are you looking for :
//             <select  onChange={handleChange} className ="register__selector" name="role"> 
//             <option value="customer">I am looking for an architect.</option>
//             <option value="architect">I am an architect and want to join Jamba.</option>
//             </select>
//         </label>
        
//         <form onSubmit={event => {  
//             if(role==='architect'){
//             event.preventDefault()
            
//             const { target: { name: { value: name }, surname: { value: surname }, email: { value: email },phone: { value: phone }, password: { value: password }, city: { value: city }, license: { value: license }, specialty: { value: specialty }, profileImg: { files: profileImg }, portfolioUrl: { value: portfolioUrl }, projectImg: { value: projectImg }, description: { value: description } } } = event

            
            
//             onRegister( role, name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description) 
//             }else{ 
//             event.preventDefault()
//             const { target: { name: { value: nameC }, surname: { value: surnameC }, email: { value: emailC },phone: { value: phoneC }, password: { value: passwordC } } } = event

//             onRegister( role, nameC, surnameC, emailC, phoneC, passwordC)
//             }
            
//         }} method = "post" encType="multipart/form-data">
            
        
//             <input type="text" name="name" placeholder="name" />
//             <input type="text" name="surname" placeholder="surname"/>
//             <input type="email" name="email" placeholder="email" />
//             <input type="tel" name="phone" placeholder="phone number" />
//             <input type="password" name="password" placeholder="password" />
        
//         { role === 'architect' && 
//             <>
//             <input type="text" name="city" placeholder="your city" />
//             <input type="text" name="license" placeholder="license" />   
//             <select required className ="register__selector" type="text" name="specialty">
//             <option defaultValue="" >Select type of professional</option>
//             <option value="residential architect">residential architect</option>
//             <option value="technical architect">technical architect</option>
//             <option value="interior architect">interior architect</option>
//             <option value="landscaper">landscaper</option>
//             </select>
//             <p>Upload profile picture</p><input type="file" name="profileImg" placeholder="your profile picture" />
//             <input type="url" name="portfolioUrl" placeholder="add a weblink to your porfolio" />
//             <p>Upload picture of one of your project, it will appear on your profile</p><input type="file" name="projectImg" placeholder="image of one of your project" />
//             <textarea type="text" name="description" rows="10" cols="30" placeholder="finally describe youself in few lines" />
//             </>
//         }
            
        
//             <button>Proceed</button>
//         </form>
//         <a href="#" onClick={event => {
//             event.preventDefault()

//             onBack()
//         }}>Go back</a>
//     </>
// }