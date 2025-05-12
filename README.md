# Claim Microservice

## Overview
This microservice handles claim-related operations including creation, processing, and management of insurance claims. It integrates with other services to provide a complete claims processing solution.

## Features
- 🚀 Create, read, update, and delete claims
- 🔍 Advanced claim search and filtering
- 📊 Claim status tracking and updates
- 📄 Document attachment management
- ⚡ Priority/urgency classification (using `urgence_model.pkl`)
- 🔗 Integration with policy and customer services

## Technology Stack
- **Language**: Python 3.x
- **Framework**: FastAPI (or Flask/Django if different)
- **Database**: PostgreSQL/MongoDB (specify your DB)
- **ML Model**: Scikit-learn (`urgence_model.pkl` for urgency classification)
- **Other**: Docker, Redis (for caching), Celery (for async tasks)

## Installation

### Prerequisites
- Python 3.8+
- Docker (optional)
- PostgreSQL (or your DB) installed and running

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/claim-microservice.git
   cd claim-microservice
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Run migrations:
   ```bash
   alembic upgrade head
   ```

6. Start the service:
   ```bash
   uvicorn main:app --reload  # For FastAPI
   ```

## API Documentation
The API documentation is available at `http://localhost:8000/docs` when the service is running (for FastAPI/Swagger).

Key endpoints:
- `POST /claims` - Create a new claim
- `GET /claims/{claim_id}` - Get claim details
- `PUT /claims/{claim_id}` - Update a claim
- `GET /claims?status={status}` - Filter claims by status
- `POST /claims/{claim_id}/documents` - Upload supporting documents

## Machine Learning Integration
The service uses a pre-trained model (`urgence_model.pkl`) to:
- Classify claim urgency
- Predict processing priority
- Flag potentially urgent claims

The model considers:
- Claim characteristics
- Sender/receiver roles
- Message content features
- Historical patterns


## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
