from sqlalchemy import Column, Integer, String, DateTime, Text, Float
from sqlalchemy.ext.declarative import declarative_base
from pgvector.sqlalchemy import Vector



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
    summary = Column(Text, nullable=True)
    nli_label = Column(String, nullable=True) # <-- ADD THIS LINE
    contradiction_score = Column(Float, nullable=True)
    
class FactCheck(Base):
    __tablename__ = "fact_checks"

    id = Column(Integer, primary_key=True, index=True)
    statement = Column(Text, nullable=False)
    source = Column(String)
    rating = Column(String, index=True) # e.g., "True", "Pants on Fire"
    embedding = Column(Vector(768)) 