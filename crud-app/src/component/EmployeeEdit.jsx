import { useEffect, useState }          from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const EmployeeEdit = () => {
  const { employeeId } = useParams()

  useEffect(() => {
    console.log(employeeId)
    fetch("http://localhost:8000/employee/" + employeeId)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setId(res.id)
        setName(res.name)
        setEmail(res.email)
        setPhone(res.phone)
        setActive(res.active)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const [id, setId]                 = useState("")
  const [name, setName]             = useState("")
  const [email, setEmail]           = useState("")
  const [phone, setPhone]           = useState("")
  const [active, setActive]         = useState(true)
  const [validation, setValidation] = useState(false)

  const navigate = useNavigate() 

  const handleSubmit = (event) =>{
    event.preventDefault()
    const employeeData = {id, name, email, phone, active}

    fetch("http://localhost:8000/employee/"+employeeId,{
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body:JSON.stringify(employeeData)
      }).then((resp) => {
        alert("Saved Successfully !")
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
          <form onSubmit= {handleSubmit} className= "container">

            <div className= "card">
              <div className= "card-title">
                <h2>Employee Edit</h2>
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
                      required 
                      value= {name} 
                      onMouseDown= {(event) => setValidation(true)} 
                      onChange= {(event) => setName(event.target.value)} 
                      className= "form-control" />
                      {!name && validation && <span className= "text-danger">Enter your name </span>}
                    </div>
                  </div>
                  <div className= "col-lg-12">
                    <div className= "form-group">
                      <label>Email</label>
                      <input required value= {email}  onChange= {(event) => setEmail(event.target.value)} className= "form-control" />
                    </div>
                  </div>
                  <div className= "col-lg-12">
                    <div className= "form-group">
                      <label>Phone</label>
                      <input value= {phone}  onChange= {(event) => setPhone(event.target.value)} className= "form-control" />
                    </div>
                  </div>
                  <div className= "col-lg-12">
                    <div className= "form-check">
                      <input type= "checkbox" className= "form-check-input" />
                      <label checked= {active}  onChange= {(event) => setActive(event.target.checked)} className= "form-check-albel">isActive</label>
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
 
export default EmployeeEdit