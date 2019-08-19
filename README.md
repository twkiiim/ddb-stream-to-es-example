## Make sure to replace your own setting in the following files:

- dynamoStreamHandler.ts

```ts
const esDomainUrl = 'YOUR_ES_DOMAIN_ENDPOINT';
const indexName = 'INDEX_NAME';
```

- severless.yml

```yml
service:
  name: YOUR_SERVICE_NAME
  
...

      - stream:
          arn: YOUR_DDB_STREAM_ARN
```
