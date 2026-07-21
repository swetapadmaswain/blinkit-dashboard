// Reddit discussions collection
db.createCollection("reddit_discussions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["subreddit", "post_id", "content", "created_at"],
      properties: {
        subreddit: { bsonType: "string" },
        post_id: { bsonType: "string" },
        content: { bsonType: "string" },
        author: { bsonType: "string" },
        upvotes: { bsonType: "number" },
        downvotes: { bsonType: "number" },
        comments: { bsonType: "array" },
        created_at: { bsonType: "date" },
        ingested_at: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.reddit_discussions.createIndex({ subreddit: 1, created_at: -1 });
db.reddit_discussions.createIndex({ post_id: 1 }, { unique: true });
db.reddit_discussions.createIndex({ author: 1 });
db.reddit_discussions.createIndex({ upvotes: -1 });
