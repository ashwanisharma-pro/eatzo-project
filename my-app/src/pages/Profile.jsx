import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { AuthContext } from '../context/AuthContext';
import '../assets/css/style.css';
import '../assets/css/profile.css';
import '../assets/css/responsive.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    phone: '',
    city: '',
    address: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      address: '123 Main Street, Alwar, Rajasthan - 301001'
    },
    {
      id: 2,
      type: 'Work',
      address: '456 Office Complex, Alwar, Rajasthan - 301001'
    }
  ]);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log('Profile updated:', profileData);
    alert('Profile updated successfully!');
  };

  const handleEditAddress = (id) => {
    const newAddress = window.prompt("Enter new address details:");
    if (newAddress) {
      setSavedAddresses(prev => prev.map(addr => addr.id === id ? { ...addr, address: newAddress } : addr));
    }
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setSavedAddresses(prev => prev.filter(addr => addr.id !== id));
    }
  };

  const handleAddAddress = () => {
    const type = window.prompt("Enter address type (e.g., Home, Work):") || "Other";
    const address = window.prompt("Enter full specific address details:");
    if (address) {
      const newEntry = {
        id: Date.now(),
        type,
        address
      };
      setSavedAddresses(prev => [...prev, newEntry]);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div>
      <Navbar />
      <main className="container section-gap">
        <div className="profile-page-header">
          <h1>My Profile</h1>
          <p>Manage your personal details and delivery information</p>
        </div>

        <div className="profile-layout">
          <div className="profile-sidebar card">
            <div className="profile-avatar">
              <div className="avatar-circle">{getInitials(profileData.name)}</div>
              <h3>{profileData.name}</h3>
              <p>{profileData.email}</p>
            </div>

            <div className="profile-menu">
              <button
                className={activeSection === 'profile' ? 'active' : ''}
                onClick={() => setActiveSection('profile')}
              >
                Profile Info
              </button>
              <button
                className={activeSection === 'address' ? 'active' : ''}
                onClick={() => setActiveSection('address')}
              >
                Saved Address
              </button>
              <Link to="/orders">My Orders</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>

          <div className="profile-content">
            {activeSection === 'profile' && (
              <div className="profile-card card">
                <h2>Personal Information</h2>

                <form onSubmit={handleProfileSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={profileData.city}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                      id="address"
                      name="address"
                      rows="4"
                      value={profileData.address}
                      onChange={handleProfileChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn">Save Changes</button>
                </form>
              </div>
            )}

            {activeSection === 'address' && (
              <div className="profile-card card">
                <h2>Saved Address</h2>
                <div className="saved-addresses">
                  {savedAddresses.length === 0 ? (
                    <p>No address saved yet.</p>
                  ) : (
                    savedAddresses.map((address) => (
                      <div key={address.id} className="saved-address-item">
                        <div className="address-type">{address.type}</div>
                        <div className="address-details">{address.address}</div>
                        <div className="address-actions">
                          <button className="btn btn-small" onClick={() => handleEditAddress(address.id)}>Edit</button>
                          <button className="btn btn-small btn-danger" onClick={() => handleDeleteAddress(address.id)}>Delete</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <button className="btn" style={{marginTop: '20px'}} onClick={handleAddAddress}>Add New Address</button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
