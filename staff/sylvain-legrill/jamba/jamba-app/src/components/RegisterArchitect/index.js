import React, { useState} from 'react'
import logic from '../../logic'
import { withRouter, history } from 'react-router-dom'

export default withRouter (function ({ onBack, history }) {


    async function onRegister(name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description){
        try{    
                const response = await logic.registerArchitect( name, surname, email, phone, password, city, license, specialty, portfolioUrl, projectImg, description)
                const { id } = response
            
                await logic.uploadImage(id, profileImg)

            history.push('/login')
        
        }catch({message}){
            
            console.log(message)
        }
    }

    return <>
        
        <section>

        
        <form className = "register__form" method="post" encType="multipart/form-data" onSubmit={event => {  
            
            event.preventDefault()
            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email },phone: { value: phone }, password: { value: password }, city: { value: city }, license: { value: license }, specialty: { value: specialty }, profileImg: { files: [profileImg] }, portfolioUrl: { value: portfolioUrl }, projectImg: { value: projectImg }, description: { value: description } } } = event
            
            onRegister( name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description) 
            

        }}>
           <ul>
           <li className="register__form-item">
                <label htmlFor="name"></label>
                <input className="register__form-input" type="text" name="name" id="name" placeholder="name" />
            </li>
            <li className="register__form-item">
                <label htmlFor="surname"></label>
                <input className="register__form-input" type="text" name="surname" placeholder="surname" />
            </li>
            <li className="register__form-item">
                <label htmlFor="email"></label>
                <input className="register__form-input" type="email" name="email" placeholder="email" />
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
                <label htmlFor="city"></label>
                <input className="register__form-input" type="text" name="city" placeholder="city where you are operating" />
            </li>
            <li className="register__form-item">
                <label htmlFor="license"></label>
                <input className="register__form-input" type="text" name="license" placeholder="architect license number" />
            </li>
            <li className="register__form-item">
            <select required className ="register__selector" type="text" name="specialty">
                <option defaultValue="" >Select type of professional</option>
                <option value="residential architect">residential architect</option>
                <option value="technical architect">technical architect</option>
                <option value="interior architect">interior architect</option>
                <option value="landscaper">landscaper</option>
            </select>
            </li>
            <li className="register__form-item">
                <label className="register__file-uploader" htmlForm="profileImg"><h3 className="register__file-uploader-title">upload your profile picture:</h3></label>
                <input type="file" name="profileImg" placeholder="upload your profile picture" />
            </li>
            <li className="register__form-item">
                <label htmlForm="portfolioUrl"></label>
                <input className="register__form-input" type="link" name="portfolioUrl" placeholder="add a link to your porfolio" />
            </li>
            <li className="register__form-item">
                    <input className="register__form-input" type="text" hidden name="projectImg" defaultValue="project image"/>
            </li>
            <li className="register__form-item">
                <label htmlFor="description"></label>
                <input className="register__form-input" type="textarea" name="description" placeholder="finally add few words presenting yourself and your work" />
            </li>
            {/* <input type="text" name="city" placeholder="your city" />
            <input type="text" name="license" placeholder="license" />   
            <select required className ="register__selector" type="text" name="specialty">
            <option defaultValue="" >Select type of professional</option>
            <option value="residential architect">residential architect</option>
            <option value="technical architect">technical architect</option>
            <option value="interior architect">interior architect</option>
            <option value="landscaper">landscaper</option>
            </select>
            <p>Upload profile picture</p><input type="file" name="profileImg" placeholder="your profile picture" />
            <input type="link" name="portfolioUrl" placeholder="add a weblink to your porfolio" /> */}
            {/* <input type="text" name="projectImg" placeholder="image of one of your project" /> */}
            {/* <textarea type="text" name="description" rows="10" cols="10" placeholder="finally describe youself in few lines" /> */}
            
        
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

    // async function onRegister(role, name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description){
    //     try{
    //             const register = await logic.registerUser(role, name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description)
    //             id=register

    //             await logic.uploadImage(id, profileImg)
        
    //     }catch(error){
    //         console.log(error.message)
    //     }
    // }


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