const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setBase64(reader.result);
    };
    reader.onerror = (error) => {
        console.error('Error: ', error);
    };
};
console.info(
    '%c %cWTF %cmovies%c  %c2024.31.1.1%c  %cc986991',
    'padding-left: 36px; line-height: 36px; background-image: url(""); background-size: 32px; background-repeat: no-repeat; background-position: 2px 2px',
    'background: #666; border-radius:0.5em 0 0 0.5em; padding:0.2em 0em 0.1em 0.5em; color: white; font-weight: bold',
    'background: #666; border-radius:0 0.5em 0.5em 0; padding:0.2em 0.5em 0.1em 0em; color: white;',
    '',
    'background: #c3a650; border-radius:0.5em; padding:0.2em 0.5em 0.1em 0.5em; color: white;',
    '',
    'background: #15889f; border-radius:0.5em; padding:0.2em 0.5em 0.1em 0.5em; color: white;',
);
