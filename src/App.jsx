import {
  Route,
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider,
} from 'react-router-dom';
import SingleCalc from './components/Pages/SingleCalculator'


function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route>
      <Route index element={<SingleCalc/>} />
      <Route path='MultiCalc' element={<h1>hello</h1>} />
    </Route>
   
  )
  );

  
    return(<RouterProvider router={router} />)
  
}

export default App;
