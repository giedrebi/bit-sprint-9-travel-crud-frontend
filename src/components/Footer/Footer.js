import React from "react";

function Footer() {
  return (
    <footer
      className="text-center pb-2 pt-3 bg-dark"
      style={{
        height: "60px",
        bottom: "0",
        width: "100%",
        position: "absolute",
        color: "orange"
      }}
    >
      <p>&copy; Giedre Bielske "TRAVEL CRUD" 2022</p>
    </footer>
  );
}

export default Footer;