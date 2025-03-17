import { useState }          from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm }           from "react-hook-form"
import moment from "moment"

const EmployeeCreate = () => {
  
  const [id, setId]                 = useState("")
  const [name, setName]             = useState("")
  const [email, setEmail]           = useState("")
  const [phone, setPhone]           = useState("")
  const [active, setActive]         = useState(true)
  const [validation, setValidation] = useState(false)

  const navigate = useNavigate() 
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) =>{
    const creationDate = moment().format("YYYY-MM-DD HH:mm:ss");

    const employeeData = { 
      name: data.name,
      email: data.email, 
      phone: data.phone, 
      active: data.isActive,
      creationDate
    }

    fetch("http://localhost:8000/employee",{
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body:JSON.stringify(employeeData)
      }).then((res) => {
        alert(`Employee added successfully at ${creationDate}!`)
        navigate("/")
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return ( 
    <div>
      <div className= "row">
        <div className= "offset-lg-3 col-lg-6">
          <form onSubmit= {handleSubmit(onSubmit)} className= "container">

            <div className= "card">
              <div className= "card-title">
                <h2>Employee Create</h2>
              </div>
              <div className= "card-boy">
                <div className= "row">
                  <div className= "col-lg-12">
                    <div className= "form-group">
                      <label>ID</label>
                      <input value= {id} disabled= "disabled" className= "form-control" />
                    </div>
                  </div>
                  <div className= "col-lg-12">
                    <div className= "form-group">
                      <label>Name</label>
                      <input 
                      {...register("name", { required: true })} // Registering the Name field with validation
                      className= {`form-control ${errors.name ? "is-invalid" : ""}`} // Applying form control class and error styling 
                      />
                      {!name && validation && <span className= "text-danger">Enter your name </span>}
                    </div>
                  </div>
                  <div className= "col-lg-12">
                    <div className= "form-group">
                      <label>Email</label>
                      <input 
                      {...register("email", { required: true })} // Registering the Email field with validation
                      className= {`form-control ${errors.email ? "is-invalid" : ""}`} // Applying form control class and error styling 
                      />
                    </div>
                  </div>
                  <div className= "col-lg-12">
                    <div className= "form-group">
                      <label>Phone</label>
                      <input
                      {...register("phone")} // Registering the Phone field
                      className="form-control" // Applying form control class
                      />
                    </div>
                  </div>
                  <div className= "col-lg-12">
                    <div className= "form-check">
                      <input  
                      {...register("isActive")} // Registering the isActive checkbox
                      type="checkbox" 
                      className="form-check-input" // Applying form check input class  
                      />
                      <label  className="form-check-label">Is Active</label>
                    </div>
                  </div>
                  <div className= "col-lg-12">
                    <div className= "form-check">
                      <button className= "btn btn-success" type= "submit">Save</button>
                      <Link to= "/" className= "btn btn-danger">Back</Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </form>

        </div>
      </div>
    </div>
   )
}
 
export default EmployeeCreate