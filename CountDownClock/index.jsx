import React from 'react';
import ReactDOM from 'react-dom';


function Root() {
    return (
        <div>
            hi
        </div>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    ReactDOM.render(<Root />, root);
});