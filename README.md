# Benchmarks
This project has several mini projects, one for each langugage, all doing the same thing: Listening on an endpoint to register a serial.
All the languages should use a minimal version of one of the most popular framework.

## Methodology
Each language should be in a virtual machine with the same capacity (at least 4 cores), OS and database.
Each mini project should:
- Use a mongodb inside docker
- Load the values from the same `.env` file
- Endpoint to register one serial into one post
  - Endpoint: `/post/{post_number}`
  - If the `post_number` is 1, it means it's the first, so it just need to validade the serial, otherwise it should validade if the serial has already passed on the previous post.
  - Check if it's a valid serial:
    - The serial should be hexadecimal with 12 digits 202201210000 on the format: YYYYMMDD + 4 sequencial hexadecimal digits. If it's not valid it shouldn't save nothing and returns error 500
  - Check if it has already passed on the previous post:
    - If it didn't pass on the `post_number - 1` with the `valid` field as `true`, then it should save the `valid` field as `false`
  - It should save: `ID`, `serial`, `valid`, `post_number`, `createdAt`
  

### Run the database
From the root of the project you can run:
```
docker-compose -f mongo.yml up -d
```