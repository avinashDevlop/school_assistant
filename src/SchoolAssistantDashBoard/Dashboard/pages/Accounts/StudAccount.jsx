import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import './StudAccount.css'
import { MaterialReactTable } from "material-react-table";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const StudAccounts = () => {
  const [selectedClass, setSelectedClass] = useState("10th Class");
  const [selectedSection, setSelectedSection] = useState("");
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [dataArray, setDataArray] = useState([]); // New state for dataArray
  const [selectedStudent, setSelectedStudent] = useState(null); // State to manage selected student
  const [newPassword, setNewPassword] = useState(""); // State to store new password
  const [dialogOpen, setDialogOpen] = useState(false); // State to manage dialog open state

  useEffect(() => {
    const fetchClassOptions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/previousYearStudents.json"
        );
        const data = response.data || {};

        const dataArray = Object.entries(data).map(([value, label]) => ({
          value,
          label,
        }));
        setDataArray(dataArray);

        if (data) {
          const fetchedOptions = Object.keys(data).map((className) => ({
            value: className,
            label: className,
          }));
          const options = [
            "10th Class",
            "9th Class",
            "8th Class",
            "7th Class",
            "6th Class",
            "5th Class",
            "4th Class",
            "3rd Class",
            "2nd Class",
            "1st Class",
            "UKG",
            "LKG",
            "Pre-K",
            ...fetchedOptions,
          ];
          setClassOptions(options);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching class options:", error);
      }
    };

    fetchClassOptions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let data; // Declare data variable here

      try {
        setLoading(true);

        if (dataArray.some((item) => item.value === selectedClass)) {
          const response = await axios.get(
            `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/previousYearStudents/${selectedClass}.json`
          );
          data = response.data || {}; // Assign data here
        } else {
          const response = await axios.get(
            `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/${selectedClass}.json`
          );
          data = response.data || {}; // Assign data here
        }
        if (data) {
          const sections = Object.keys(data);
          setSections(sections);
          setSelectedSection(sections[0]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedClass, dataArray]); // Add dataArray to the dependency array

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        let url = "";

        if (dataArray.some((item) => item.value === selectedClass)) {
          url = `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/previousYearStudents/${selectedClass}/${selectedSection}.json`;
        } else {
          url = `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/${selectedClass}/${selectedSection}.json`;
        }

        const response = await axios.get(url);
        setStudentData(response.data || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [selectedClass, selectedSection, dataArray]);

  // Define columns for the table
  const columns = useMemo(
    () => [
      { accessorKey: "SI", header: "SI", size: 25 },
      { accessorKey: "Name", header: "Name", size: 200 },
      { accessorKey: "Gender", header: "Gender", size: 50 },
      { accessorKey: "ContactNo", header: "Contact No", size: 100 },
      { accessorKey: "FatherName", header: "Father Name", size: 150 },
      { accessorKey: "UserName", header: "User Name", size: 150 },
      { accessorKey: "FormNo", header: "Password", size: 150 },
      { 
        accessorKey: "UpdatePassword", 
        header: "Update Password", 
        size: 150, 
        Cell: ({ row }) => (
          <Button variant="outlined" onClick={() => handlePasswordUpdate(row.original)} className="updatePassword">
            Update Password
          </Button>
        )
      },
    ],
    []
  );

  // Format student data for the table
  const formattedStudentData = useMemo(() => {
    return Object.entries(studentData).map(([name, details], index) => ({
      SI: index + 1,
      Name: name,
      Gender: details.gender,
      ContactNo: details.fathersMobileNumber,
      FatherName: details.fathersName,
      UserName: details.email,
      FormNo: details.formNo,
      id: name,
    }));
  }, [studentData]);

  const handlePasswordUpdate = (student) => {
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedStudent(null);
    setNewPassword("");
    setDialogOpen(false);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const updatedStudent = { formNo: newPassword };
      await axios.patch(
        `https://studentassistant-18fdd-default-rtdb.firebaseio.com/admissionForms/${selectedClass}/${selectedSection}/${selectedStudent.id}.json`,
        updatedStudent
      );
      console.log("Password updated successfully");
      handleDialogClose();
    } catch (error) {
      console.error("Error updating password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Accounts/<span>Student</span></h3>
      <div className="detailStud">
        <div className="noStud">Student Accounts</div>
        <div className="dropdown">
          <div className="Class">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {classOptions.map((option, index) => (
                <option key={index} value={option.value || option}>
                  {option.label || option}
                </option>
              ))}
            </select>
          </div>
          <div className="Section">
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              {sections.map((section, index) => (
                <option key={index} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="table-container">
        {loading ? (
          <Box sx={{ width: '100%', height: '500px'}}>
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton animation="wave" height={50} />
            <Skeleton animation={true} height={50} />
          </Box>
        ) : (
          <MaterialReactTable columns={columns} data={formattedStudentData} />
        )}
      </div>
      {/* Password Update Dialog */}
      <BootstrapDialog
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={dialogOpen}
      >
        <DialogTitle sx={{ m: 0, p: 1 }} id="customized-dialog-title">
          Update Password
          <IconButton
            aria-label="close"
            onClick={handleDialogClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Name: {selectedStudent?.Name}
          </Typography>
          <Typography gutterBottom>
            Current Password: {selectedStudent?.FormNo}
          </Typography>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleUpdate}>
            Update
          </Button>
          <Button onClick={handleDialogClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default StudAccounts;