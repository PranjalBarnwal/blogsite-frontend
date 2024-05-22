import { Link,Outlet } from 'react-router-dom';
import Navbar from './components/utils/Navbar';

function App() {
  return (
    <div className='px-10 py-5 h-[100vh]'>
      <Navbar/>
      <Outlet/>
     
    </div>
  );
}

export default App;
