import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

const EmployeeDetail = () => {
  const { id } = useParams()
  const [employeeData, setEmployeeData] = useState({})

  useEffect(() => {

    fetch(`http://localhost:8000/employee/${id}`)
      .then((res) => {
        console.log(res)
        return res.json()
      })
      .then((res) => {
        setEmployeeData(res)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  return (
    <div>
      <div className="container">
        <div className="card row" style={{ textAlign: "left" }}>
          <div className="card-title">
            <h2>Employee Details</h2>
          </div>
          <div className="card-body"></div>

          {employeeData && (
            <div>
              <h2>
                The Employee name is : <b>{employeeData.name}</b> ({employeeData.id})
              </h2>
              <h3>Contact Details</h3>
              <h5>Email is : {employeeData.email}</h5>
              <h5>Phone is : {employeeData.phone}</h5>
              <Link className="btn btn-danger" to="/">
                Back to Listing
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetail
