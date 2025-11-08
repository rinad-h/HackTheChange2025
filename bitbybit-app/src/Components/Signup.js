import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.text();
      setMessage(data);
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignup} style={styles.form}>
        <h2>Signup</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Signup</button>

        {/* Link back to Login */}
        <a
          href="/"
          style={{
            ...styles.button,
            backgroundColor: "#2196F3",
            marginTop: "0.5rem",
            textAlign: "center",
            display: "block",
            textDecoration: "none",
            lineHeight: "2rem",
          }}
        >
          Go to Login
        </a>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" },
  form: { display: "flex", flexDirection: "column", padding: "2rem", background: "#fff", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" },
  input: { margin: "0.5rem 0", padding: "0.5rem", fontSize: "1rem" },
  button: { padding: "0.5rem", marginTop: "1rem", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
};

export default Signup;
