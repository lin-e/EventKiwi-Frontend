import React from 'react';
import './EmptySectionText.css'

interface EmptySectionTextProps {
  mainText: string,
  subText: string
}

const EmptySectionText: React.FC<EmptySectionTextProps> = ({mainText, subText}) => {
  return (
    <div className="textContainer">
      <strong>{mainText}</strong>
      <p>{subText}</p>
    </div>
  );
}

export default EmptySectionText;
