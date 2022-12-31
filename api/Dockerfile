FROM python:3.9

ENV PYTHONUNBUFFERED=1
WORKDIR /app

# Install pipenv
RUN pip install --upgrade pip 
RUN pip install pipenv

# Install application dependencies
COPY Pipfile Pipfile.lock /app/
# We use the --system flag so packages are installed into the system python
# and not into a virtualenv. Docker containers don't need virtual environments. 
RUN pipenv install --system --dev

# Install dependencies for djongo
RUN apt-get update && apt-get install -y libffi-dev libssl-dev

# Copy the application files into the image
COPY . /app/

# Set environment variables
ENV DJANGO_SETTINGS_MODULE=myproject.settings
ENV SECRET_KEY=mysecretkey

# Expose port 8000 on the container
EXPOSE 8000
