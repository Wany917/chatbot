import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, speed }) => {
    const [displayedText, setDisplayedText] = useState([]);

    useEffect(() => {
        let fullText = text.split('\n').map(line => ""); // Initialise chaque ligne à une chaîne vide
        let delay = 0;

        text.split('\n').forEach((line, lineIndex) => {
            line.split('').forEach((char, charIndex) => {
                setTimeout(() => {
                    fullText[lineIndex] = fullText[lineIndex] + char;
                    setDisplayedText([...fullText]); // Mise à jour avec une copie de fullText pour déclencher le re-render
                }, delay += speed);
            });

            if (lineIndex < text.split('\n').length - 1) {
                setTimeout(() => {
                    fullText[lineIndex] += '\n'; // Ajoute un retour à la ligne pour conserver le formatage
                    setDisplayedText([...fullText]);
                }, delay += speed);
            }
        });
    }, [text, speed]);

    return (
        <div className="whitespace-pre-wrap">
            {displayedText.map((line, index) => (
                <span key={index}>{line}</span>
            ))}
        </div>
    );
};

export default Typewriter;
