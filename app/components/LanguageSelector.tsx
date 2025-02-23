'use client';

export interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LANGUAGES = [
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Chinese',
  'Japanese',
  'Korean'
];

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor="language-select" className="text-base font-semibold text-gray-700">
        Learning Language
      </label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="w-48 rounded-xl border-2 border-gray-100 bg-white/90 px-4 py-2
          text-gray-800 font-medium shadow-sm backdrop-blur-sm
          focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 focus:outline-none
          transition-all duration-200 hover:shadow-md"
      >
        {LANGUAGES.map((language) => (
          <option key={language} value={language} className="font-medium">
            {language}
          </option>
        ))}
      </select>
    </div>
  );
}