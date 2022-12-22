import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

const Edit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();
  
  const updateContact = async (contact) => {
    const {data} = await axios.patch(`http://localhost:3000/contacts/${id}`, contact)
    console.log(data);
    navigate('/')
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const contact = {name, email, phone};
    updateContact(contact);
  }

  return (
    <div className='w-96 mx-auto p-5 shadow rounded-md border'>
    <form 
    onSubmit={onSubmitHandler}
    >
      <div>
        <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <div className="relative mb-6">
          <input
           onChange={(e) => setName(e.target.value)}
            defaultValue={name}
            type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" />
        </div>
      </div>

      <div>
        <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
        <div className="relative mb-6">
          <input 
          onChange={(e) => setEmail(e.target.value)} 
          defaultValue={email} 
          type="email" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com" />
        </div>
      </div>

      <div>
        <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
        <div className="relative mb-6">
          <input 
          onChange={(e) => setPhone(e.target.value)} 
          defaultValue={phone} 
          type="number" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09********" />
        </div>

        <div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
          <Link to='/'>
           <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</button>
          </Link>
        </div>
      </div>
    </form>
  </div>
  )
}

export default Edit