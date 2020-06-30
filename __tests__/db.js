const { MongoClient } = require('mongodb');
/*
    Unit Tests for User database
    Insert into Database Successfully (Test Normal Case)
    Insert into Database with no Invalid Field (Test on Schema)

*/

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(
      'mongodb+srv://testUsername:testPassword@cluster0-rfgdc.mongodb.net/<testDB>?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      }
    );
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    //   const users = db.collection('users');
    //   const mockUser = {
    //     username: 'testingwithrandomhash-5632428823',
    //     password: 'lol',
    //   };
    //   await users.insertOne(mockUser);
    //   const insertedUser = await users.findOne({
    //     username: 'testingwithrandomhash-5632428823',
    //   });
    //   expect(insertedUser).toEqual(mockUser);
    //   users.deleteOne({ _id: insertedUser._id });
    // });
  });

  it('should insert a user successfully, but have all required fields', async () => {
    //   const users = db.collection('users');
    //   const InvalidData = {
    //     username: 'testingwithrandomhash-5632428824',
    //   };
    //   const userWithInvalidData = await users.insertOne(InvalidData);
    //   //we dont want this to go through
    //   expect(userWithInvalidData.username).toEqual(undefined);
    //   users.deleteOne({ username: userWithInvalidData.ops[0].username });
    // });
  });
});
