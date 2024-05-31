import React, { useState, useEffect, useRef, useCallback } from 'react';
import { IconButton, FormControl, InputLabel, Select, MenuItem, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import api from '../../../../api';

const AssignedTransportList = () => {
    const [driverOptions, setDriverOptions] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState("");
    const [loadingDrivers, setLoadingDrivers] = useState(false);
    const [studentList, setStudentList] = useState([]);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const tableRef = useRef(null);

    const fetchStudents = useCallback(async (driverName) => {
        try {
            setLoadingStudents(true);
            const response = await api.get(`https://studentassistant-18fdd-default-rtdb.firebaseio.com/accounts/Driver/${driverName}.json`);
            const data = response.data.students || {};
            const students = [];
            for (const [className, sections] of Object.entries(data)) {
                for (const [sectionName, studentEntries] of Object.entries(sections)) {
                    for (const [, studentData] of Object.entries(studentEntries)) {
                        students.push({
                            name: `${studentData.name} ${studentData.surname}`,
                            classSection: `${className} / ${sectionName}`
                        });
                    }
                }
            }
            setStudentList(students);
            setLoadingStudents(false);
        } catch (error) {
            console.error("Error fetching students:", error);
            setLoadingStudents(false);
        }
    }, []);

    const fetchDrivers = useCallback(async () => {
        try {
            setLoadingDrivers(true);
            const response = await api.get('accounts/Driver.json');
            const data = response.data || {};
            const drivers = Object.values(data);
            setDriverOptions(drivers);
            if (drivers.length > 0) {
                const initialDriver = drivers[0].name;
                setSelectedDriver(initialDriver);
                fetchStudents(initialDriver);
            }
            setLoadingDrivers(false);
        } catch (error) {
            console.error("Error fetching drivers:", error);
            setLoadingDrivers(false);
        }
    }, [fetchStudents]);

    useEffect(() => {
        fetchDrivers();
    }, [fetchDrivers]);

    useEffect(() => {
        if (!loadingStudents && studentList.length > 0) {
            tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [loadingStudents, studentList]);

    const handleDriverChange = (event) => {
        const driverName = event.target.value;
        setSelectedDriver(driverName);
        fetchStudents(driverName);
    };

    const handleRefresh = () => {
        fetchDrivers();
    };

    return (
        <div className='assigned-stud'>
            <div className="studGraph">
                <div className="detailStud alldropdowns">
                    <div className="DriverList">
                        <div className="noStud title1">
                            Assigned Student's List for :
                        </div>
                        <div>
                            <FormControl fullWidth variant="filled">
                                <InputLabel id="driver-label">Driver</InputLabel>
                                <Select
                                    labelId="driver-label"
                                    id="driver-select"
                                    value={selectedDriver}
                                    onChange={handleDriverChange}
                                    disabled={loadingDrivers}
                                >
                                    {driverOptions.length > 0 ? (
                                        driverOptions.map((driver, index) => (
                                            <MenuItem key={index} value={driver.name}>
                                                {driver.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No drivers available</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <IconButton onClick={handleRefresh} disabled={loadingDrivers || loadingStudents}>
                        <RefreshIcon />
                    </IconButton>
                </div>
                <div className="student-list">
                    {loadingStudents ? (
                        <CircularProgress />
                    ) : studentList.length > 0 ? (
                        <TableContainer component={Paper} ref={tableRef}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>S.No</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Class/Section</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {studentList.map((student, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>{student.classSection}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <div>No students assigned to this driver.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AssignedTransportList;