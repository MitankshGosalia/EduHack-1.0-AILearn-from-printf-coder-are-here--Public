import React, { useState } from "react";
import { generateFeedback } from "../services/gptService";

const Dashboard = () => {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    const response = await generateFeedback(input);
    setFeedback(response);
  };

  return (
    <div className="dashboard-container">
      <h1>Get AI Feedback</h1>
      <textarea
        placeholder="Enter your text..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>
      {feedback && (
        <div className="feedback">
          <h3>AI Feedback:</h3>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
