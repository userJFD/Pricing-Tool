import {
  Route,
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider,
} from 'react-router-dom';
import SingleCalc from './components/Pages/SingleCalculator'
import MultiCalc from './components/Pages/MultiCalculator';


function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route>
      <Route index element={<SingleCalc/>} />
      <Route path='/multicalc' element={<MultiCalc/>} />
    </Route>
   
  )
  );

  
    return(<RouterProvider router={router} />)
  
}

export default App;
