import React, { useState } from 'react';
import axios from 'axios';
import FeeReceipt from './FeeReceipt';

const FeeCollectionForm = () => {
    const [payment, setPayment] = useState({
        receiptNo: '',
        admissionNo: '',
        name: '',
        fatherName: '',
        mobileNo: '',
        class: '',
        feesType: '',
        totalAmount: 0,
        paidAmount: 0,
        discountAmount: 0,
        balanceAmount: 0,
        paymentMode: '',
        receivedAt: '',
        addedAt: '',
    });

    const [showReceipt, setShowReceipt] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayment((prevPayment) => ({
            ...prevPayment,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const receiptNumber = payment.receiptNo;

        axios.put(`https://studentassistant-18fdd-default-rtdb.firebaseio.com/StudentFees/${receiptNumber}.json`, payment)
            .then((response) => {
                alert("Data saved successfully");
                setShowReceipt(true);
            })
            .catch((error) => {
                console.error("There was an error saving the data:", error);
            });
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([document.getElementById('receipt').outerHTML], { type: 'text/html' });
        element.href = URL.createObjectURL(file);
        element.download = "receipt.html";
        document.body.appendChild(element);
        element.click();
    };

    const handleClosePopup = () => {
        setShowReceipt(false);
    };

    const classes = [];
    for (let i = 1; i <= 10; i++) {
        const classNum = i === 1 ? `${i}st -` : i === 2 ? `${i}nd -` : i === 3 ? `${i}rd -` : `${i}th -`;
        ['A', 'B', 'C'].forEach(section => classes.push(`${classNum} ${section}`));
    }

    return (
        <div className="form-container">
            <style>
                {`
                    .form-container {
                        width: 80%;
                        margin: 0 auto;
                        padding: 20px;
                        border: 1px solid #ccc;
                        border-radius: 10px;
                        background-color: #f9f9f9;
                        overflow: hidden;
                    }
                    
                    .form-container h2 {
                        text-align: center;
                        margin-bottom: 20px;
                        color: #333;
                    }

                    .form-fees {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        width:100%
                    }

                    .form-group {
                        display: flex;
                        flex-direction: column;
                        margin-bottom: 15px;
                        flex: 1 1 48%;
                    }

                    .form-group label {
                        font-weight: bold;
                        color: #555;
                        margin-bottom: 5px;
                    }

                    .form-group input,
                    .form-group select {
                        padding: 8px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        font-size: 16px;
                        width: 100%;
                        height: 40px;
                        box-sizing: border-box;
                    }

                    .form-group input::placeholder,
                    .form-group select::placeholder {
                        color: #aaa;
                    }

                    .btn-container {
                        display: flex;
                        justify-content: center;
                        width: 100%;
                        padding-top: 20px;
                    }

                    .btn2 {
                        background-color: #4CAF50;
                        color: white;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        padding: 10px 20px;
                    }

                    .btn2:hover {
                        background-color: #45a049;
                    }

                    .receipt-popup {
                        margin-top: 20px;
                        padding: 20px;
                        border: 1px solid #ccc;
                        border-radius: 10px;
                        background-color: #fff;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        overflow: auto;
                        max-height: 70vh;
                    }

                    .popup-buttons {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 20px;
                    }

                    .popup-buttons button {
                        padding: 10px 20px;
                        font-size: 16px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    }

                    .popup-buttons .close-btn {
                        background-color: #f44336;
                        color: white;
                    }

                    .popup-buttons .close-btn:hover {
                        background-color: #d32f2f;
                    }

                    .popup-buttons .print-btn {
                        background-color: #008CBA;
                        color: white;
                    }

                    .popup-buttons .print-btn:hover {
                        background-color: #007B9E;
                    }

                    .popup-buttons .download-btn {
                        background-color: #FF9800;
                        color: white;
                    }

                    .popup-buttons .download-btn:hover {
                        background-color: #FB8C00;
                    }
                `}
            </style>
            <h2>Fee Collection Form</h2>
            <form onSubmit={handleSubmit} className='form-fees'> 
                <div className="form-group">
                    <label>Receipt No:</label>
                    <input type="text" name="receiptNo" value={payment.receiptNo} onChange={handleChange} placeholder="Enter receipt number" />
                </div>
                <div className="form-group">
                    <label>Admission No:</label>
                    <input type="text" name="admissionNo" value={payment.admissionNo} onChange={handleChange} placeholder="Enter admission number" />
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={payment.name} onChange={handleChange} placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <label>Father Name:</label>
                    <input type="text" name="fatherName" value={payment.fatherName} onChange={handleChange} placeholder="Enter father's name" />
                </div>
                <div className="form-group">
                    <label>Mobile No:</label>
                    <input type="text" name="mobileNo" value={payment.mobileNo} onChange={handleChange} placeholder="Enter mobile number" />
                </div>
                <div className="form-group">
                    <label>Class:</label>
                    <select name="class" value={payment.class} onChange={handleChange}>
                        <option value="">Select Class</option>
                        {classes.map((classOption, index) => (
                            <option key={index} value={classOption}>{classOption}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Fees Type:</label>
                    <select name="feesType" value={payment.feesType} onChange={handleChange}>
                        <option value="">Select Fees Type</option>
                        <option value="Admission fee">Admission fee</option>
                        <option value="Tuition fee">Tuition fee</option>
                        <option value="Computer fee">Computer fee</option>
                        <option value="ID card fee">ID card fee</option>
                        <option value="Annual charges">Annual charges</option>
                        <option value="Monthly fee">Monthly fee</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Total Amount:</label>
                    <input type="number" name="totalAmount" value={payment.totalAmount} onChange={handleChange} placeholder="Enter total amount" />
                </div>
                <div className="form-group">
                    <label>Paid Amount:</label>
                    <input type="number" name="paidAmount" value={payment.paidAmount} onChange={handleChange} placeholder="Enter paid amount" />
                </div>
                <div className="form-group">
                    <label>Discount Amount:</label>
                    <input type="number" name="discountAmount" value={payment.discountAmount} onChange={handleChange} placeholder="Enter discount amount" />
                </div>
                <div className="form-group">
                    <label>Balance Amount:</label>
                    <input type="number" name="balanceAmount" value={payment.balanceAmount} onChange={handleChange} placeholder="Enter balance amount" />
                </div>
                <div className="form-group">
                    <label>Payment Mode:</label>
                    <select name="paymentMode" value={payment.paymentMode} onChange={handleChange}>
                        <option value="">Select Payment Mode</option>
                        <option value="Cash">Cash</option

>
                        <option value="Paytm">Paytm</option>
                        <option value="PhonePe">PhonePe</option>
                        <option value="Amazon Pay">Amazon Pay</option>
                        <option value="Net Banking">Net Banking</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Received At:</label>
                    <input type="datetime-local" name="receivedAt" value={payment.receivedAt} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Added At:</label>
                    <input type="datetime-local" name="addedAt" value={payment.addedAt} onChange={handleChange} />
                </div>
                <div className="btn-container">
                    <button type="submit" className="btn2">Submit Payment</button>
                </div>
            </form>

            {showReceipt && payment.receiptNo && (
                <div className="receipt-popup">
                    <div id="receipt">
                        <FeeReceipt receiptData={payment} />
                    </div>
                    <div className="popup-buttons">
                        <button className="close-btn" onClick={handleClosePopup}>Cancel</button>
                        <button className="print-btn" onClick={handlePrint}>Print</button>
                        <button className="download-btn" onClick={handleDownload}>Download</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeeCollectionForm;