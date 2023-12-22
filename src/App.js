import React, { useState } from 'react'

export default function App() {
	const [form, setForm] = useState([])

	const previousIsValid = () => {
		if(form.length === 0){
			return true
		}

		const someEpmty = form.some(
			(item) => item.Username === '' || item.Platform === '' 
		)

		if(someEpmty){
			form.map((item, index) => {
				const allPrev = [...form]
				
				if(form[index].Platform === ''){
					allPrev[index].errors.Platform = "Platform is required"
				}

				if(form[index].Username === ''){
					allPrev[index].errors.Username = "Username is required"
				}

				setForm(allPrev)
			})
		}

		return !someEpmty
	}


	const handleAddLink = (e) => {
		e.preventDefault()
		const inputState = {
			Platform:"", 
			Username: "",

			errors: {
				Platform: null,
				Username: null
			}
		}

		if(previousIsValid()){
			setForm((prev) => [...prev, inputState])
		}

	}

	const onChange = (index, event) => {
		event.preventDefault()

		setForm(prev => {
			return prev.map((item, i) =>{
				if(i !== index){
					return item
				}

				return{ 
					...item,
					[event.target.name]: event.target.value,

					errors: {
						...item.errors,
						[event.target.name]: event.target.value.length > 0 ? null : [event.target.name] + " is required"
					}
				}
			})
		})
	}

	const handleRemoveField = (event, index) =>{
		event.preventDefault()
		event.persist()


		setForm((prev) => prev.filter((item) => item !==prev[index]))

	}

	const submitFunc = () => {

			form.map((item, index) => {
				console.log(index, item.Username, item.Platform)
			})

	}
	return (
		<div className="container mt-5 py-5">
			<div >
				<h1>Add Social Links</h1>
				<p>Add links to sites you want to share with your viewrs</p>

				{JSON.stringify(form)}

			<form>

				{
					form.map((item, index) => (
						<div key={`item-${index}`} className='row mt-3 '>
							<div className="col">
								<input 
									type="text" 
									className={
										item.errors.Platform 
										? "form-control is-invalid"
										: "form-control"
									}
									name="Platform" 
									placeholder='Platform' 
									value={item.Platform}
									onChange={(e) => onChange(index, e)}
								/>

								{item.errors.Platform &&(
									 <div className="invalid-feedback">{item.errors.Platform}</div>
								)}


							</div>
							<div className="col">

								<input 
									type="text" 
									className={
										item.errors.Username 
										? "form-control is-invalid"
										: "form-control "
									}
									name="Username" 
									placeholder='Username' 
									value={item.Username}
									onChange={(e) => onChange(index, e)}
								/>
								{item.errors.Username &&(
									 <div className="invalid-feedback">{item.errors.Username}</div>
								)}
							</div>

							<div className="col">

								<button className="btn btn-warning" onClick={(e) => handleRemoveField(e, index)}>X</button>
							</div>



						</div>
					))
				}

				<button className='btn btn-primary mt-2' onClick={handleAddLink}>Add a clink</button>
			</form>
			<button className="btn btn-danger" onClick={submitFunc}>Submit</button>
		</div>
		</div>

	)
}
