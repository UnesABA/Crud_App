import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeList                     from "./component/EmployeeList";
import EmployeeCreate                   from "./component/EmployeeCreate";
import EmployeeEdit                     from "./component/EmployeeEdit";
import EmployeeDetail                   from "./component/EmployeeDetail";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"

function App() {
  return (
    <>
      <div className="app">React JS CRUD Opertations</div>
      <BrowserRouter>
        <Routes>
          <Route path= "/" element= {<EmployeeList />}></Route>
          <Route path= "/employee/create"           element= {<EmployeeCreate />}></Route>
          <Route path= "/employee/edit/:employeeId" element= {<EmployeeEdit />}></Route>
          <Route path= "/employee/detail/:id"       element= {<EmployeeDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
