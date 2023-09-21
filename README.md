# Simple URL Shortener for the Google Cloud

- From `[domain]/[short]` to `[target url]` (e.g. test.com/test to http://google.com)
- Serverless with Cloud Function
- Supports different providers to store short urls:
  -  static yaml file
  -  TODO: firestore
- Logs every request with Cloud Logging