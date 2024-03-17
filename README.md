# Stacks

Stacks is a kanban board website that helps you to organize your work or play.

## Demo & Snippets

[https://stacks.meshakbain.com](https://stacks.meshakbain.com)

**Demo Login**

- Email: demo@gmail.com
- Password: Password#1

**ProjectPage**

<img width="1799" alt="image" src="https://github.com/MrMeshak/stacks_fe/assets/94204153/19dfb0c7-0ac2-4f15-a1de-4eb0f555c40e">


## Features

_Authentication_

- Email and password authentication
- Cookie base authentication with authToken and refreshToken
- RefreshToken rotation for additional security
- Protected endpoints that are scoped to user

_Kanban Board_

- Supports CRUD operations for projects, stacks and tasks
- Drag and Drop support for both stacks and tasks
- Persists order of stacks and tasks
- multi-project support
- Completed task button

_General_

- Use of query cache and optimistic updates to optimize data fetching and performance.
- Component level fetching with caching to enable a modular component architecture
- Responsive design
- Touch screen support

## Learnings

- **Authentication**: One of the main goals I had with this project was to gain a deeper understanding of authentication. For this project I decided to implement my own token based authentication with refresh tokens and refresh token rotation. I have learned a tonne and now have a good understanding of typical authentication flows. From middleware, interceptors, JWT tokens, protected routes, user scoped endpoints etc.

- **NestJs**: Through this project I also wanted to improve my NestJS knowledge and I feel I have a solid understanding of the fundamentals (dependency injection, decorators, error handling, classValidator, classTransformer, middleware, pipes, interceptors, testing, RESTful api, MVC design pattern etc)

- **Drag n Drop**: This is my first time implementing drag and drop into a project, which was exciting, but this was probably the most challenging part of the project. I found that implementing a single drag and drop was simple but nested drag and drop was quite complex with many

- **Drizzle ORM**: I have been wanting to try out drizzle ORM for a while, it is really enjoyable and easy to use. I love the fact that you can drop back to raw sql if needed and it is a lot more performant than prisma. Would recommend if you haven't tried it yet.

- **Redis**: First time using a Redis in a project, was cool to learn the basics of this technology. I used the Redis to store the refresh tokens as part of the implementing refreshToken rotation (making it a bit more performant and reducing calls to the database).

## Technologies

_Front End_

- ReactJs
- ReactQuery
- DndKit
- Zustand
- Shadcn ui
- TailwindCSS

_Backend_

- NestJS
- Drizzle ORM
- Redis
- PostgreSQL
- Jest
