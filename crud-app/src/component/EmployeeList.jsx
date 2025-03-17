import { useEffect, useState } from "react"
import { Link, useNavigate }   from "react-router-dom"
import Highcharts              from 'highcharts'
import HighchartsReact         from 'highcharts-react-official'
import 'bootstrap/dist/css/bootstrap.min.css'

const EmployeeList = () => {
  const navigate = useNavigate()
  const [employeeData, setEmployeeData] = useState(null)

  const details = (id) =>{
    navigate("/employee/detail/"+id)
  }
  const edit = (id) =>{
    navigate("/employee/edit/"+id)
  }
  const remove = (id) =>{
    if(window.confirm("Do you want to remove ?")){
      fetch("http://localhost:8000/employee/"+id,{
        method: "DELETE"
      }).then((resp) => {
        alert("Removed Successfully !")
        window.location.reload()
      })
      .catch((err) => {
        console.log(err.message)
      })
    }
  }

  useEffect(() => {
    fetch("http://localhost:8000/employee")
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        setEmployeeData(resp)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  return (
    <div>
      <h3>Employee List</h3>
      <div className= "divbtn">
        <Link to= "employee/create" className= "btn btn-success">
          Add New (+)
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {employeeData &&
            employeeData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <a
                    onClick={() => {
                      edit(item.id)
                    }}
                    className="btn btn-success"
                  >
                    Edit
                  </a>
                  <a
                    onClick={() => {
                      remove(item.id)
                    }}
                    className="btn btn-danger"
                  >
                    Remove
                  </a>
                  <a
                    onClick={() => {
                      details(item.id)
                    }}
                    className="btn btn-primary"
                  >
                    Details
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeList
