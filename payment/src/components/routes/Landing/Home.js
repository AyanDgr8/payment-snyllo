// src/components/routes/LandingPage/Home.js

import React from 'react';
import BodyPartForm from  './BodyPartForm/BodyPartForm';


export default function Home(){
    return (
        <div>
            <div className='gateway'>
                <BodyPartForm/>
            </div>
        </div>
    );
};