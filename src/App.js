import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Layout from './component/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContextProvider from './component/context';
import Pages from './component/Pages';
import ListOrderProvider from './component/contextTwo';


function App() {
  return (
    <ContextProvider>
      <ListOrderProvider>
        <BrowserRouter>
          <Layout>
            <Pages />
          </Layout>
        </BrowserRouter>
      </ListOrderProvider>
    </ContextProvider>
  );
}

export default App;
