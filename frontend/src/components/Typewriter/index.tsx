import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
}

const Typewriter = ({ text }: TypewriterProps) => {
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    let currentText = "";

    text.split('').forEach((char, index) => {
      setTimeout( () => {
        currentText = currentText.slice(0, -1)
        currentText += char;

        if (text.length != index + 1) {
          currentText += "❙"
        }
        
        setPhrase(currentText)
      }, 200 + (index * 100));
    })
  }, []);

  return (
    <>
      {phrase}
    </>
  );
}

export default Typewriter;