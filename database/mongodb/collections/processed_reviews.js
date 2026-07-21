// Processed reviews collection
db.createCollection("processed_reviews", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["raw_review_id", "sentiment", "topics", "entities"],
      properties: {
        raw_review_id: { bsonType: "string" },
        sentiment: { 
          bsonType: "object",
          properties: {
            score: { bsonType: "number" },
            label: { bsonType: "string" },
            positive: { bsonType: "number" },
            negative: { bsonType: "number" },
            neutral: { bsonType: "number" }
          }
        },
        topics: { 
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              topic_id: { bsonType: "number" },
              score: { bsonType: "number" }
            }
          }
        },
        entities: { bsonType: "array" },
        intent: { bsonType: "string" },
        categories: { bsonType: "array" },
        barriers: { bsonType: "array" },
        needs: { bsonType: "array" },
        processed_at: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.processed_reviews.createIndex({ raw_review_id: 1 }, { unique: true });
db.processed_reviews.createIndex({ "sentiment.label": 1 });
db.processed_reviews.createIndex({ topics: 1 });
db.processed_reviews.createIndex({ intent: 1 });
db.processed_reviews.createIndex({ categories: 1 });
db.processed_reviews.createIndex({ processed_at: -1 });
