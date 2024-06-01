import React from 'react';
import PaymentModeSummary from './components/PaymentModeSummary';
import FeeCollectionForm from './components/FeeCollectionForm';
import FeeLogTable from './components/FeeLogTable';


const Finance = () => {
    return (
        <>
       <h3>Finance Management</h3>
        <div className="Finance-container" style={{display:'flex',flexDirection:'column'}}> 
            <div>
                <FeeCollectionForm />
            </div>
            <div>
                <PaymentModeSummary />
            </div>
            <div>
              <FeeLogTable />
            </div>
        </div>
     </>
    );
};

export default Finance;
