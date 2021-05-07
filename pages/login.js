import {useState} from 'react'



const Login = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handleFormSubmit = async (e) => {
        const credentials = `${process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN}`;
        e.preventDefault()
        await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2021-04/customers.json`, {
            method: 'POST',
            mode:'no-cors',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${credentials}`
            },
            body: {
                "customer": {
                    "first_name": {firstName},
                    "last_name": {lastName}
                }
            }
        })
            .then(res=>res)
        setFirstName('');
        setLastName('');
    }



    console.log(firstName, lastName);

    return (
        <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder='First Name' value={firstName} onChange={handleFirstNameChange}/>
            <input type="text" placeholder='Last name' value={lastName} onChange={handleLastNameChange}/>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default Login