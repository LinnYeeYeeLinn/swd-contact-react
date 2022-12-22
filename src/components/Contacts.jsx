import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai';
import Swal from 'sweetalert2';

const Contacts = () => {
  const [contact, setContact] = useState([]);

  const getContactsFromApi = async () => {
    const {data} = await axios.get('http://localhost:3000/contacts');
    setContact(data);
  }

  const swalWithButtons = Swal.mixin({
    customClass: {
      confirmButton: 'bg-green-500 py-2 px-5 rounded shadow-lg cursor-pointer border-0 text-white mx-1',
      cancelButton: 'bg-red-500 py-2 px-5 rounded shadow-lg cursor-pointer border-0 text-white mx-1'
    },
    buttonsStyling: false
  })
  
  const deleteContact = async (id) => {
    swalWithButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed) {
        swalWithButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )

        const {data} = await axios.delete(`http://localhost:3000/contacts/${id}`);
        console.log(data);
        getContactsFromApi();

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }


  useEffect(() => {
    getContactsFromApi();
  }, [])


  return ( 
    <>
      <Link to='/create'>
        <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Create new contact</button>
      </Link>
      <div className="overflow-x-auto relative mt-5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="py-3 px-6">
                          Name
                      </th>
                      <th scope="col" className="py-3 px-6">
                          Email Address
                      </th>
                      <th scope="col" className="py-3 px-6">
                          Phone Number
                      </th>
                      <th scope="col" className="py-3 px-6">
                          Actions
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {
                    contact?.map(contact => (
                      <tr key={contact.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {contact.name}
                        </th>
                        <td className="py-4 px-6">
                            {contact.email}
                        </td>
                        <td className="py-4 px-6">
                            {contact.phone}
                        </td>
                        <td className="py-4 px-6 flex gap-3">
                          <Link to={`/edit/${contact.id}`}>
                            <AiFillEdit className='cursor-pointer text-blue-500 text-lg'/>
                          </Link>
                          <AiFillDelete onClick={() => deleteContact(contact.id)} className='cursor-pointer text-red-500 text-lg'/>
                        </td>
                      </tr>
                    ))
                  }
              </tbody>
          </table>
      </div>
    </>
  )
}

export default Contacts