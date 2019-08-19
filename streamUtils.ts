import { StreamRecord } from "aws-lambda";
import AWS from "aws-sdk";
import axios from "axios";

export function insertDataToES(keyName: string, requestUrl: string, dynamodb: StreamRecord) {
    const insertedData = AWS.DynamoDB.Converter.unmarshall( dynamodb.NewImage! );
    requestUrl += insertedData[keyName] + '/';

    axios.post(requestUrl, insertedData).then(result => {
        console.log(result);
    }).catch(err => {
        console.error(err);
    })
}

export function modifyDataToES(keyName: string, requestUrl: string, dynamodb: StreamRecord) {
    const modifiedData = AWS.DynamoDB.Converter.unmarshall( dynamodb.NewImage! );
    const wrappedData = { "doc": modifiedData };
    requestUrl += modifiedData[keyName] + '/_update';

    axios.post(requestUrl, wrappedData).then(result => {
        console.log(result);
    }).catch(err => {
        console.error(err);
    })
}

export function removeDataToES(keyName: string, requestUrl: string, dynamodb: StreamRecord) {
    const removedData = AWS.DynamoDB.Converter.unmarshall( dynamodb.OldImage! );
    requestUrl += removedData[keyName];

    axios.delete(requestUrl).then(result => {
        console.log(result);
    }).catch(err => {
        console.error(err);
    })
}
