const form = document.getElementById('upload-form');
const resultDiv = document.getElementById('result');
const cpbtn = document.getElementById('clipb');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the file input element and the selected file
    const fileInput = form.elements.torrent;
    const file = fileInput.files[0];

    if (fileInput.files.length === 0) {
        alert('Please select a torrent file.');
        return;
    }

    // Create a FormData object and append the file to it
    const formData = new FormData();
    formData.append('torrent', file);

    // Send a POST request to the server with the file data
    fetch('https://test-t2m.vercel.app/upload/', {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.text())
        .then((data) => {

            if (cpbtn.firstChild instanceof HTMLButtonElement) {
                cpbtn.removeChild(cpbtn.firstChild);
            }

            // Display the magnet link in the result div
            resultDiv.textContent = data;
            const copyButton = document.createElement('button');
            copyButton.textContent = 'Copy to Clipboard';
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(data);
                alert('Magnet link copied to clipboard!');
            });
            cpbtn.appendChild(copyButton);

        })
        .catch((error) => {
            // Display any errors in the result div
            resultDiv.textContent = `Error: ${error.message}`;
        });

});
