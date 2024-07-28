import React from 'react'
import ScreenshotButton from '../ScreenshotButton';
import { Link } from 'react-router-dom';
import MultiTable from '../MultiTable';


const MultiCalculator = () => {
  return (
    <div className='app-container'>
        <Link to="/"> SingleCalc</Link>
        <MultiTable />
        <ScreenshotButton />   
    </div>
  )
}

export default MultiCalculator