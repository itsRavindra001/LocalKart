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
  Alert,
} from "@mui/material";

interface UserData {
  username: string;
  email: string;
  fullName?: string;
  phone?: string;
  address?: string;
  isVerified: boolean;
  createdAt: string;
  lastLogin: string;
  profileImage?: string;
}

const ProfilePage = () => {
  const { userInfo, logout, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://your-backend-api.com/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data: UserData = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [token]);

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const handleVerifyEmail = () => {
    // Implement email verification logic
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

  if (error) {
    return (
      <Box sx={{ p: 4, maxWidth: "800px", mx: "auto" }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          variant="contained" 
          sx={{ mt: 2 }}
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  if (!userData) {
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
            alt={userData.username}
            src={userData.profileImage || "/default-avatar.png"}
            sx={{
              width: 100,
              height: 100,
              mr: { sm: 3 },
              mb: { xs: 2, sm: 0 },
            }}
          />
          <Box>
            <Typography variant="h4" gutterBottom>
              {userData.username}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {userData.email}
              {!userData.isVerified && (
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
              Member since: {new Date(userData.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last login: {new Date(userData.lastLogin).toLocaleString()}
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
                secondary={userData.fullName || "Not provided"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Phone Number"
                secondary={userData.phone || "Not provided"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Address"
                secondary={userData.address || "Not provided"}
              />
            </ListItem>
          </List>
        </Box>

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