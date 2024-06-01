import React from 'react';
import './FeeReceipt.css';

const FeeReceipt = ({ receiptData }) => {
    return (
        <div className="receipt-container">
            <h2 style={{textAlign:'center'}}>FEE RECEIPT</h2>
            <header style={{textAlign:'center'}}> 
                <h4 >SPRING SHINE PUBLIC SCHOOL</h4>
                <p>123, SHASTRI NAGAR, GARH ROAD, GHAZIABAD, UTTAR PRADESH, INDIA - 245101</p>
                <p>AFFILIATED TO: STATE | SCHOOL CODE: 327/2002 | AFFILIATION NO.: 30333</p>
                <p>EMAIL: SUPPORT@VEDMARG.COM | PHONE NO.: 7500969633</p>
            </header>
            <div className="receipt-details">
                <div className="row">
                    <div className="column">
                        <p><strong>Receipt No:</strong> {receiptData?.receiptNo || ''}</p>
                        <p><strong>Admission No:</strong> {receiptData?.admissionNo || ''}</p>
                        <p><strong>Father Name:</strong> {receiptData?.fatherName || ''}</p>
                    </div>
                    <div className="column">
                        <p><strong>Date:</strong> {receiptData?.receivedAt || ''}</p>
                        <p><strong>Payment Mode:</strong> {receiptData?.paymentMode || ''}</p>
                        <p><strong>Student Name:</strong> {receiptData?.name || ''}</p>
                        <p><strong>Class Name:</strong> {receiptData?.class || ''}</p>
                    </div>
                </div>
            </div>
            <table className="fees-table">
                <thead>
                    <tr>
                        <th>Fees Type</th>
                        <th>Total Amount</th>
                        <th>Paid Amount</th>
                        <th>Discount Amount</th>
                        <th>Balance Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{receiptData?.feesType || ''}</td>
                        <td>{receiptData?.totalAmount || 0}</td>
                        <td>{receiptData?.paidAmount || 0}</td>
                        <td>{receiptData?.discountAmount || 0}</td>
                        <td>{receiptData?.balanceAmount || 0}</td>
                    </tr>
                </tbody>
            </table>
            <footer>
                <p><strong>Received By: </strong></p>
            </footer>
        </div>
    );
};

export default FeeReceipt;