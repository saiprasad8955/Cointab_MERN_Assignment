import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Errorpage from './Components/Errorpage';
import Homepage from './Components/Homepage';
import UserDetails from './Components/UserDetails'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
