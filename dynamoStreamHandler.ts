import { DynamoDBStreamEvent } from "aws-lambda";
import { insertDataToES, modifyDataToES, removeDataToES } from "./streamUtils";

const esDomainUrl = 'YOUR_ES_DOMAIN_ENDPOINT';
const indexName = 'INDEX_NAME';
const typeName = 'doc';

export function handler(event: DynamoDBStreamEvent) {
  const records = event.Records;

  const keyName = 'id';
  const requestUrl = esDomainUrl + '/' + indexName + '/' + typeName + '/';

  records.forEach(r => {
    const type = r.eventName;
    const dynamodb = r.dynamodb!;

    switch (type) {
      case "INSERT":
        insertDataToES(keyName, requestUrl, dynamodb);
        break;
      case "MODIFY":
        modifyDataToES(keyName, requestUrl, dynamodb);
        break;
      case "REMOVE":
        removeDataToES(keyName, requestUrl, dynamodb);
        break;
      } 
  });
}