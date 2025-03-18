import 'react';

// typescript
declare module '*.png';
declare module '*.jpeg';
declare module '*.webp';
declare module '*.pdf';
declare module '*.jpg';
declare module '*.svg';
declare module '*.gif';
declare module '*.ico';
declare module '*.mp4';
declare module '*.webm';
declare module '*.mov';
declare module '*.js';
declare module 'react-qr-scanner';

declare module 'react' {
    interface SVGProps<T> extends React.SVGProps<T> {
      title?: string;
    }
  }