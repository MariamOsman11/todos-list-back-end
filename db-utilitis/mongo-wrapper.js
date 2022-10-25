import { MongoClient, ObjectId } from 'mongodb'

export async function getAllItemsFromCollection(collectionName, query = {}) {
    return new Promise((resolved, reject) => {
        MongoClient.connect(process.env.DB_CONNECTION_STRING, function (connection_error, db) {
            if (connection_error) {
                reject(connection_error)
                throw connection_error;
            }
            var dbo = db.db(process.env.DB_NAME);
            dbo.collection(collectionName).find(query).toArray(function (find_error, result) {
                if (find_error) {
                    reject(find_error)
                    throw find_error;
                }
                db.close();
                resolved(result)
            });
        });
    });
}


export async function saveItemInCollection(collectionName, item) {

    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.DB_CONNECTION_STRING, function (err, db) {
            if (err) {
                reject(err)
                throw err;
            }
            var dbo = db.db(process.env.DB_NAME);

            dbo.collection(collectionName).insertOne(item, function (err1, dbResult) {
                if (err1) {
                    reject(err1)
                    throw err1;
                }
                db.close();
                resolve(dbResult)
            });
        });
    })
}



export async function deleteItemFromCollection(collection, matchQuery) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.DB_CONNECTION_STRING, function (err, db) {
            if (err) {
                reject(err)
                throw err;
            }
            var dbo = db.db(process.env.DB_NAME);

            dbo.collection(collection).deleteOne(matchQuery, function (delete_err, obj) {
                if (delete_err) {
                    reject(delete_err)
                    throw delete_err;
                }
                console.log("1 document deleted");
                db.close();
                resolve({
                    status: true,
                    data: []
                })
            });
        });
    })
}