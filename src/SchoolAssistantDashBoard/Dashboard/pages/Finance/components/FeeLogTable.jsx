import React, { useState, useEffect } from 'react';
import './FeeLogTable.css';

const FeeLogTable = () => {
    const [logs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    useEffect(() => {
        if (startDate && endDate) {
            const filtered = logs.filter(log => {
                const receivedAt = new Date(log.receivedAt);
                return receivedAt >= new Date(startDate) && receivedAt <= new Date(endDate);
            });
            setFilteredLogs(filtered);
        } else {
            setFilteredLogs(logs);
        }
    }, [startDate, endDate, logs]);

    return (
        <div className="table-container">
            <h2>Fee Log Table</h2>

            <div className="date-filter">
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Receipt No</th>
                        <th>Admission No</th>
                        <th>Name</th>
                        <th>Father Name</th>
                        <th>Mobile No</th>
                        <th>Class</th>
                        <th>Fees Type</th>
                        <th>Total Amount</th>
                        <th>Paid Amount</th>
                        <th>Discount Amount</th>
                        <th>Balance Amount</th>
                        <th>Payment Mode</th>
                        <th>Received At</th>
                        <th>Added At</th>
                        <th>Remark</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLogs.map((log) => (
                        <tr key={log.receiptNo}>
                            <td>{log.receiptNo}</td>
                            <td>{log.admissionNo}</td>
                            <td>{log.name}</td>
                            <td>{log.fatherName}</td>
                            <td>{log.mobileNo}</td>
                            <td>{log.class}</td>
                            <td>{log.feesType}</td>
                            <td>{log.totalAmount}</td>
                            <td>{log.paidAmount}</td>
                            <td>{log.discountAmount}</td>
                            <td>{log.balanceAmount}</td>
                            <td>{log.paymentMode}</td>
                            <td>{log.receivedAt}</td>
                            <td>{log.addedAt}</td>
                            <td>{log.remark}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeeLogTable;
