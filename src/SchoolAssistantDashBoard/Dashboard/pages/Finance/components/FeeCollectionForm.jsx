import React, { useState } from 'react';
import axios from 'axios';
import './FeeCollectionForm.css';
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
            <h2>Fee Collection Form</h2>
            <form onSubmit={handleSubmit} className='form-fees'>
                <div className="form-group">
                    <label>Receipt No:</label>
                    <input type="text" name="receiptNo" value={payment.receiptNo} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Admission No:</label>
                    <input type="text" name="admissionNo" value={payment.admissionNo} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={payment.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Father Name:</label>
                    <input type="text" name="fatherName" value={payment.fatherName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Mobile No:</label>
                    <input type="text" name="mobileNo" value={payment.mobileNo} onChange={handleChange} />
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
                    <input type="number" name="totalAmount" value={payment.totalAmount} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Paid Amount:</label>
                    <input type="number" name="paidAmount" value={payment.paidAmount} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Discount Amount:</label>
                    <input type="number" name="discountAmount" value={payment.discountAmount} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Balance Amount:</label>
                    <input type="number" name="balanceAmount" value={payment.balanceAmount} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Payment Mode:</label>
                    <select name="paymentMode" value={payment.paymentMode} onChange={handleChange}>
                        <option value="">Select Payment Mode</option>
                        <option value="Cash">Cash</option>
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
                        <button onClick={handlePrint}>Print</button>
                        <button onClick={handleDownload}>Download</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeeCollectionForm;
