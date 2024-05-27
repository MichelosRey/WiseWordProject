const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3001; 
const cors = require('cors');

const allowedOrigins = [
    "http://127.0.0.1:5500"
];
  
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso no permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
    const ipAddress = req.ip;
    next();
});

const uri = "mongodb+srv://michelocode:EBIGNjKY4bKDcNhz@cluster0.mebs5ls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
    await client.connect();
    //await client.db("admin").command({ ping: 1 });
}


async function breakRun() {
    await client.close();
}

// Generales

app.get('/users', async (req, res) => {
  try {
    await run();
    const database = client.db("Cluester0"); 
    const collection = database.collection("Users");
    const users = await collection.find({}).toArray();
    res.json(users);
    await breakRun();
  } catch (err) {
    console.error("Error al realizar la consulta:", err);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

// No puede haber 2 usernames iguales CONTROLARLO
// Especificas
app.get('/users/:username', async (req, res) => {
    const username = req.params.username;
  
    try {
        await run();
        const database = client.db("Cluster0");
        const collection = database.collection("Users");
        const user = await collection.findOne({ username: username });
    
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
        await breakRun();
    } catch (err) {
      console.error("Error al buscar el usuario:", err);
      res.status(500).json({ error: "Error al buscar el usuario" });
    }
});

app.post('/users/:username', async (req, res) => {
    try {
        await run();
        const database = client.db("WiseWord");
        const collection = database.collection('Users');
        const username = req.params.username;


        const result = await collection.updateOne(
            { username: username },
            { $set: req.body },
            { upsert: false }  // true == Si existe username actualiza, false == Solo inserta uno nuevo 
        );
    
        if (result.upsertedCount === 1) {
            console.log(`Nuevo registro insertado para la dirección ${username}`);
        } else if (result.modifiedCount === 1) {
            console.log(`Registro actualizado con éxito para la dirección ${username}`);
        }

        res.status(200).json({ message: 'Registro actualizado con éxito' });
        await breakRun();
    } catch (error) {
        console.error('Error al actualizar o insertar el registro:', error);
        res.status(500).json({ error: 'Error al actualizar o insertar el registro' });
    }
        
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});