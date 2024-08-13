import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import Planets from './Planets';
import People from './People';
import Navigation from './Navigation';
import Starships from './Starships';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';


const Layout: React.FC = () => {
  return (
    <>
      <Navigation />
      <Container className="mt-3">
        <Outlet />
      </Container>
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="people" element={<People />} />
      <Route path="planets" element={<Planets />} />
      <Route path="starships" element={<Starships />} />
    </Route>
  )
);

function App() {
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
