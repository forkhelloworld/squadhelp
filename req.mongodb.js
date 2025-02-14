db.messages.aggregate([
  {
    $match: {
      body: { $regex: "паровоз", $options: 'i' }
    }
  },
  {
    $count: "totalMessages"
  }
]);
