from fastapi import FastAPI, Depends
from fastapi_user_auth.auth import Auth, User
from fastapi_user_auth.auth.backends.jwt import JwtTokenStore
from sqlalchemy_database import Database

app = FastAPI()
db = Database.create(url="sqlite:///amisadmin.db?check_same_thread=False")
auth = Auth(db=db, token_store=JwtTokenStore(secret_key="SECRET"))

app.include_router(auth.router, prefix="/auth", tags=["auth"])

@app.get("/admin", dependencies=[Depends(auth.requires("admin"))])
async def read_admin(user: User = Depends(auth.get_current_user)):
    return {"message": f"Hello {user.username}"}
from fastapi import FastAPI, Depends
from fastapi_user_auth.auth import Auth, User
from fastapi_user_auth.auth.backends.jwt import JwtTokenStore
from sqlalchemy_database import Database

app = FastAPI()
db = Database.create(url="sqlite:///amisadmin.db?check_same_thread=False")
auth = Auth(db=db, token_store=JwtTokenStore(secret_key="SECRET"))

app.include_router(auth.router, prefix="/auth", tags=["auth"])

@app.get("/admin", dependencies=[Depends(auth.requires("admin"))])
async def read_admin(user: User = Depends(auth.get_current_user)):
    return {"message": f"Hello {user.username}"}
