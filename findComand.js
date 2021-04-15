const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://leitor_blog:g3hzCJq1J9y6c2AL@blogcluster.szi09.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function run() {
    try {
        await client.connect();

        const database = client.db("blog_database");
        const posts = database.collection("posts");

        const query = { texto: { $exists: true } }
        
        const options = {
            sort: { title: 1 },
            projection: { _id: 0, texto: 1, titulo: 1, resumo: 1 }
        };

        const cursor = posts.find(query, options);

        if((await cursor.count()) === 0) {
            console.log("nao foi encontrado nada!");
        }

        await cursor.forEach(console.dir);

    } finally {
        await client.close();
    }
}

run().catch(console.dir);