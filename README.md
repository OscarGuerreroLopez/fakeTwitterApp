## Description

MVP Monitors in real-time tweets.
I tried to follow a clean architecture approach for this little app. The structure is:

- Core: Contains all the business entities that construct the application and also the main abstractions for different services. Abstraction is the way of creating blueprints of a services without implementing them. I only define the functionality we need from the service. Abstractions define a contract between the use cases and the frameworks
- Use cases: This is where I centralize the logic. Each use case orchestrates all of the logic for a specific business use case (for example adding new post or tweet to the system).
- Controllers: Entry and exit gate to the use cases.
- Infra: This layer has all the specific implementations like the DB and any third party integrations
- Services: The link between the use cases and the implementations, for example, if for instance we want to replace mongo with sql, all we need to do is create new data services class and repositories that uses sql and follow the data services abstract
- Utils: functions that can be shared

I also use an in memory mongo DB so no need to run mongo locally for this app to be able to execute

## Assessment requirements:

I made up a service that emits tweets and/or facebook posts every 5 seconds or so. Post use case will listen to the new tweets or posts and store them in a general collection plus also groups the tweets by hashtags. There is an anormality service that it is called on each tweet and alerts if the same hashtag has been added more than 5 times in the last 2 minutes .....
I store all tweets and facebook post on the same collection plus there is a collection that groups each hashtag along with an array of the tweets that contained that hashtag

## Installation

```bash
$ npm install
```

## Running the app

Node 18 would be the prefer version to run this app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
