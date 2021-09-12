# Product sommelier

[Hosted on Heroku](https://product-sommelier.herokuapp.com/).

- There is a tag called `v1` which refers to the MVP version of this application.
- There is a tag called `v2` which symbolizes the second version, migrated to React and with WebSockets integrated.

I did not have much time to add tests as I'm on a tight schedule. I would definitely add them using `React Testing Library` for the front-end, along with `msw` and using `supertest` for the back-end. If we were to host this as separate, micro services, I'd consider using `Pact` so we can have contract testing. `Cypress` would also be something to consider since we would definitely like to test the whole application flow instead of only its parts.

## Running locally

1. Install dependencies with `yarn` or `npm install`;
2. Create an `.env` file with all necessary information;
3. Run `yarn backend:dev:start-db` to start the database instance;
4. Run `yarn backend:db:cli db:migrate` to run the migrations and set up the database;
5. Run `yarn backend:db:cli db:seed:all` to populate mock data inside it.

Now run `yarn backend:dev:start-server` and `yarn frontend:dev` to fire the development server.

## Creating new products

Hit the API endpoint https://product-sommelier.herokuapp.com/products with a JSON payload like

```json
{
  "name": "My Awesome Product"
}
```

on a POST request and your product should have been created.

## Big architectural decisions

### NodeJS

Believe it or not, this is my biggest back-end project on NodeJS so far. I have worked with Python and Rails in the past, but that's the first time I make some useful web application with Node. It looks suitable for production applications so I can't see why I wouldn't use it in the future, though it looks very un-opinionated. That's good because it gives developers more power, but on the flip side requires more thinking into strategies (scaling, best practices, etc...)

### Tailwind CSS

I never worked with it before but I always had the curiosity to. The idea of utility classes and class names based off
of a design system sound appealing to me. I enjoyed working with it most of the time. I had a hard time remembering the
name of the classes but this vanished with the installation of Tailwind CSS extensions for VSCode.

It was easier to maintain the codebase and easier to reason about. I like it and would definitely use it again.

### Sequelize

I have worked with Rails' ORM in the past and I liked it. Sequelize was the closest I could find that could provide "the same" perks and that's why I used it. Did not have much problems configuring it and it was overall a good experience.

### Monolith-hosted

This was, basically, to save costs. Having a single running app makes things cheaper.
