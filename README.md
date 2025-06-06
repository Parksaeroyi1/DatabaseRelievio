📦 Backend – Relievio App
This directory handles the backend logic of the Relievio app. It manages all data operations using MongoDB and Mongoose.

🔧 Description
All backend operations are defined here using Express and Mongoose.

Data is fetched via REST API and connected to the React Native Expo frontend using the fetch() API.

Data is stored locally in MongoDB for development and testing purposes.

📂 Structure
/Model – Mongoose schemas (User, Tracker, Symptoms, etc.)

/Routes – Express routes (Auth, Planner, Notifications, etc.)

index.js – Server entry point

▶️ Getting Started
To run the backend locally:

bash
Copy
Edit
npm run dev
Make sure you have a .env file with your MongoDB connection string (e.g. MONGO_URI=your_connection_string).

