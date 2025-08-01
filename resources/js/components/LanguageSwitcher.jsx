// src/components/LanguageSwitcher.jsx
import { useForm } from '@inertiajs/react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'am', label: 'አማርኛ' },
  { code: 'om', label: 'Afaan Oromoo' },
  { code: 'so', label: 'Soomaali' },
];

export default function LanguageSwitcher({ current }) {
  const { post } = useForm();

  function changeLanguage(code) {
    post(`/change-language`, { locale: code });
  }

  return (
    <select
      value={current}
      onChange={(e) => changeLanguage(e.target.value)}
      className="text-sm border px-2 py-1 rounded"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
