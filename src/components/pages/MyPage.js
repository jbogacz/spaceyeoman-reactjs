import React from 'react';

import { MyDetails } from '../MyDetails';


export const MyPage = ({ match }) => (
    <div className="page">
        <MyDetails id={match.params.id}/>
    </div>
);