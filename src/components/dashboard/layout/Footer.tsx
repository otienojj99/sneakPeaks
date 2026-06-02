const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 px-6 border-t border-gray-100 bg-white">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm text-gray-400">
          © {currentYear}{" "}
          <span className="font-semibold text-gray-600">SneakPeaks</span>. All
          rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-primary-600 transition-colors"
          >
            Support
          </a>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-primary-600 transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-primary-600 transition-colors"
          >
            Terms
          </a>
          <span className="text-xs text-gray-300">v1.0.0</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
