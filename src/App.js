import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Layout from './component/Layout';
import Home1 from './component/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from './component/product';
import About from './component/Aboutus';
import ContextProvider from './component/context';
import AddProducts from './component/Admin/AddProduct';


function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home1 />} />
            <Route path='/product' element={<Products />} />
            <Route path='/Aboutus' element={<About />} />
            <Route path='/AddProduct' element={<AddProducts />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
