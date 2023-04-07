import './App.css';
import AddContact from './Pages/AddContact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <AddContact></AddContact>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
