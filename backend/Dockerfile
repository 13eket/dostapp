# dostapp/backend/Dockerfile

# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
# This is done first to leverage Docker's build cache
COPY requirements.txt /app/requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code from the backend directory
# into the container at /app
# This assumes your main.py and any other necessary Python files/folders are directly
# in 'backend/' or you adjust the COPY command accordingly.
# If 'main.py' is in 'backend/main.py' and 'python/' folder is also needed:
COPY main.py /app/

# Make port 8000 available to the world outside this container
# App Runner will map its public port to this one.
EXPOSE 8000

# Define environment variable for the Uvicorn port (optional, good practice)
ENV PORT 8000

# Run uvicorn server when the container launches.
# Replace 'main:app' with the correct path to your FastAPI app instance.
# If your FastAPI instance is named 'app' in 'main.py', then 'main:app' is correct.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
