import React from "react";

// Helper to split text by newlines - used in contact page
export const renderMultilineText = (text: string): React.JSX.Element => {
  return (
    <>
      {text.split("\n").map((line, index, array) => (
        <span key={`line-${index}`}>
          {line}
          {index < array.length - 1 && <br />}
        </span>
      ))}
    </>
  );
};
