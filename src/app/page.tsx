"use client";
// src/app/page.tsx (Home page)
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image"; // Importing Next.js Image component for optimized images
import { useEffect, useState } from "react";
//banner interface

interface IBanner {
  _id: string;
  title: string;
  image: string;
  link: string;
  createdAt: Date;
}

export default function Home() {
  const [banner, setBanner] = useState<IBanner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //make get request
    fetch('/api/banners')
      .then(res => res.json())
      .then(data => {
        setBanner(data.banner)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])
  if (loading) {
    return (
      <p>Loading...</p>
    )
  }
  return (
    <>
      {/* Head component to manage the page's metadata */}
      <Navbar />
      <main>
        <Head>
          <title>Home | My Next.js Website</title>
          <meta
            name="description"
            content="Welcome to the homepage of My Next.js Website"
          />
        </Head>

        {/* Main hero section with welcome message */}
        <section className="bg-banner text-center py-5">
          <div className="container">
            <h1 className="display-4 fw-bold text-dark">Welcome to My Next.js Website</h1>
            <p className="lead">
              {banner?.title}
            </p>
            <a href={banner?.link} className="btn btn-primary btn-lg mt-3">
              Learn More
            </a>
            {banner?.image && (
              <Image
                src={banner.image}
                alt={banner.title}
                width={800}
                height={400}
                className="img-fluid mt-4"
              />
            )}
          </div>
        </section>

        {/* About section with image */}
        <section
          id="about"
          className="py-5"
          style={{ backgroundColor: "#f8f9fa", padding: "20px" }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h2 style={{ color: "#333" }}>About Us</h2>
                <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                  We are a forward-thinking company dedicated to providing
                  top-notch solutions to meet your business needs.
                </p>
                <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                  Our team of professionals is here to help you succeed.
                </p>
              </div>
              <div className="col-md-6 text-center">
                {/* Using Next.js Image component for optimized loading */}
                <Image
                  src="/images/about-img.png"
                  alt="About Us"
                  width={500}
                  height={300}
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services section */}
        <section id="services" className="bg-light py-5">
          <div className="container">
            <h2 className="text-center mb-4">Our Team</h2>
            <div className="row">
              <div className="col-md-4 text-center">
                <div className="card shadow-sm">
                  <Image
                    src="/images/client-1.jpg"
                    alt="Service 1"
                    width={350}
                    height={200}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Web Development</h5>
                    <p className="card-text">
                      We build responsive, modern, and user-friendly websites.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="card shadow-sm">
                  <Image
                    src="/images/client-2.jpg"
                    alt="Service 2"
                    width={350}
                    height={200}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">SEO Optimization</h5>
                    <p className="card-text">
                      Our SEO services will help you rank higher in search
                      engines.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="card shadow-sm">
                  <Image
                    src="/images/client-1.jpg"
                    alt="Service 3"
                    width={350}
                    height={200}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Digital Marketing</h5>
                    <p className="card-text">
                      Grow your online presence with our expert marketing
                      strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section
          id="contact"
          className="py-5"
          style={{
            backgroundColor: "#f8f9fa", // Light background color for the section.
            padding: "50px 0",
          }}
        >
          <div
            className="container"
            style={{
              maxWidth: "900px", // Restricting the container width to keep content centered.
              backgroundColor: "#ffffff", // White background for the form section.
              padding: "30px",
              borderRadius: "8px", // Rounded corners for better visual appeal.
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for the card look.
            }}
          >
            <h2
              className="text-center mb-4"
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#333", // Dark color for the heading.
                marginBottom: "20px",
              }}
            >
              Get in Touch
            </h2>
            <div className="row">
              <div className="col-md-6">
                <h4
                  style={{
                    fontSize: "24px",
                    marginBottom: "15px",
                    color: "#0056b3", // Blue color to match the theme.
                  }}
                >
                  Contact Information
                </h4>
                <p>
                  <strong>Email:</strong>{" "}
                  <span style={{ color: "#333" }}>contact@nextjswebsite.com</span>
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <span style={{ color: "#333" }}>+123 456 7890</span>
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  <span style={{ color: "#333" }}>
                    123 Business Street, City, Country
                  </span>
                </p>
              </div>
              <div className="col-md-6">
                <h4
                  style={{
                    fontSize: "24px",
                    marginBottom: "15px",
                    color: "#0056b3",
                  }}
                >
                  Send Us a Message
                </h4>
                <form>
                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className="form-label"
                      style={{ fontWeight: "bold" }}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      style={{
                        padding: "10px",
                        borderColor: "#ddd",
                        borderRadius: "6px",
                        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label"
                      style={{ fontWeight: "bold" }}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      style={{
                        padding: "10px",
                        borderColor: "#ddd",
                        borderRadius: "6px",
                        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="message"
                      className="form-label"
                      style={{ fontWeight: "bold" }}
                    >
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows={3}
                      style={{
                        padding: "10px",
                        borderColor: "#ddd",
                        borderRadius: "6px",
                        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
                      }}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      backgroundColor: "#007bff", // Custom button color.
                      borderColor: "#007bff",
                      padding: "10px 20px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      borderRadius: "6px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
