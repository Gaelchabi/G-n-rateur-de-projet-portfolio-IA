
import React from 'react';

export const BeakerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.25 6.087c0-.355.186-.676.401-.959.215-.283.49-.533.795-.732a1.125 1.125 0 011.581.829V9a1.125 1.125 0 01-2.25 0V6.087z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.25 6.087A3.375 3.375 0 0012 5.25v-2.553c0-.86.684-1.564 1.536-1.65a1.125 1.125 0 011.125.966v2.414M12 5.25a3.375 3.375 0 00-3.375-3.375H8.625a3.375 3.375 0 00-3.375 3.375v12.75c0 .324.032.642.095.952.062.308.156.604.28.89.125.286.28.56.464.812a3.375 3.375 0 005.88 1.442h.22c.28-.48.487-.993.63-1.535.143-.542.22-1.102.22-1.674V5.25z"
    />
  </svg>
);
