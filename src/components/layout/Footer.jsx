

function Footer() {
  const footerYear = new Date().getFullYear()
  return (
    <div className="footer p-10 bg-gary-700 text-primary-content footer-center">
      <div>
        <p>Copyright &copy;{footerYear}All rights reservered</p>
      </div>
    </div>
  );
}

export default Footer;