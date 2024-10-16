"use client";

import { useState, useEffect } from "react";
import { Button, Card, Dropdown, Nav, Tab, Table } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, LineController } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "@/context/AuthContext";

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, LineController);

const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Users",
      data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
    },
    {
      label: "Posts",
      data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
      borderColor: "rgba(153, 102, 255, 1)",
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      fill: true,
    },
    {
      label: "Engagement",
      data: [2400, 2210, 2290, 2000, 2181, 2500, 2100],
      borderColor: "rgba(255, 159, 64, 1)",
      backgroundColor: "rgba(255, 159, 64, 0.2)",
      fill: true,
    },
  ],
};
interface BannerFormData {
  title: string;
  image: File | null;
  link: string;
}
export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const {
    state: { isLoggedIn, user },
    logout,
  } = useAuth();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const [bannerFormData, setBannerFormData] = useState<BannerFormData>({
    title: '',
    image: null,
    link: '',
  });

  const handleBannerFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target;
    if (id === 'image' && files) {
      setBannerFormData(prev => ({ ...prev, [id]: files[0] }));
    } else {
      setBannerFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleBannerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', bannerFormData.title);
    if (bannerFormData.image) {
      formData.append('image', bannerFormData.image);
    }
    formData.append('link', bannerFormData.link);

    try {
      const response = await fetch('/api/banners', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Banner added successfully!');
        setBannerFormData({ title: '', image: null, link: '' });
      } else {
        const errorData = await response.json();
        alert(`Error adding banner: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to submit form:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside
          className={`bg-dark text-light ${
            sidebarOpen ? "d-flex" : "d-none"
          } flex-column flex-shrink-0 p-3 transition-all duration-300`}
          style={{ width: "250px", position: "fixed", top: 0, bottom: 0, zIndex: 1000 }}
        >
          <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-4">Next Admin</span>
          </div>
          <hr />
          <Nav className="flex-column mb-auto">
            {["Dashboard", "About", "Banner", "Team", "Contact"].map((item) => (
              <Nav.Link
                key={item}
                className={`text-white ${activeTab === item.toLowerCase() ? "active" : ""}`}
                onClick={() => handleTabChange(item.toLowerCase())}
              >
                {item}
              </Nav.Link>
            ))}
          </Nav>
          <hr />
          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              id="dropdown-basic"
              className="d-flex align-items-center text-white text-decoration-none"
            >
              <img
                src="https://github.com/mdo.png"
                alt="Admin"
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <strong>Admin</strong>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-dark text-small shadow">
              <Dropdown.Item href="#">Profile</Dropdown.Item>
              <Dropdown.Item href="#">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#" onClick={logout}>Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </aside>

        {/* Main Content */}
        <div className={`flex-grow-1 d-flex flex-column ${sidebarOpen ? "ms-250" : ""} transition-all duration-300`} style={{ marginLeft: sidebarOpen ? "250px" : "0" }}>
          {/* Navigation */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <Button
                variant="outline-light"
                className="me-2"
                onClick={toggleSidebar}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </Button>
              <a className="navbar-brand" href="#">Next Admin</a>
              <div className="ms-auto d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <Button variant="outline-light">Search</Button>
              </div>
            </div>
          </nav>

          {/* Dashboard Content */}
          <main className="flex-grow-1 p-4">
            <h1 className="h3 mb-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>

            {activeTab === "dashboard" && (
              <>
                {/* Stats Cards */}
                <div className="row g-4 mb-4">
                  {[
                    { title: "Total Users", count: "10,482", change: "+20.1% from last month", color: "primary" },
                    { title: "Total Posts", count: "23,543", change: "+15.2% from last month", color: "success" },
                    { title: "Engagement Rate", count: "58.3%", change: "+7.4% from last month", color: "info" },
                  ].map((stat, index) => (
                    <div className="col-12 col-md-6 col-lg-4" key={index}>
                      <Card className="h-100">
                        <Card.Body>
                          <Card.Title className={`text-${stat.color}`}>{stat.title}</Card.Title>
                          <Card.Text className="display-4">{stat.count}</Card.Text>
                          <Card.Text className="text-muted">{stat.change}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Analytics Overview</Card.Title>
                    <div style={{ height: "300px" }}>
                      <Line
                        data={chartData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </Card.Body>
                </Card>

                {/* Tabs for Forms and Tables */}
                <Tab.Container defaultActiveKey="users">
                  <Nav variant="tabs" className="mb-3">
                    <Nav.Item>
                      <Nav.Link eventKey="users">Users</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="posts">Posts</Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content>
                    <Tab.Pane eventKey="users">
                      <Card>
                        <Card.Body>
                          <Card.Title>Create New User</Card.Title>
                          <form>
                            <div className="mb-3">
                              <label htmlFor="name" className="form-label">Name</label>
                              <input type="text" className="form-control" id="name" placeholder="User's name" />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">Email</label>
                              <input type="email" className="form-control" id="email" placeholder="User's email" />
                            </div>
                            <Button variant="primary" type="submit">Create User</Button>
                          </form>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                    <Tab.Pane eventKey="posts">
                      <Card>
                        <Card.Body>
                          <Card.Title>Recent Posts</Card.Title>
                          <div className="table-responsive">
                            <Table hover>
                              <thead>
                                <tr>
                                  <th>Title</th>
                                  <th>Author</th>
                                  <th>Date</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>First Post</td>
                                  <td>Alice Johnson</td>
                                  <td>2023-07-01</td>
                                  <td>
                                    <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                                    <Button variant="outline-danger" size="sm">Delete</Button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Second Post</td>
                                  <td>John Doe</td>
                                  <td>2023-08-15</td>
                                  <td>
                                    <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                                    <Button variant="outline-danger" size="sm">Delete</Button>
                                  </td> 
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </>
            )}

            {activeTab === "about" && (
              <Card>
                <Card.Body>
                  <Card.Title>About Us</Card.Title>
                  <p>This is the About page content. You can add more information about your company or organization here.</p>
                </Card.Body>
              </Card>
            )}

            {activeTab === "banner" && (
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Add New Banner</Card.Title>
                  <form onSubmit={handleBannerSubmit} >
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Banner Title</label>
                      <input type="text" className="form-control" id="title" placeholder="Enter banner title" value={bannerFormData.title} onChange={handleBannerFormChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Banner Image</label>
                      <input type="file" className="form-control" id="image" onChange={handleBannerFormChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="link" className="form-label">Banner Link</label>
                      <input type="url" className="form-control" id="link" placeholder="Enter banner link" value={bannerFormData.link} onChange={handleBannerFormChange} />
                    </div>
                    <Button variant="primary" type="submit">Add Banner</Button>
                  </form>
                </Card.Body>
              </Card>
            )}

            {activeTab === "team" && (
              <Card>
                <Card.Body>
                  <Card.Title>Team Members</Card.Title>
                  <p>Manage your team members here. You can add, edit, or remove team members from this section.</p>
                </Card.Body>
              </Card>
            )}

            {activeTab === "contact" && (
              <Card>
                <Card.Body>
                  <Card.Title>Contact Information</Card.Title>
                  <p>Update your contact information and manage incoming messages from this section.</p>
                </Card.Body>
              </Card>
            )}
          </main>

          {/* Footer */}
          <footer className="bg-dark text-light py-4 mt-auto">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h5>Next Admin Dashboard</h5>
                  <p>© 2024 Your Company. All rights reserved.</p>
                </div>
                <div className="col-md-6 text-md-end">
                  <ul className="list-inline">
                    <li className="list-inline-item"><a href="#" className="text-light">Privacy Policy</a></li>
                    <li className="list-inline-item"><a href="#" className="text-light">Terms of Use</a></li>
                    <li className="list-inline-item"><a href="#" className="text-light">Contact Us</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}