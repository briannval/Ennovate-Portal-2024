const Footer = () => {
  return (
    <footer>
      <h2 className="wholesome-message" style={{ fontWeight: "200" }}>
        {" "}
        Made with love from the Ennovate Team ♥
      </h2>
      <div className="bottom-row">
        <div className="social-media">
          <a href="mailto:admin@ennovateubc.org" target="_blank">
            <img
              className="social-media-link"
              src={require("./assets/images/EmailLogo.png")}
            ></img>
          </a>
          <a href="https://www.instagram.com/ennovateubc/" target="_blank">
            <img
              className="social-media-link"
              src={require("./assets/images/IG-logo (1).png")}
            ></img>
          </a>
          <a href="https://www.facebook.com/ennovateubc/" target="_blank">
            <img
              className="social-media-link"
              src={require("./assets/images/FBIcon.png")}
            ></img>
          </a>
        </div>
        <p
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
          style={{ cursor: "pointer" }}
        >
          Return to the top
        </p>
      </div>
    </footer>
  );
};

export default Footer;
