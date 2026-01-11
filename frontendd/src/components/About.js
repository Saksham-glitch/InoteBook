import React from 'react';
import './About.css';
const About = () => {
  return (
    <div className="container my-5">
      <h1>About Inotebook</h1>
      <p className="lead">
        Inotebook is a simple and secure note-taking application designed to help you organize your thoughts and ideas. With Inotebook, you can create, edit, and manage your notes effortlessly.
      </p>
      <h2>Features</h2>
      <ul>
        <li><strong>Create Notes:</strong> Easily create new notes with a title, description, and tags to categorize them.</li>
        <li><strong>Edit Notes:</strong> Update your notes anytime to keep them up-to-date.</li>
        <li><strong>Delete Notes:</strong> Remove notes that are no longer needed.</li>
        <li><strong>Secure Access:</strong> Your notes are protected with secure authentication, ensuring that only you can access them.</li>
      </ul>
      <h2>Technologies Used</h2>
      <ul>
        <li><strong>Frontend:</strong> React, Bootstrap</li>
        <li><strong>Backend:</strong> Node.js, Express</li>
        <li><strong>Database:</strong> MongoDB</li>
      </ul>
      <h2>Contact</h2>
      <p>
        If you have any questions or feedback, feel free to reach out to us at <a href="mailto:inotebook@gmail.com">support@inotebook.com</a>.
      </p>
    </div>
  );
};

export default About;