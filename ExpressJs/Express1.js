import express from 'express';
import "dotenv/config"

const PORT=process.env.PORT
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const users = [
  {
    "name": "Alice Smith",
    "password": "password123",
    "email": "alice.smith@example.com",
    "number": "123-456-7890"
  },
  {
    "name": "Bob Johnson",
    "password": "securePass456",
    "email": "bob.johnson@example.com",
    "number": "234-567-8901"
  },
  {
    "name": "Carol Davis",
    "password": "myPassword789",
    "email": "carol.davis@example.com",
    "number": "345-678-9012"
  },
  {
    "name": "David Wilson",
    "password": "password000",
    "email": "david.wilson@example.com",
    "number": "456-789-0123"
  },
  {
    "name": "Eve Martinez",
    "password": "passWORD321",
    "email": "eve.martinez@example.com",
    "number": "567-890-1234"
  },
  {
    "name": "Frank Brown",
    "password": "password654",
    "email": "frank.brown@example.com",
    "number": "678-901-2345"
  },
  {
    "name": "Grace Taylor",
    "password": "mySecret111",
    "email": "grace.taylor@example.com",
    "number": "789-012-3456"
  },
  {
    "name": "Hank Anderson",
    "password": "passw0rd222",
    "email": "hank.anderson@example.com",
    "number": "890-123-4567"
  },
  {
    "name": "Ivy Thomas",
    "password": "P@ssw0rd333",
    "email": "ivy.thomas@example.com",
    "number": "901-234-5678"
  },
  {
    "name": "Jack White",
    "password": "password444",
    "email": "jack.white@example.com",
    "number": "012-345-6789"
  }
];

// GET users with optional sorting
app.get("/users", function (req, res) {
  const sort = req.query.sort;
  let sortedUsers = [...users];

  if (sort) {
    sortedUsers.sort((a, b) => {
      if (sort === 'asc') {
        return a.name.localeCompare(b.name);
      } else if (sort === 'desc') {
        return b.name.localeCompare(a.name);
      } else {
        return 0;
      }
    });
  }

  res.json(sortedUsers);
});

// GET user by name
app.get("/users/:name", function (req, res) {
  const name = req.params.name;
  const user = users.find(user => user.name.toLowerCase() === name.toLowerCase());

  if (user) {
    res.json(user);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

// GET limited number of users
app.get('/users/limit', function (req, res) {
  const limit = parseInt(req.query.limit);

  if (limit > 0 && limit <= users.length) {
    res.json(users.slice(0, limit));
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

// POST a new user add data to post method
app.post("/users/signUp", function (req, res) {
  const newUser = req.body;
  if (newUser && newUser.name && newUser.email && newUser.password && newUser.number) {
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});


app.post("/login",function(req,res){
  const {email,password}=req.body
  const user=users.find(item=>item.email==email && item.password==password)
  if (user){
    res.json({msg:"Login sucessfull"})
  }
  else{
    res.status(401).json({msg:"Login failed"})
  }
})



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
