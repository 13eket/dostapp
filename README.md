# Dostapp Payment API

This project contains the backend API for Dostapp payments, built with FastAPI and deployed as an AWS Lambda function via API Gateway.

## Table of Contents

1.  [Local Development](#1-local-development)
    * [Prerequisites (macOS)](#prerequisites-macos)
    * [Running the API Locally](#running-the-api-locally)
    * [Testing Local Changes](#testing-local-changes)
2.  [Deployment to AWS Lambda](#2-deployment-to-aws-lambda)
    * [Automatic Deployment](#automatic-deployment)
3.  [Adding a New API Endpoint](#3-adding-a-new-api-endpoint)
    * [In the Code (`main.py`)](#in-the-code-mainpy)
    * [In AWS API Gateway](#in-aws-api-gateway)
4.  [API Endpoints](#4-api-endpoints)
    * [GET /](#get-)
    * [POST /init-payment](#post--init-payment)
    * [POST /api/payment-callback](#post--api-payment-callback)

---

## 1. Local Development

This section explains how to get the API running on your macOS machine for development and testing.

### Prerequisites (macOS)

You need to install the following tools on your Mac:

1.  **Python 3.11:**
    * **How to install:** Use Homebrew (recommended package manager for macOS). Open Terminal and run:
        ```bash
        /bin/bash -c "$(curl -fsSL [https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh](https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh))"
        brew install python@3.11
        ```
    * **Verify:** `python3.11 --version`

2.  **Pip (Python Package Installer):** Usually comes with Python.
    * **Verify:** `pip3 --version`

3.  **Pipenv (for Virtual Environments):** Best practice for managing Python dependencies.
    * **How to install:**
        ```bash
        pip3 install pipenv
        ```
    * **Verify:** `pipenv --version`

4.  **Uvicorn:** A lightning-fast ASGI server, used to run FastAPI locally.
    * **How to install:** (Will be installed via `Pipenv` with `requirements.txt` soon).

5.  **Dotenv:** To load environment variables locally. (Will be installed via `Pipenv`).

### Running the API Locally

1.  **Clone the repository:**
    ```bash
    git clone your_repository_url
    cd your_repository_folder/backend # Navigate to your backend folder
    ```
    (Assuming your FastAPI code is inside a `backend/` folder as discussed).

2.  **Set up a Python Virtual Environment with Pipenv:**
    This isolates your project's dependencies.
    ```bash
    pipenv install --dev
    ```
    * This command reads `requirements.txt` and creates a virtual environment. The `--dev` installs development dependencies too.

3.  **Activate the Virtual Environment:**
    ```bash
    pipenv shell
    ```
    * Your terminal prompt will change (e.g., `(your_project_name) $`) indicating the virtual environment is active.

4.  **Create a Local `.env` file:**
    The API uses environment variables. Create a file named `.env` in the same directory as `main.py` (e.g., `your_repository_folder/backend/.env`).
    ```ini
    FREEDOMPAY_MERCHANT_ID=your_local_test_merchant_id
    FREEDOMPAY_SECRET_KEY=your_local_test_secret_key
    FREEDOMPAY_API_URL=[https://secure.freedompay.kz/payment.php](https://secure.freedompay.kz/payment.php) # Or test URL
    MERCHANT_DOMAIN=http://localhost:8000 # For local testing redirects
    ```
    * **Important:** Replace `your_local_test_merchant_id` and `your_local_test_secret_key` with actual test credentials from FreedomPay if you have them, or dummy values if only testing API structure. The `MERCHANT_DOMAIN` should point to your local API.

5.  **Run the FastAPI Application:**
    ```bash
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
    ```
    * `main:app`: Tells Uvicorn to run the `app` object from `main.py`.
    * `--reload`: Automatically reloads the server when code changes are detected (great for development!).
    * `--host 0.0.0.0`: Makes the server accessible from other devices on your local network (if needed).
    * `--port 8000`: Runs the server on port 8000.

    Your API should now be running locally at `http://localhost:8000`.

### Testing Local Changes

While the API is running locally:

1.  **Open your web browser** and go to `http://localhost:8000/`. You should see:
    ```json
    {"message":"Welcome to the Dostapp API"}
    ```

2.  **Test the `/init-payment` endpoint** using `curl` in a **new terminal window** (keep the `uvicorn` terminal running).
    * Remember to activate your virtual environment in this new terminal too (`pipenv shell`).
    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"payment_type": "one-time"}' \
         http://localhost:8000/init-payment
    ```
    * You should get a redirect URL from FreedomPay.

3.  **Check Terminal Output:** Look at the terminal where `uvicorn` is running for any errors or `print()` statements from your code.

4.  **Make Code Changes:** Modify `main.py`. Uvicorn will automatically reload, and you can test your changes immediately.

---

## 2. Deployment to AWS Lambda

Continuous deployment (CI/CD) is set up using GitHub Actions. This means that when you push changes to your `main` branch, your Lambda function will automatically be updated.

### Automatic Deployment

* **Trigger:** Any `git push` to the `main` branch that includes changes inside the `backend/` folder (`backend/**`).
* **Workflow File:** `.github/workflows/deploy-lambda.yml`
* **Process:**
    1.  GitHub Actions checks out your code.
    2.  It uses Docker (in a Linux environment) to build your Python dependencies (including `pydantic_core` for `x86_64` Linux).
    3.  It zips your application code and dependencies into a `deployment_package.zip`.
    4.  It uses your configured AWS credentials (stored securely as GitHub Secrets) to update your `DostappLambdaApp` Lambda function.
    5.  *(Optional, if configured in workflow):* It can also trigger a deployment of your API Gateway.

* **To deploy your changes:**
    1.  Make your code changes in `backend/` (e.g., in `main.py`).
    2.  Commit your changes: `git add . && git commit -m "feat: my new feature"`
    3.  Push to GitHub: `git push origin main`
    4.  Monitor the deployment in your GitHub repository's "Actions" tab.

---

## 3. Adding a New API Endpoint

When you add a new endpoint, you need to update both your code and your API Gateway configuration.

### In the Code (`main.py`)

1.  **Open `backend/main.py`**.
2.  **Add a new FastAPI route** using `@app.<method>("/your-new-path")`.

    **Example: Adding a `GET /status` endpoint**

    ```python
    # Inside main.py, add this anywhere below 'app = FastAPI()'

    @app.get("/status")
    def get_status():
        """Returns the current API status."""
        return {"status": "ok", "version": "1.0.0"}
    ```

3.  **Test Locally:** Run your API locally (`uvicorn ...`) and test the new endpoint:
    ```bash
    curl http://localhost:8000/status
    # Expected: {"status":"ok","version":"1.0.0"}
    ```

4.  **Commit and Push:**
    ```bash
    git add backend/main.py
    git commit -m "feat: Add /status endpoint"
    git push origin main
    ```
    * This will trigger the automatic Lambda deployment.

### In AWS API Gateway

After the Lambda code is deployed, you need to tell API Gateway about the new path.

1.  **Go to the AWS API Gateway Console.**
    * Navigate to [https://console.aws.amazon.com/apigateway/](https://console.aws.amazon.com/apigateway/)
    * Ensure you are in the correct region (`eu-central-1`).
    * Click on your API (e.g., `DostappLambdaApp-API-<random_id>`).

2.  **Create the New Resource (`/status`):**
    * In the left navigation pane, click on **"Resources"**.
    * Select the **root resource (`/`)**.
    * Click **"Actions"** -> **"Create Resource"**.
    * For "Resource Name", type `status`.
    * For "Resource Path", type `status`.
    * Click **"Create Resource"**.

3.  **Create the Method (`GET` on `/status`):**
    * With the newly created `/status` resource selected, click **"Actions"** -> **"Create Method"**.
    * From the dropdown, select **`GET`** and click the checkmark.
    * In the setup pane:
        * **Integration type:** Choose **"Lambda Function"**.
        * **Use Lambda Proxy integration:** **CHECK THIS BOX.**
        * **Lambda Function:** Start typing `DostappLambdaApp` and select your function.
    * Click **"Save"**.
    * If prompted, click **"OK"** to give API Gateway permissions.

4.  **Deploy the API:**
    * This is crucial for the changes to go live!
    * With your API selected (you can click on the root `/` resource), click the orange **"Deploy API"** button at the top right.
    * For "Deployment stage", select **`default`**.
    * Click **"Deploy"**.

5.  **Test the New Endpoint:**
    * Get your base API Gateway URL (e.g., `https://<api-id>.execute-api.eu-central-1.amazonaws.com/default/`).
    * Test in Terminal:
        ```bash
        curl YOUR_BASE_API_GATEWAY_URLstatus
        ```
        * You should now see `{"status":"ok","version":"1.0.0"}`

---

## 4. API Endpoints

Here are the main endpoints for the Dostapp Payment API:

### GET /
* **Description:** Welcomes to the API. Basic health check.
* **Method:** `GET`
* **Request:** No body.
* **Example Response:**
    ```json
    {"message": "Welcome to the Dostapp API"}
    ```

### POST /init-payment
* **Description:** Initiates a payment process with FreedomPay and returns a redirect URL.
* **Method:** `POST`
* **Request Body (`application/json`):**
    ```json
    {
      "payment_type": "one-time"
    }
    ```
    * `payment_type` can be `one-time`, `basic`, `economy20`, or `economy40`.
* **Example Response (Plain Text):**
    ```
    [https://secure.freedompay.kz/init_payment.php?pg_salt=](https://secure.freedompay.kz/init_payment.php?pg_salt=)...[long_url_parameters]...
    ```

### POST /api/payment-callback
* **Description:** Handles the callback from FreedomPay after a payment attempt. Processes the payment result and responds with XML.
* **Method:** `POST`
* **Request Body (`application/x-www-form-urlencoded`):** (Sent by FreedomPay, contains `pg_order_id`, `pg_result`, `pg_sig`, etc.)
* **Example Response (XML):
    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <response>
        <pg_salt>...</pg_salt>
        <pg_status>ok</pg_status>
        <pg_description>Transaction successful</pg_description>
    </response>
    ```
