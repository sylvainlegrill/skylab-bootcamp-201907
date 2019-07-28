const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const logic = {
	register: (name, surname, email, password) => {

		// Input validation
		let errors = ''

        if (!name.trim()) {
            errors += 'Name is empty or blank.'
        }
        if (!surname.trim()) {
            if (errors) errors += '\n'
            errors += 'Surname is empty or blank.'
		}

        if (!email.trim()) {
            if (errors) errors += '\n'
            errors += 'E-mail is empty or blank.'
        } else if (!EMAIL_REGEX.test(email)) {
            if (errors) errors += '\n'

            errors += 'E-mail is not valid.'
        }

        if (!password.trim()) {
            if (errors) errors += '\n'

			errors += 'Password is empty or blank.'

        } else if (password.trim().length < 4) {
            if (errors) errors += '\n'
            errors += 'Password is less than 4 characters.'
		}

		if (errors)
			throw new Error(errors)
		else {
			// Database check
			const user = users.find(user => {
				return user.email === email && user.password === password
			})

			if (user) throw new Error('E-mail is already registered.')

			users.push({
				name: name,
				surname: surname,
				email: email,
				password: password
			})
		}
	},

	login: (email, password) => {

		let errors = ''

		if (!email.trim()) {
            if (errors) errors += '\n'
            errors += 'E-mail is empty or blank.'
		} else if (!EMAIL_REGEX.test(email)) {
            if (errors) errors += '\n'
            errors += 'E-mail is invalid.'
		}

		if (!password.trim()) {
            if (errors) errors += '\n'
            errors += 'Password is empty or blank.'
		} else if (password.trim().length < 4) {
            if (errors) errors += '\n'
            errors += 'Password is less than 4 characters.'
		}

		if (errors) throw new Error(errors)

		const user = users.find(user => {
			return user.email === email && user.password === password
		})

		if (!user) throw new Error('Wrong credentials.')
	},

	searchDucks: (query, expression) => {
		const request = new XMLHttpRequest()
		request.open('GET', `http://duckling-api.herokuapp.com/api/search?q=${query}`)
		request.onload = () => {
			const ducks = JSON.parse(request.responseText)
			expression(ducks)
		}
		request.send()
	},

	retrieveDucks: (duckID, expression) => {
		const request = new XMLHttpRequest()
		request.open('GET', `http://duckling-api.herokuapp.com/api/ducks/${duckID}`)
		request.onload = () => {
			const duckDetails = JSON.parse(request.responseText)
			expression(duckDetails)
		}
		request.send()
	}
}
