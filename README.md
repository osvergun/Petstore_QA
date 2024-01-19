# API Tests for the Petstore!

### Setup
1. Clone this repository `gh repo clone osvergun/Petstore_QA`
2. Inside project folder execute `npm install`

### Run tests
#### Execute tests without any extra reporting
Execute `npm test` command inside project

#### Execute tests with coverage
Execute `npm run test-coverage` command inside project. To see the html report after test execution go to the coverage folder and open index.html in the web browser.


### TechStack Info
- API Test Framework: Jest + Supertest
- BDD approach with usage of the Cucumber
- Added support for allure to get a nice reports
- Enabled jest test coverage

### Swagger observations
Unfortunately Petstore service contains a few bugs that can affect the stability of the tests:
- Required fields are not validated from the api level, so user can create a new pet without passing the name or image, in that case swagger should return 405 code response (invalid input), but we are getting code 200.
- There is no validation for petId, so newly created pets are not properly saved if a pet with this id already exists. There is also no validation error that could refer to that.
- Get pet endpoint returns different responses from time to time

### List of potentials tests to be added (Petstore issues should fixed):
- Not possible to add record with the same id
- Mot possible to add record with incorrect/missing request body
- Not possible to add records with empty required field
