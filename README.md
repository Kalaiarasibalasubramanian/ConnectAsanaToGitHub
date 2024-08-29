

```markdown
# GitHub-Asana Integration Service

This project is a Node.js service that automatically creates a task in Asana whenever a new issue is created in a GitHub repository. The integration leverages GitHub webhooks and the Asana REST API, ensuring secure and reliable task creation without the use of any pre-built Asana packages.

## Features

- **Automatic Task Creation**: Automatically creates a task in Asana with details from the GitHub issue (title, description, URL, and creator).
- **Webhook Validation**: Ensures that the requests are coming from GitHub and are secure.
- **Custom Integration**: Manually handles the API communication with Asana, adhering to the project requirements of not using any pre-built packages.

## Project Structure

```plaintext
github-asana-integration/
│
├── .env
├── package.json
├── app.js
├── README.md
├── /diagrams
│   └── architecture-diagram.png
└── /node_modules
```

- **`/.env`**: Stores environment variables like API tokens and secrets.
- **`/package.json`**: Manages project dependencies and scripts.
- **`/app.js`**: Contains the main application logic, including webhook handling and Asana task creation.
- **`/README.md`**: Documentation for the project.
- **`/diagrams/`**: Contains diagrams illustrating the project architecture.
- **`/node_modules/`**: Directory for installed npm packages (not included in version control).

## Prerequisites

- **Node.js**: Make sure you have Node.js installed on your machine.
- **Asana Account**: You'll need an Asana account to get an access token and project ID.
- **GitHub Repository**: A GitHub repository where you can set up webhooks.

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/github-asana-integration.git
   cd github-asana-integration
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file**:
   In the root directory, create a `.env` file and add the following variables:
   ```plaintext
   ASANA_ACCESS_TOKEN=your_asana_access_token
   GITHUB_SECRET=your_github_webhook_secret
   ASANA_PROJECT_ID=your_asana_project_id
   ```

4. **Run the service**:
   ```bash
   npm start
   ```

5. **Set up GitHub Webhook**:
   - Go to your GitHub repository settings.
   - Under "Webhooks", add a new webhook.
   - Set the payload URL to `http://your-server-address/github-webhook`.
   - Choose `application/json` as the content type.
   - Add the secret key from your `.env` file.

## How It Works

1. **GitHub Webhook**: The service listens for GitHub webhooks at the `/github-webhook` endpoint. When a new issue is created, the webhook triggers this endpoint.

2. **Webhook Validation**: The service validates the webhook by comparing the signature from GitHub with a hash generated using the secret key.

3. **Asana Task Creation**: If validation passes, the service sends a POST request to the Asana API, creating a new task in the specified project with the GitHub issue details.

## Diagram

Architecture Diagram  ![Screenshot (16)](https://github.com/user-attachments/assets/6565ff3f-6b80-4268-a27f-85c3bb9b1abf)


## Error Handling

- If the webhook signature is invalid, the service returns a `403 Forbidden` response.
- If there's an issue with creating a task in Asana, a `500 Internal Server Error` is returned, and the error is logged.

## Contributing

Feel free to fork this repository and submit pull requests. Contributions are welcome!


## Contact

For any questions or issues, please contact [balaon472000@gmail.com](mailto:balaon472000@gmail.com).
```

### Steps to Add the `README.md` to Your GitHub Repository

1. **Save the File**: Create a new file named `README.md` in your project's root directory.

2. **Commit and Push**:
   - If your repository is already set up, you can add the `README.md` and push it to GitHub:
     ```bash
     git add README.md
     git commit -m "Add README.md"
     git push origin main
     ```
   - If you haven’t initialized a GitHub repository yet, you can do so by following these steps:
     ```bash
     git init
     git add .
     git commit -m "Initial commit with README"
     git branch -M main
     git remote add origin https://github.com/your-username/github-asana-integration.git
     git push -u origin main
     ```

This `README.md` provides a comprehensive guide to your project, making it easier for others to understand and contribute.

