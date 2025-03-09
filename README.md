Job Search App

Overview

The Job Search App is a platform designed to connect job seekers with companies looking for talent. It allows users to browse job listings, apply for jobs, and communicate with hiring managers in real-time. Companies can post job openings, manage applications, and interact with potential candidates.

Features

Authentication APIs

User Sign Up (Email verification, OTP-based authentication)

User Login (Email & Password, Google OAuth)

Password Recovery & Reset

Token Refresh Mechanism

Company APIs

Add and manage company profiles

Upload and update company logos and cover images

Soft delete companies (Owner or Admin only)

Fetch company details and associated job listings

Job APIs

HR or Company Owners can post job openings

Update and delete job listings

Filter, search, and sort job openings

Users can apply for jobs with real-time notifications

HR can accept or reject applications

Chat API

Real-time messaging using Socket.IO

Only HR or Company Owners can initiate chats with candidates

Admin Dashboard (GraphQL)

View all users and companies in a single request

Approve or reject company applications

Ban/unban users and companies

Bonus Features

Export job applications to Excel

Problem-solving challenge integration

Seamless integration with frontend

Tech Stack

Backend:

Node.js + Express.js for server-side logic

MongoDB + Mongoose for database management

Socket.IO for real-time chat and notifications

GraphQL for efficient querying

Frontend:

html css js

Other Integrations:

Firebase Cloud Messaging (FCM) for push notifications

AWS S3 for storing resumes and job-related media

Stripe & PayPal for payments (if applicable)

Installation & Setup

Clone the repository:

git clone https://github.com/Eng-Mahmoud-Ramadan-musa/job-search-app.git
cd job-search-app

Install dependencies:

npm install

Set up environment variables:

cp .env.example .env
# Update values inside .env file

Start the backend server:

npm run dev

Start the frontend:

cd frontend
npm install
npm start

API Documentation

For detailed API documentation, refer to the Postman Collection or OpenAPI docs.

Contributing

Fork the repository.

Create a new branch:

git checkout -b feature-branch

Commit your changes:

git commit -m "Added a new feature"

Push to GitHub and create a Pull Request.

License

This project is licensed under the MIT License.

