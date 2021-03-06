const AWS = require('aws-sdk');

AWS.config.update({ region: "us-west-2" });

const documentClient = new AWS.DynamoDB.DocumentClient();

const query = async () => {
	try {
		const q = {
			TableName: 'Reply',
			KeyConditionExpression: '#id = :id AND #dt BETWEEN :start AND :end',
			ExpressionAttributeNames: {
				'#id': 'Id',
				'#dt': 'ReplyDateTime',
			},
			ExpressionAttributeValues: {
				':id': "Amazon DynamoDB#DynamoDB Thread 2",
				':start': "2015-09-29T19:58:22.947Z",
				':end': "2015-10-05T19:58:22.947Z",
			},
		};

		const response = await documentClient.query(q).promise();

		if (response.LastEvaluatedKey) {
			const message = `
				Not all items have been retrieved by this query.
				At least one another request is required to get all available items.
				The last evaluated key corresponds to:
				${JSON.stringify(response.LastEvaluatedKey)}.
			`.replace(/\s+/gm, ' ');

			console.log(message);
		}

		return response;
	} catch (error) {
		throw new Error(JSON.stringify(error, null, 2));
	}
};

(async () => {
	try {
		const data = await query();
		console.log("Query succeeded:", JSON.stringify(data, null, 2));
	} catch (error) {
		console.error(error);
	}
})();
