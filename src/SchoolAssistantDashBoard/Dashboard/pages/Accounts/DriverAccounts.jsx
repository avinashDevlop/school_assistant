import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeachAccount.css';

const DriverAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({ name: '', userName: '', password: '', vehicleNo: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [editedAccount, setEditedAccount] = useState({ name: '', userName: '', password: '', vehicleNo: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const baseURL = 'https://studentassistant-18fdd-default-rtdb.firebaseio.com/accounts/Driver';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}.json`);
      const data = response.data;
      if (data) {
        const accountsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          vehicleNo: data[key].Vehicle?.vehicleNo || '',
        }));
        setAccounts(accountsArray);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAccount({ ...editedAccount, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const addAccount = async () => {
    if (newAccount.name && newAccount.userName && newAccount.password && newAccount.vehicleNo) {
      try {
        await axios.put(`${baseURL}/${newAccount.name}.json`, {name:newAccount.name,userName:newAccount.userName,password:newAccount.password});
        await axios.patch(`${baseURL}/${newAccount.name}/Vehicle.json`, { vehicleNo: newAccount.vehicleNo });
        fetchData();
        setNewAccount({ name: '', userName: '', password: '', vehicleNo: '' });
      } catch (error) {
        console.error('Error adding account:', error);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const deleteAccount = async (accountId) => {
    try {
      await axios.delete(`${baseURL}/${accountId}.json`);
      const updatedAccounts = accounts.filter(account => account.id !== accountId);
      setAccounts(updatedAccounts);
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const editAccount = (index, accountId) => {
    setEditIndex(index);
    const accountToEdit = accounts.find(account => account.id === accountId);
    const { id, Vehicle, ...editedAccountWithoutId } = accountToEdit;
    setEditedAccount({ ...editedAccountWithoutId, vehicleNo: Vehicle?.vehicleNo || '' });
  };

  const saveEditedAccount = async (accountId) => {
    if (editedAccount.name && editedAccount.userName && editedAccount.password && editedAccount.vehicleNo) {
      try {
        await axios.patch(`${baseURL}/${accountId}.json`, {name:editedAccount.name,userName:editedAccount.userName,password:editedAccount.password});
        await axios.patch(`${baseURL}/${accountId}/Vehicle.json`, { vehicleNo: editedAccount.vehicleNo });
        fetchData();
        setEditIndex(null);
        setEditedAccount({ name: '', userName: '', password: '', vehicleNo: '' });
      } catch (error) {
        console.error('Error saving edited account:', error);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAccounts = accounts.filter(account =>
    account.name && account.userName &&
    (account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.vehicleNo.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <h3>Accounts/<span>Driver</span></h3>
      <div className="stud-account-container">
        <div className="stud-account-card">
          <h4 className='stud-account-title'>Add Driver Account</h4>
          <div className="stud-account-form">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={newAccount.name}
              onChange={handleInputChange}
              className="stud-account-input"
            />
            <input
              type="text"
              placeholder="Username"
              name="userName"
              value={newAccount.userName}
              onChange={handleInputChange}
              className="stud-account-input"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={newAccount.password}
              onChange={handleInputChange}
              className="stud-account-input"
            />
            <input
              type="text"
              placeholder="Vehicle No."
              name="vehicleNo"
              value={newAccount.vehicleNo}
              onChange={handleInputChange}
              className="stud-account-input"
            />
            <div className='submit'>
              <button onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Show"} Password</button>
              <button onClick={addAccount} className="stud-account-button">Add Account</button>
            </div>
          </div>
        </div>
        <div className="stud-account-search">
          <input
            type="text"
            placeholder="Search Driver Name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="stud-account-input"
          />
        </div>
        <table className="stud-account-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Password</th>
              <th>Vehicle No.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account, index) => (
              <tr key={index}>
                {editIndex === index ? (
                  <>
                    <td>{account.name}</td>
                    <td><input type="text" name="userName" value={editedAccount.userName} onChange={handleEditInputChange} className="stud-account-edit-input" /></td>
                    <td><input type={showPassword ? "text" : "password"} name="password" value={editedAccount.password} onChange={handleEditInputChange} className="stud-account-edit-input" /></td>
                    <td><input type="text" name="vehicleNo" value={editedAccount.vehicleNo} onChange={handleEditInputChange} className="stud-account-edit-input" /></td>
                    <td>
                      <button onClick={() => saveEditedAccount(account.id)} className="stud-account-button">Save</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{account.name}</td>
                    <td>{account.userName}</td>
                    <td>{account.password}</td>
                    <td>{account.vehicleNo}</td>
                    <td>
                      <button onClick={() => editAccount(index, account.id)} className="stud-account-button">Edit</button>
                      <button onClick={() => deleteAccount(account.id)} className="stud-account-button">Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DriverAccount;