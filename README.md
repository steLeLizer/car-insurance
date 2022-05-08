# Car Insurance

It is about getting the price for an insurance product, based on specific parameters.

## Description

There are four steps:

* Step 1: Log-in
* Step 2: Fill-in the parameters
* Step 3: Compute the pricing & verify the request complies with the underwriting rules
* Step 4: Display the offer

## Getting Started

### Dependencies

* Docker
  [@Get Docker](https://docs.docker.com/get-docker/)

[comment]: <> (### Installing)

[comment]: <> (* How/where to download your program)

[comment]: <> (* Any modifications needed to be made to files/folders)

### Executing the app

* .env file content example for running the backend locally:
    * PORT=3001
    * DB_URI='mongodb://car_insurance_database/car-insurance'
    * TEST_DB_URI='mongodb://localhost/car-insurance-test'
    * ACCESS_TOKEN_SECRET='accessTokenSecret123$'
    * REFRESH_TOKEN_SECRET='refreshTokenSecret123$'
    * ACCESS_TOKEN_EXPIRATION='12h'
    * REFRESH_TOKEN_EXPIRATION='1d'
    * BCRYPT_SALT_ROUNDS=10
    * THROTTLER_TTL=60
    * THROTTLER_LIMIT=10

#### Commands

* Run the backend

```
cd backend/
docker-compose build
docker-compose up -d
```

* Run backend tests
    * Note: In order to run tests, you will need to install Node.js on your machine
    * Note: For manual testing, swagger route - /api

```
cd backend/
npm test
```

[comment]: <> (## Help)

[comment]: <> (Any advise for common problems or issues.)

[comment]: <> (```)

[comment]: <> (command to run if program contains helper info)

[comment]: <> (```)

## Login credentials

* Email: user@qover.com
* Password: Ninja

## Authors

Contributor names and contact info

Stefan Djurovic
[@Stefan Djurovic](https://github.com/steLeLizer)

## Version History

* 1.0.0
    * Initial Release

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details

[comment]: <> (## Acknowledgments)

[comment]: <> (Inspiration, code snippets, etc.)

[comment]: <> (* [awesome-readme]&#40;https://github.com/matiassingers/awesome-readme&#41;)

[comment]: <> (* [PurpleBooth]&#40;https://gist.github.com/PurpleBooth/109311bb0361f32d87a2&#41;)

[comment]: <> (* [dbader]&#40;https://github.com/dbader/readme-template&#41;)

[comment]: <> (* [zenorocha]&#40;https://gist.github.com/zenorocha/4526327&#41;)

[comment]: <> (* [fvcproductions]&#40;https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46&#41;)
