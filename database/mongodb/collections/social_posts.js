// Social media posts collection
db.createCollection("social_posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["platform", "post_id", "content", "created_at"],
      properties: {
        platform: { bsonType: "string" },
        post_id: { bsonType: "string" },
        content: { bsonType: "string" },
        author: { bsonType: "string" },
        likes: { bsonType: "number" },
        shares: { bsonType: "number" },
        comments: { bsonType: "number" },
        hashtags: { bsonType: "array" },
        mentions: { bsonType: "array" },
        created_at: { bsonType: "date" },
        ingested_at: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.social_posts.createIndex({ platform: 1, created_at: -1 });
db.social_posts.createIndex({ post_id: 1 }, { unique: true });
db.social_posts.createIndex({ author: 1 });
db.social_posts.createIndex({ hashtags: 1 });
