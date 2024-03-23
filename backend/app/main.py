from fastapi import FastAPI
from dotenv import load_dotenv
from database.database import connect_to_database
from routers import users, recipients, shares, companies, auth

# Load environment variables from a .env file
load_dotenv()

# Initialize the FastAPI application
app = FastAPI(title='Equifiable')

# Connect to the Firebase database
connect_to_database()

# Include routers, assigning tags to categorize the routes in the API docs
# The user-related routes
# app.include_router(users.router,tags=['Users'])
# The routes related to Companies
app.include_router(companies.router,tags=['Companies'])
# The routes related to Shares
app.include_router(shares.router,tags=['Shares'])
# The routes related to Recipients
app.include_router(recipients.router,tags=['Recipients'])
# The routes related to login of users, admins and ais
# app.include_router(auth.router,tags=['Login'])

#DEBUG

# The admin-related routes
# app.include_router(admins.router,tags=['Admins'])

