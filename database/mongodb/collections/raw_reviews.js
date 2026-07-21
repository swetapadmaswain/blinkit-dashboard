// Raw reviews collection
db.createCollection("raw_reviews", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["source", "source_id", "content", "created_at"],
      properties: {
        source: { bsonType: "string" },
        source_id: { bsonType: "string" },
        content: { bsonType: "string" },
        rating: { bsonType: "number" },
        author: { bsonType: "string" },
        title: { bsonType: "string" },
        platform: { bsonType: "string" },
        metadata: { bsonType: "object" },
        created_at: { bsonType: "date" },
        ingested_at: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.raw_reviews.createIndex({ source: 1, created_at: -1 });
db.raw_reviews.createIndex({ source_id: 1 }, { unique: true });
db.raw_reviews.createIndex({ author: 1 });
db.raw_reviews.createIndex({ rating: 1 });
