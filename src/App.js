import RegistrationForm from "./Components/RegistrationForm";
import SearchPanel from "./Components/SearchPanel";
import SignIn from "./Components/SignIn";
import Error from "./Components/Error";
import { BrowserRouter, Route, Routes } from "react-router-dom";




function App() {
  return <BrowserRouter>

     <Routes>
        <Route path="register" element={<RegistrationForm />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="/" element={<SearchPanel />}/>
        <Route path="*" element={<Error/>} />
     </Routes>
  </BrowserRouter>
}

export default App;
