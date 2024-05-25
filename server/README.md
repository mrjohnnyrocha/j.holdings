# j.holdings

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Description
j.holdings: A robust and scalable chatbot interface integrating React and FastAPI to deliver responsive user interactions and efficient server-side processing. This project showcases best practices in software architecture, combining modern frontend technologies with powerful backend APIs.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation
To install and configure this project on your computer, follow these steps:

1. Clone this repository by running the following command in your terminal:
    ```bash
    git clone https://github.com/mrjohnnyrocha/j.holdings.git
    ```

    2. Navigate to the project directory:
        ```bash
        cd j.holdings
        ```

    3. Install the required dependencies by running the following command:
        ```bash
        npm install
        ```

    4. Start the development server:
        ```bash
        npm start
        ```

    5. Deploy the FastAPI server on local port 3017:
        ```bash
        uvicorn main:app --port 3017 --reload
        ```

Once the above steps are completed, you should have the project up and running on your local machine. You can now access it by opening your web browser and navigating to `http://localhost:3017`.

## Usage

Instructions on how to use your project and any relevant examples. Use `.env` and `nginx` files for deploying the frontend server, and also the backend if necessary. 

To deploy the frontend server using `.env` file, follow these steps:
1. Create a `.env` file in the root directory of your project.
2. Add the necessary environment variables in the `.env` file. For example:
    ```
    REACT_APP_API_URL=http://localhost:3017
    ```
3. Build the frontend application by running the following command:
    ```bash
    npm run build
    ```
4. Configure your nginx server to serve the built files. Here's an example nginx configuration:
    ```
    server {
         listen 3017;
         server_name your-domain.com;

         location / {
              root /<path-to-your-local-frontend>/build;
              index index.html;
              try_files $uri /index.html;
         }
    }
    ```
5. Start your nginx server to serve the frontend application.

To deploy the backend server using `.env` file, follow these steps:
1. Create a `.env` file in the root directory of your project.
2. Add the necessary environment variables in the `.env` file. For example:
    ```
    DATABASE_URL=postgresql://username:password@localhost:5432/database
    ```
3. Start the backend server using the following command:
    ```bash
    uvicorn app:app --port 8000 --reload
    ```

Make sure to replace the example values with your actual configuration. These steps will help you deploy both the frontend and backend servers using `.env` and `nginx` files.

## Contributing

Guidelines for contributing to your project and how others can get involved.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

- Email: mrjohnnyrocha@outlook.com
- GitHub: [mrjohnnyrocha](https://github.com/mrjohnnyrocha)
