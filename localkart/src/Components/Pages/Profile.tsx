// src/Components/Pages/ProfilePage.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
} from "@mui/material";

const ProfilePage = () => {
  const { userInfo, logout, updateUserInfo } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const handleVerifyEmail = () => {
    updateUserInfo({ isVerified: true });
    alert("Verification email sent!");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!userInfo) {
    return (
      <Box sx={{ p: 4, maxWidth: "800px", mx: "auto" }}>
        <Typography variant="h5" gutterBottom>
          No user data available
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: "800px", mx: "auto" }}>
      <Card elevation={3} sx={{ p: 4 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "center", sm: "flex-start" },
            flexDirection: { xs: "column", sm: "row" },
            mb: 4,
          }}
        >
          <Avatar
            alt={userInfo.username}
            src={userInfo.profileImage || "/default-avatar.png"}
            sx={{
              width: 100,
              height: 100,
              mr: { sm: 3 },
              mb: { xs: 2, sm: 0 },
            }}
          />
          <Box>
            <Typography variant="h4" gutterBottom>
              {userInfo.username}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {userInfo.email}
              {!userInfo.isVerified && (
                <Button
                  size="small"
                  color="warning"
                  onClick={handleVerifyEmail}
                  sx={{ ml: 2 }}
                >
                  Verify Email
                </Button>
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Member since:{" "}
              {new Date(userInfo.createdAt || Date.now()).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last login:{" "}
              {new Date(userInfo.lastLogin || Date.now()).toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Personal Info */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Full Name"
                secondary={userInfo.fullName || "Not provided"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Phone Number"
                secondary={userInfo.phone || "Not provided"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Address"
                secondary={userInfo.address || "Not provided"}
              />
            </ListItem>
          </List>
        </Box>

        {/* Provider Info */}
        {userInfo.role === "provider" && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Service Provider Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Services Offered"
                  secondary={userInfo.services?.join(", ") || "None"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Rating"
                  secondary={
                    userInfo.rating ? `${userInfo.rating}/5` : "Not rated yet"
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Completed Jobs"
                  secondary={userInfo.completedJobs || "0"}
                />
              </ListItem>
            </List>
          </Box>
        )}

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 3,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditProfile}
            fullWidth
          >
            Edit Profile
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfilePage;
