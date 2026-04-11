function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <div className="footer-brand">The Culinary Curator</div>
          <p className="footer-copy">
            © 2024 The Culinary Curator. An Editorial Dining Experience.
          </p>
        </div>

        <div className="footer-links">
          <a href="#">Provenance</a>
          <a href="#">Sustainability</a>
          <a href="#">Membership</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>

        <div className="footer-icons">
          <button className="footer-icon" type="button">
            <span className="material-symbols-outlined">share</span>
          </button>
          <button className="footer-icon" type="button">
            <span className="material-symbols-outlined">mail</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;