 # WasteWatch

**WasteWatch** is an innovative solution aimed at improving waste management using IoT, Machine Learning, and real-time user engagement. The project integrates multiple features, such as automatic detection of trash overflow, notifications to authorities, an ecology-based AI chatbot for assistance, and a community-driven event system for cleanliness drives.

## Features

1. **Trash Detection & Notification System**  
   - A Machine Learning (ML) model using Python and OpenCV to automatically detect trash overflow in public bins.
   - IoT devices installed on trash bins capture images and upload them to AWS S3.
   - If the trash exceeds a certain level, a notification is sent to the relevant authorities with the timestamp and geolocation.

2. **Ecology-based AI Chatbot**  
   - A chatbot that assists users with waste-related inquiries, provides eco-friendly tips, and helps with event participation.
   - Offers information about local waste disposal services and upcoming cleanliness drives.

3. **Interactive Map Feature**  
   - Allows users to locate nearby trash bins and call for garbage collection trucks.
   - Displays the real-time location of trash bins and their status (empty/full).
   - Enables geolocation tagging of overflowing trash bins.

4. **Cleanliness Drive Event Section**  
   - Users can view and join upcoming nearby cleanliness drives.
   - Events are incentivized through an eco-points system, where users earn points for attending drives and can redeem them for rewards.
   - Community-driven system to encourage public participation in environmental activities.

5. **Eco-Point System & Rewards**  
   - Users collect eco-points for engaging in community cleaning efforts and participating in events.
   - Points can be redeemed for coupons and eco-friendly products, fostering a positive feedback loop for involvement.

## Tech Stack

- **Machine Learning & Computer Vision**: Python, OpenCV
- **Cloud Storage**: AWS S3 (for storing trash bin images)
- **IoT**: Devices for capturing and sending bin images
- **Backend**: python, socket.io, node, express, mongodb
- **Deployment**: AWS, Render and Vercel
- **Frontend**: ReactJS, NextJS, ShadcnUI
- **API**: Google Maps API, NotificationsAPI and Gemini

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/devrihan/WasteWatch.git
   cd WasteWatch
   ```

2. **Backend Setup**
   - Install dependencies:
     ```bash
     cd backend
     npm install  # or pip install
     ```
   - Configure environment variables for AWS S3, MongoDB, Twilio, etc.
   - Run the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**
   - Install dependencies:
     ```bash
     cd frontend
     npm install
     ```
   - Run the frontend:
     ```bash
     npm start
     ```

4. **IoT Device Setup**
   - Deploy IoT devices on trash bins with cameras capturing images periodically.
   - Set up image uploading to AWS S3 via the IoT device's firmware.
   - Ensure the IoT devices are connected to the backend for status updates.

5. **ML Model**
   - Ensure the ML model for detecting trash overflow is trained using OpenCV.
   - Integrate the model into the backend, so the images from AWS S3 are analyzed.
   - Notify authorities once the trash threshold is crossed.

6. **Database Setup**
   - Configure MongoDB to store trash bin statuses, user points, event details, and chatbot data.

7. **Notifications**
   - Set up Twilio or any push notification service to alert authorities when bins are full.

## How It Works

1. **Trash Detection**:  
   - IoT devices capture images of trash bins and send them to AWS S3.
   - The backend fetches the image URLs, processes them with the ML model, and detects if the bin is full or overflowing.

2. **Notification System**:  
   - If the bin is full, a notification is sent to the authorities with the geolocation and timestamp of the overflowing bin.

3. **User Interaction**:  
   - Users can interact with the AI chatbot for eco-friendly tips or assistance.
   - The map feature allows users to find trash bins, call garbage trucks, and join cleanliness drives.

4. **Events & Incentives**:  
   - Users earn eco-points by joining and participating in cleanliness events.
   - Points are redeemable for rewards, fostering community participation.

## Contributions

Contributions to the project are welcome! Feel free to submit pull requests or report any issues.

## The Team:

1. **Sk Rihan Akhtar**

2. **Abhilash Sarangi**

3. **Kaustubh Biswas**  

4. **Dibyashakti Moharana** 
