import { useState } from "react";

type Language = {
  code: string;
  name: string;
};

const Navbar = () => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Español");

  const languages: Language[] = [
    { code: "es", name: "Español" },
    { code: "en", name: "English" },
    { code: "chi", name: "Chinese" },
    { code: "ar", name: "Arabic" },
    { code: "ru", name: "Russian" },
  ];

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen((prev) => !prev);
  };

  const handleLanguageSelect = (languageName: string) => {
    setSelectedLanguage(languageName);
    setIsLanguageDropdownOpen(false);
    console.log(`Idioma seleccionado: ${languageName}`);
  };

  return (
    <nav className="bg-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo y título */}
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

          {/* Selector de idioma */}
          <div className="relative">
            <button
              onClick={toggleLanguageDropdown}
              aria-expanded={isLanguageDropdownOpen}
              aria-haspopup="true"
              className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span className="text-white font-medium">{selectedLanguage}</span>
              <svg
                className={`w-5 h-5 text-white transition-transform duration-200 ${
                  isLanguageDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isLanguageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl overflow-hidden z-20 border border-gray-200">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.name)}
                    className={`block w-full text-left px-4 py-3 text-gray-800 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200 ${
                      selectedLanguage === language.name
                        ? "bg-blue-200 text-blue-800 font-medium"
                        : ""
                    }`}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
