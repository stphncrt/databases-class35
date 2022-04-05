import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
	"mongodb+srv://hyfuser:hyfpassword@cluster0.zg5li.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const seedDatabase = async () => {
	const client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverApi: ServerApiVersion.v1,
	});
	const database = client.db("hyf");
	const city = database.collection("city");
	try {
		await client.connect();

		//------Insert-------

		const homeTown = {
			Name: "Istanbul",
			CountryCode: "TUR",
			District: "Marmara",
			Population: "16000000",
		};
		const insertResult = await city.insertOne(homeTown);
		console.log(`A document was inserted with the _id: ${insertResult.insertedId}`);

		//-------Update--------

		const filter = { Name: "Istanbul" };
		const updateHomeTown = {
			$set: {
				Population: 20000000,
			},
		};
		const result = await city.updateOne(filter, updateHomeTown);
		console.log(
			`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
		);

		//------Retrieve-------

		const getByNameQuery = { Name: "New Home Town" };
		const homeTownByName = await city.findOne(getByNameQuery);
		console.log(homeTownByName);

		const getByCountryCodeQuery = { CountryCode: "TUR" };
		const homeTownByCountryCode = await city.findOne(getByCountryCodeQuery);
		console.log(homeTownByCountryCode);

		//------Delete-------

		const deleteQuery = { Name: "New Home Town" };
		const deleteResult = await city.deleteOne(deleteQuery);
		if (deleteResult.deletedCount === 1) {
			console.log("Successfully deleted one document.");
		} else {
			console.log("No documents matched the query. Deleted 0 documents.");
		}
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
};

seedDatabase();
