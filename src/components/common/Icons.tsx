import React from 'react';

export const WindowsLogo: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="2" width="9.2" height="9.2" rx="1.5" fill="#38bdf8" />
    <rect x="12.8" y="2" width="9.2" height="9.2" rx="1.5" fill="#60a5fa" />
    <rect x="2" y="12.8" width="9.2" height="9.2" rx="1.5" fill="#818cf8" />
    <rect x="12.8" y="12.8" width="9.2" height="9.2" rx="1.5" fill="#a78bfa" />
  </svg>
);

export const FolderIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 48,
  color = '#38bdf8',
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="folderBack" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f59e0b" />
        <stop offset="1" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="folderFront" x1="0" y1="18" x2="64" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fbbf24" />
        <stop offset="1" stopColor="#f59e0b" />
      </linearGradient>
      <linearGradient id="folderPaper" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="1" stopColor="#f1f5f9" stopOpacity="0.8" />
      </linearGradient>
      <filter id="folderShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.25" />
      </filter>
    </defs>
    {/* Folder Back */}
    <path
      d="M6 16C6 13.7909 7.79086 12 10 12H24.5C26.1569 12 27.7027 12.8596 28.5858 14.2679L30.4142 17.1895C31.2973 18.5978 32.8431 19.4574 34.5 19.4574H54C56.2091 19.4574 58 21.2483 58 23.4574V50C58 52.2091 56.2091 54 54 54H10C7.79086 54 6 52.2091 6 50V16Z"
      fill="url(#folderBack)"
    />
    {/* Subtle Inner Document */}
    <rect x="14" y="20" width="36" height="20" rx="3" fill="url(#folderPaper)" />
    {/* Folder Front */}
    <path
      filter="url(#folderShadow)"
      d="M6 25C6 22.7909 7.79086 21 10 21H54C56.2091 21 58 22.7909 58 25V50C58 52.2091 56.2091 54 54 54H10C7.79086 54 6 52.2091 6 50V25Z"
      fill="url(#folderFront)"
    />
    {/* Accent badge / color hint */}
    <circle cx="48" cy="44" r="5" fill={color} fillOpacity="0.85" />
  </svg>
);

export const FigmaIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
  </svg>
);

export const GmailIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z" fill="#EA4335" fillOpacity="0.1" />
    <path d="M2 7L12 13.5L22 7" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="2" y="5" width="20" height="14" rx="3" stroke="#EA4335" strokeWidth="2" />
  </svg>
);

export const LinkedInIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="24" height="24" rx="4" fill="#0A66C2" />
    <path d="M7.5 9.5V17.5M7.5 6.5V6.6M12 17.5V13.5C12 11.5 13.5 11 14.5 11C15.5 11 16.5 11.8 16.5 13.5V17.5M12 17.5H16.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const GitHubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21V19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.41 6.01 9.52 6.66 8.82C6.55 8.57 6.21 7.55 6.76 6.19C6.76 6.19 7.6 5.92 9.5 7.21C10.29 6.99 11.15 6.88 12 6.88C12.85 6.88 13.71 6.99 14.5 7.21C16.4 5.92 17.24 6.19 17.24 6.19C17.79 7.55 17.45 8.57 17.34 8.82C18 9.52 18.38 10.41 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26V21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12C22 6.477 17.52 2 12 2Z"
      fill="currentColor"
    />
  </svg>
);

export const LeetCodeIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M13.5 6L8.5 10.5C7.2 11.7 7.2 13.8 8.5 15L13.5 19.5" stroke="#FFA116" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 12.5H19" stroke="#E6A100" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
