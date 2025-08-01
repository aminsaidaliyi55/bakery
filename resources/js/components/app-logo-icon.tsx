import React from 'react';

interface AppLogoIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export default function AppLogoIcon(props: AppLogoIconProps) {
  return (
    <img
      {...props}
      src="/storage/logos/logo.png" // replace with your actual saved logo filename
      alt="App Logo"
      className={`inline-block ${props.className ?? ''}`}
    />
  );
}
