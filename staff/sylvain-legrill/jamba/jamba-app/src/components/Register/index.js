import React, { useState} from 'react'

export default function ({ onBack, onRegister }) {
    
    const [role, setRole] = useState('customer')

    function handleChange(event){ 
        event.preventDefault()
        const {target: { value: role}} = event

        if (role === "architect") {
            setRole('architect') 
        }
        if (role === "customer") {
            setRole('customer')
        }
    }

    return <>
    
        <h2>Register</h2>

        <label>
            Please precise what are you looking for :
            <select  onChange={handleChange} className ="register__selector" name="role"> 
            <option value="customer">I am looking for an architect.</option>
            <option value="architect">I am an architect and want to join Jamba.</option>
            </select>
        </label>
        
        <form onSubmit={event => {  
            if(role==='architect'){
            event.preventDefault()
            
            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email },phone: { value: phone }, password: { value: password }, city: { value: city }, license: { value: license }, specialty: { value: specialty }, profileImg: { value: profileImg }, portfolioUrl: { value: portfolioUrl }, projectImg: { value: projectImg }, description: { value: description } } } = event
            
            onRegister( role, name, surname, email, phone, password, city, license, specialty, profileImg, portfolioUrl, projectImg, description) 
            }else{ debugger
            event.preventDefault()
            const { target: { name: { value: nameC }, surname: { value: surnameC }, email: { value: emailC },phone: { value: phoneC }, password: { value: passwordC } } } = event

            onRegister( role, nameC, surnameC, emailC, phoneC, passwordC)
            }

        }}>
            
        
            <input type="text" name="name" placeholder="name" />
            <input type="text" name="surname" placeholder="surname"/>
            <input type="email" name="email" placeholder="email" />
            <input type="tel" name="phone" placeholder="phone number" />
            <input type="password" name="password" placeholder="password" />
        
        { role === 'architect' && 
            <>
            <input type="text" name="city" placeholder="your city" />
            <input type="text" name="license" placeholder="license" />   
            <select required className ="register__selector" type="text" name="specialty">
            <option defaultValue="" >Select type of professional</option>
            <option value="residential architect">residential architect</option>
            <option value="technical architect">technical architect</option>
            <option value="interior architect">interior architect</option>
            <option value="landscaper">landscaper</option>
            </select>
            <input type="#" name="profileImg" placeholder="your profile picture" />
            <input type="link" name="portfolioUrl" placeholder="add a weblink to your porfolio" />
            <input type="#" name="projectImg" placeholder="image of one of your project" />
            <textarea type="text" name="description" rows="10" cols="30" placeholder="finally describe youself in few lines" />
            </>
        }
            
        
            <button>Proceed</button>
        </form>
        <a href="#" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
    </>
}