# Benchmarks
This project has several mini projects, one for each langugage, all doing the same thing: Creating a lot of serials, registering a serial on each post (same endpoint with different parameter).

## Methodology
Each language should be in a virtual machine with the same capacity (at least 4 cores), OS and database.
Each mini project should:
- Use a mongodb inside docker
- Endpoint to register the serials
  - Endpoint: register/{amount}
  - The serial should be hexadecimal with 12 digits 202201210000 on the format: YYYYMMDD + 4 sequencial hexadecimal digits 
- Endpoint to register one serial into one post
  - Endpoint: post/{post_number}
  - If the `post_number` is 1, it means it's the first, so it just need to validade if the serial exists, otherwise it should validade if the serial has already passed on the previous post.
  - It should save: `serquencial_number`, `serial`, `valid`, `post_number`, `timestamp`
  - If it didn't passed on the `post_number - 1` with the `valid` field as `true`, then it should save the `valid` field as `false`