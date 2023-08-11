import axios from 'axios'

export const postRegister = async data => {

    const response = await axios.post('http://localhost:8000/auth/register', data)
  
   
  
    return response.data
  
  }