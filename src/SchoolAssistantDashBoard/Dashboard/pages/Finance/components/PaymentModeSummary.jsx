import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMoneyBillWave,
    faMobileAlt,
    faUniversity
} from '@fortawesome/free-solid-svg-icons';
import {
    faPaypal,
    faGoogle,
    faAmazon,
    faCcStripe
} from '@fortawesome/free-brands-svg-icons';
import './PaymentModeSummary.css';

const PaymentModeSummary = () => {
    const [breakdown] = useState({
        cash: 100,
        paytm: 150,
        phonepe: 200,
        googlepay: 250,
        amazonpay: 300,
        netBanking: 350,
        bankTransfer: 400,
        total: 1750
    });

    const paymentModes = [
        { name: "Cash", key: 'cash', icon: faMoneyBillWave },
        { name: "Paytm", key: 'paytm', icon: faPaypal },
        { name: "Phonepe", key: 'phonepe', icon: faMobileAlt },
        { name: "Googlepay", key: 'googlepay', icon: faGoogle },
        { name: "Amazonpay", key: 'amazonpay', icon: faAmazon },
        { name: "NetBanking", key: 'netBanking', icon: faCcStripe },
        { name: "BankTransfer", key: 'bankTransfer', icon: faUniversity },
        { name: "Total Amount", key: 'total', icon: null }
    ];

    return (
        <div className="summary-container">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            {paymentModes.map((mode) => (
                                <th key={mode.name}>
                                    {mode.icon && <FontAwesomeIcon icon={mode.icon} />} {mode.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {paymentModes.map((mode) => (
                                <td key={mode.name}>{breakdown[mode.key]}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentModeSummary;