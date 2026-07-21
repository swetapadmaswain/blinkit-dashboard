// User behaviors collection
db.createCollection("user_behaviors", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "actions"],
      properties: {
        user_id: { bsonType: "string" },
        actions: { 
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              type: { bsonType: "string" },
              category: { bsonType: "string" },
              timestamp: { bsonType: "date" },
              metadata: { bsonType: "object" }
            }
          }
        },
        segment_id: { bsonType: "string" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

// Indexes
db.user_behaviors.createIndex({ user_id: 1 });
db.user_behaviors.createIndex({ segment_id: 1 });
db.user_behaviors.createIndex({ "actions.timestamp": -1 });
db.user_behaviors.createIndex({ "actions.category": 1 });
