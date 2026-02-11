import app from './app.js'

describe("API testing", () => {
    let appService;

    beforeEach(() => {
        appService = new app("https://api.example.com");
    })
})