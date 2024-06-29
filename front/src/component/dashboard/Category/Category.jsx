import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Category.css";
import "../Users/loader.css";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import 'bootstrap/dist/css/bootstrap.min.css';
function Category() {
  const [loader, setLoader] = useState(true);
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try{
      const token = localStorage.getItem('UserToken');
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/categories`,
    {headers:{Authorization: `Rama__${token}`}});
    console.log(data);
    setCategories(data.categories);
    setLoader(false);
    }catch(error){
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const RemoveCategory = async (id) => {
    setLoader(true);
    const token = localStorage.getItem("UserToken");
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_URL}/categories/${id}`,
      {
        headers:{Authorization: `Rama__${token}`} 
  
      }
    );
    getCategories();
  };
  const MySwal = withReactContent(Swal);

  const handleClick = (id) => {
    const swalWithBootstrapButtons = MySwal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        RemoveCategory(id).then(() => {
          swalWithBootstrapButtons.fire({
            title: 'Deleted!',
            text: 'This item has been successfully deleted.',
            icon: 'success'
          });
        }).catch((error) => {
          swalWithBootstrapButtons.fire({
            title: 'Error!',
            text: 'There was an error deleting the file.',
            icon: 'error'
          });
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: 'Cancelled',
          
          icon: 'error'
        });
      }
    });
  };

  return (
    <>
      {loader == false ? (
        <div className="usersTabel col" style={{ height: 550, backgroundColor: " #e7eff1" }}>
          <div class="table-responsive">
          <table className="table table-striped" border={6} >
            <thead>
              <th scope="col" className="text-center">
                Category Name
              </th>
              <th scope="col" className="text-center">
                Category ID
              </th>
              <th scope="col" className="text-center">
                Category Image
              </th>
              <th scope="col" className="text-center">
                Update Category
              </th>
              <th scope="col" className="text-center">
                Delete Category
              </th>
              <th scope="col" className="text-center">
              Category Products
              </th>
              
            </thead>
            <tbody>
              {categories?.map((categorie) => (
                <tr  key={categorie._id}>
                  <td>
                    <div className="text-center">
                      <span>{categorie.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="text-center">
                      <span>{categorie._id}</span>
                    </div>
                  </td>
                  <td>
                    <div className="text-center cateimg">
                      <img src={categorie.image.secure_url} />
                    </div>
                  </td>
                  <td>
                    <div className="text-center updateUser">
                      <Link
                        to={`/dashboard/UpdateCategory/?id=${categorie._id}&name=${categorie.name}&status=${categorie.status}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                            fill="#86d9f5"
                          />
                        </svg>
                      </Link>
                    </div>
                  </td>
                  <td>
                    <div className="text-center deleteUsers">
                      <button
                        className="btn-light"
                        onClick={() => handleClick(categorie._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          width="20"
                          height="20"
                        >
                          <path
                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                            fill="#86d9f5"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td> 
                  <div className="text-center divstatus">
                    <Link
                      className="btn-light btnStatus"
                     
                      to={`/dashboard/CategoryProducts/?id=${categorie._id}`}
                      >
                  Products
                    </Link>
                  </div>
                </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
                <tr>
                  <td className="bg-light" colSpan={6}></td>
                </tr>
              </tfoot>
           
          </table>
          </div>
          <div className="goToAddUser">
          <Link to="/dashboard/AddCategory">
                      {" "}
                      <button className="linkAdd">Add Category</button>{" "}
             </Link>
          </div>
        </div>
      ) : (
        <div className="loading w-100   vh-100 z-3">
          <span className="loader "></span>
        </div>
      )}
    </>
  );
}

export default Category;
