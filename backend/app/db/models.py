from sqlalchemy import Column, Integer, String, DateTime, Text, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    source_name = Column(String)
    source_url = Column(String, unique=True)
    content = Column(Text, nullable=True)
    published_at = Column(DateTime)
    similarity_score = Column(Float, nullable=True)