# PassCrypt

PassCrypt is a lightweight web application that allows you to securely encrypt and decrypt your credentials (such as your password and optionally your username) without having to trust any external software or service. The encrypted strings can be stored anywhere (for example, in your local storage, a text file, or a secure notes app), and later, you can decrypt them locally to retrieve your original data.

> **Disclaimer:**  
> This project is intended for educational and personal use. While it demonstrates basic encryption and decryption techniques, it is not production-ready. For any application handling highly sensitive data, you should adopt comprehensive security measures including robust key management, secure storage practices, and protection against vulnerabilities such as XSS.

## Features

- **Separate Encryption/Decryption:**  
  - Encrypt and decrypt your password.
  - (Optional) Encrypt and decrypt your username (this section is currently commented out in the UI but available in the code).

- **Copy Functionality:**  
  - Easily copy the encrypted and decrypted strings to your clipboard.

- **Simple & Minimalistic UI:**  
  - A clean design built with React and inline styling.
  
- **Secure Backend:**  
  - Uses Node.js and Express along with the built-in `crypto` module (AES-256-CBC) to perform encryption and decryption.
  - The backend endpoints are designed to work with minimal data (e.g., password or username only) and return a single encrypted string that you can store anywhere.

## How It Works

1. **Encryption:**  
   When you enter your password (or username) and click the "Encrypt" button, the frontend sends your data to the backend. The backend:
   - Generates a random initialization vector (IV).
   - Encrypts your data using AES-256-CBC.
   - Returns a string in the format `IV:encryptedData` that represents your encrypted credential.
   
2. **Decryption:**  
   When you paste an encrypted string into the decryption form and click "Decrypt", the frontend sends the string to the backend. The backend:
   - Extracts the IV and the ciphertext.
   - Decrypts the data using the same key and IV.
   - Returns the original credential.

3. **Storage:**  
   The encrypted string can be copied and stored anywhere you like. Because it is encrypted, even if someone accesses the storage location, they will only see the opaque string rather than your actual credentials.

## Setup Instructions

### Backend

1. **Prerequisites:**  
   - [Node.js](https://nodejs.org/) (v12 or later)  
   - npm (comes with Node.js)

2. **Installation:**  
   - Clone the repository or download the project files.
   - Navigate to the backend folder (if separated) or the project root (if using a single repository).
   - Install dependencies by running:
     ```bash
     npm install express body-parser cors
     ```
     
3. **Configuration:**  
   - (Optional) Set the environment variable `ENCRYPTION_SECRET` to change the encryption key. If not set, a default key is used (not recommended for production).

4. **Running the Backend:**  
   - Start the server with:
     ```bash
     node server.js
     ```
   - The server listens on port `5000` by default.

### Frontend

1. **Prerequisites:**  
   - [Node.js](https://nodejs.org/) (v12 or later)
   - npm

2. **Installation:**  
   - Navigate to the frontend folder (or the project root if using Create React App).
   - Install dependencies by running:
     ```bash
     npm install
     ```

3. **Running the Frontend:**  
   - Start the React development server with:
     ```bash
     npm start
     ```
   - Open your browser and go to [http://localhost:3000](http://localhost:3000) (or the port your React app uses).

## Usage

1. **Encrypting a Password:**
   - In the "Store Password" section, enter your password and click **"Encrypt Password."**
   - The encrypted string will appear along with a "Copy" button.
   - Copy and store this string safely.

2. **Decrypting a Password:**
   - In the "Reveal Password" section, paste the encrypted string (if not prefilled) and click **"Decrypt Password."**
   - The original password will be displayed, and you can copy it if needed.

3. **(Optional) Username Section:**  
   - The code includes endpoints for username encryption and decryption. If you choose to enable this section in the future, remove the JSX comments from the Username section in the React component.

## Security Considerations

- **Encryption Key:**  
  The encryption is based on a static secret (or one set via `ENCRYPTION_SECRET` environment variable). In a real-world application, consider deriving the key from a user-provided passphrase and avoid hardcoding sensitive keys.

- **Local Storage:**  
  Even though your credentials are stored as encrypted strings, local storage is vulnerable to XSS attacks. Ensure that your application is secure against such attacks (e.g., using Content Security Policy (CSP), input sanitization, etc.).

- **Usage Context:**  
  This webapp is intended to provide a simple method to encrypt and decrypt credentials locally without trusting third-party services. For handling highly sensitive data, use a more robust solution.

## Future Improvements

- Integrate key derivation from a user-supplied passphrase.
- Add additional security measures for key management.
- Improve error handling and add logging.
- Consider persistent storage on the backend with proper authentication if needed.

## License

This project is licensed under the [MIT License](LICENSE).

