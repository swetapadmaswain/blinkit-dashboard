import os
import psycopg2
from psycopg2.extras import RealDictCursor
from pymongo import MongoClient
from redis import Redis
from elasticsearch import Elasticsearch
from app.config import settings


def get_postgres_conn():
    return psycopg2.connect(settings.database_url)


def get_postgres_cursor(conn):
    return conn.cursor(cursor_factory=RealDictCursor)


def get_mongo_client():
    return MongoClient(settings.mongodb_url)


def get_mongo_db():
    client = MongoClient(settings.mongodb_url)
    db_name = settings.mongodb_url.rsplit("/", 1)[-1]
    return client[db_name]


def get_redis_client():
    return Redis.from_url(settings.redis_url, decode_responses=True)


def get_elasticsearch_client():
    return Elasticsearch([settings.elasticsearch_url])
