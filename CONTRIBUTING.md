# 🤝 Contributing to octasol

Welcome to Octasol! We are glad about your interest in contributing. Please take a look at this document to support an easy and effective contribution process for everyone.

Following these guidelines shows respect for our maintainer's time, and in turn, they will respond to your issues and evaluate your contributions. You are also invited to join our [Discord](https://discord.gg/gjYB6x7Q) for any help and support.

<p>&nbsp;</p>

## 👀 Table of Contents
1. [Setting Up Local Development Environment](#setting-up-local-development-environment)
1. [Pull Requests Process](#pull-requests-process)
1. [Code Guidelines](#code-guidelines)
1. [How to Report Bugs](#how-to-report-bugs)
1. [Your Help is needed](#your-help-is-needed)

<p>&nbsp;</p>

## Setting Up Local Development Environment


1. Fork the Repository
1. Clone the Repository

    ```
    git clone https://github.com/yourusername/octasol.git octasol

    cd octasol
    ```


1. Install Dependencies

    ```
    npm install
    ```
1. Start the Development Server

    ```
    npm run dev
    ```
1. Set Up Environment Variables

    Prisma uses an environment file (.env) for database connection details. Create your own .env file.
    
    Add your database connection string:

    ```
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    ```

1. Migrate the Prisma Database

    After setting up your .env file with the correct database connection, you’ll need to run Prisma migrations to set up the local database schema.

    ```
    npx prisma migrate dev
    ```
1. Generate Prisma Client

    If it's not automatically generated during the installation or migration process, run:

    ```
    npx prisma generate
    ```

1. Start the Development Server

    ```
    npm run dev
    ```

1. Keep your repo up-to-date

> [!NOTE] 
> Keep your `main` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/Octasol/octasol.git
> git fetch upstream
> git branch --set-upstream-to=upstream/main main
> ```
>
> This adds the original repository as a "remote" called "upstream," fetches the latest changes from that repo, 
>and sets your local `main` to track the upstream `main` branch. To update your `main` branch, run `git pull`. 
>Afterward, create new branches from `main` for your pull requests.

<p>&nbsp;</p>

## Pull Requests Process

1. Fork the Repository
1. Clone the Repository

     ```
    git clone https://github.com/yourusername/octasol.git octasol

    cd octasol
    ```

1. Create a branch for your PR 

    ```
    git checkout -b your-branch-name
    ```

1. Commit, push changes to your PR 

    ```
    git add . 
    git commit -m "Include a message about your PR"
    git push origin your-branch-name
    ```

1. Open [Pull Request](https://docs.github.com/de/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
    * Go to your fork on GitHub, where you'll see a notification that your branch has recent pushes and an option to create a Pull Request. 
    * Click on the Compare & Pull Request button and select your branch from the "head repository" dropdown, and compare it with the main branch of the original repository.  
    * Provide a title and clear description for your pull request and which issue it fixes. 
    * Prefer async/await over promises for handling asynchronous operations, as it improves readability.

1. Pull Request Review  
    * One or more maintainers will review the changes and may request modifications. After approval, your PR will be merged into the main codebase.

> [!NOTE] 
> Respond to feedback: If the maintainer requests changes, commit those changes to the same branch. Push the updated code, and GitHub will automatically update your PR.
> Approval: Once the changes are satisfactory, the reviewer will approve the PR.


<p>&nbsp;</p>

## Code Guidelines

* Use Consistent Naming Conventions
* Use camelCase for variables and function names (e.g., myVariable, calculateTotal)
* Use PascalCase for class names and components (e.g., MyComponent, UserProfile).
* Use UPPER_SNAKE_CASE for constants (e.g., MAX_USERS).
* Write clear and concise comments to explain complex logic.
* Leverage TypeScript's features like interfaces, enums, and type annotations to enhance type safety.
* Use strict mode for stricter type checking ("strict": true in tsconfig.json).
* Use OOP concepts for code organization and reuse.
* Use .env.local for environment variables to separate secrets and configurations from your codebase.
* Use Tailwind’s responsive utilities to build responsive designs easily.
* Customize your theme in the tailwind.config.js file to define your own color palette, spacing, and more.

<p>&nbsp;</p>

## How to Report Bugs
If you encounter any bugs or have ideas for new features, please open an [issues](https://github.com/Octasol/octasol/issues) in the repository. Make sure to include as much information as possible, such as screenshots, text output, and both the expected and actual results.

<p>&nbsp;</p>

## Your Help is needed
Please check out the [issues](https://github.com/Octasol/octasol/issues). Comment on an issue you would like to work on. 

<p>&nbsp;</p>

> [!Important]
> By submitting patches, you agree to allow the project owners to license your work under the terms of the GNU License.
