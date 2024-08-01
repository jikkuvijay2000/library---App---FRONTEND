import axios from "axios";
import React, { useEffect, useState } from "react";
import baseURL from "../Utils/base_url";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function UserListAdmin() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState({});
  const [newUsername, setNewUsername] = useState({});
  const [newEmail, setNewEmail] = useState({});

  useEffect(() => {
    const getallusers = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/getallusers`);
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getallusers();
  }, []);

  const handleClickOpen = (userID) => {
    setOpen((prevOpen) => ({ ...prevOpen, [userID]: true }));
  };

  const handleClose = (userID) => {
    setOpen((prevOpen) => ({ ...prevOpen, [userID]: false }));
  };

  const handledelete = async (userID) => {
    try {
      const response = await axios.put(`${baseURL}/api/deleteUser`, {
        userID: userID,
      });
      toast.warning(`${response.data.username} deleted!`);
      const remainingUser = users.filter((user) => user._id !== userID);
      setUsers(remainingUser);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (userID) => {
    try {
      const response = await axios.put(`${baseURL}/api/edituser/${userID}`, {
        username: newUsername[userID],
        email: newEmail[userID],
      });

      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) => {
          if (user._id === userID) {
            return response.data;
          }
          return user;
        });
        return updatedUsers;
      });

      toast.success("User Edited");
      handleClose(userID);
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className=" p-5" style={{ marginTop: "-70px" }}>
      <div className="container  p-5">
        <h2>
          <b>Registered Users</b>{" "}
        </h2>
        <p>(Admin users are hidden due to company policy)</p>

        <table className="table mt-5">
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <React.Fragment>
                      <Button
                        className="btn btn-primary"
                        onClick={() => handleClickOpen(user._id)}
                      >
                        <EditIcon className="text-warning" />
                      </Button>
                      <Dialog
                        open={open[user._id] || false}
                        onClose={() => handleClose(user._id)}
                      >
                        <DialogTitle>Edit a user </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            You can edit user details using admin privileges!
                          </DialogContentText>
                          <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="Username"
                            label="Username"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={newUsername[user._id] || ""}
                            onChange={(e) =>
                              setNewUsername({
                                ...newUsername,
                                [user._id]: e.target.value,
                              })
                            }
                          />
                          <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={newEmail[user._id] || ""}
                            onChange={(e) =>
                              setNewEmail({
                                ...newEmail,
                                [user._id]: e.target.value,
                              })
                            }
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => handleClose(user._id)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleEdit(user._id)}
                            type="submit"
                          >
                            Edit User
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Button onClick={() => handledelete(user._id)}>
                        <DeleteIcon className="text-danger" />
                      </Button>
                    </React.Fragment>
                  </td>
                </tr>
              ))
            ) : (
              <p>No registered users!</p>
            )}
          </tbody>
        </table>

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}

export default UserListAdmin;
