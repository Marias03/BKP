import LanguageDropdown from "../languageDropdown";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <img
              src="/kfu7.png"
              alt="Company Logo"
              className="h-12 w-auto object-contain"
            />
            <span className="text-2xl font-semibold text-white font-sans">
              Foreigners Registration Service
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
