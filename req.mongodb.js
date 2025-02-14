use("shm-chat");
db.getCollection("messages").aggregate([
  {
    $match: {
      body: { $regex: "паровоз", $options: 'i' }
    }
  },
  {
    $count: "totalMessages"
  }
]);
