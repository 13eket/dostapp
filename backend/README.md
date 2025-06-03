# Dostapp Backend Service

This directory contains the FastAPI backend service for the Dostapp application.

## 🚀 Getting Started

Follow these steps to set up and run the backend service locally.

### 1. Prerequisites

You'll need Python 3.11.

* **For macOS:**
    1.  **Install Homebrew** (if you don't have it):
        Open your terminal and run:
        ```bash
        /bin/bash -c "$(curl -fsSL [https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh](https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh))"
        ```
        Follow prompts to complete installation.
    2.  **Install Python 3.11:**
        ```bash
        brew install python@3.11
        ```

* **For Windows/Linux:**
    Download and install Python 3.11 from [python.org](https://www.python.org/downloads/) or use your system's package manager/`pyenv`.

### 2. Setup Instructions

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/13eket/dostapp.git](https://github.com/13eket/dostapp.git)
    cd dostapp/backend
    ```

2.  **Create and Activate a Virtual Environment:**
    ```bash
    python3.11 -m venv venv # Use 'python -m venv venv' if 'python' points to 3.11
    ```
    * **macOS / Linux:**
        ```bash
        source venv/bin/activate
        ```
    * **Windows (Command Prompt):**
        ```bash
        venv\Scripts\activate.bat
        ```
    * **Windows (PowerShell):**
        ```bash
        venv\Scripts\Activate.ps1
        ```

3.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

### 3. Running the Backend Service

With your virtual environment active:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 4. Deployment

Whenever you git push into the repo, AWS AppRunner will automagically deploy and build the backend
