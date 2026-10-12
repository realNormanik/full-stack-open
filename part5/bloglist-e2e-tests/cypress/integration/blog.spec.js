describe("Blog app", function() {
  beforeEach(function() {
    // Reset the database and create a user (replace with your actual API and data)
    cy.request("POST", "http://localhost:3003/api/login", { username: "testuser", password: "password" })  // Create user

    cy.visit("http://localhost:5173")  // Replace with your app"s URL
  })

  it("Login form is shown", function() {
    cy.contains("Log in to the application").should("be.visible")
  })

  describe("Login", function() {
    it("succeeds with correct credentials", function() {
      cy.get("input[name='username']").type("testuser")
      cy.get("input[name='password']").type("password")
      cy.get("button[type='submit']").click()
      cy.contains("blogs").should("be.visible")
      cy.contains("testuser is logged").should("be.visible")
    })

    it("fails with wrong credentials", function() {
      cy.get("input[name='username']").type("testuser")
      cy.get("input[name='password']").type("wrongpassword")
      cy.get("button[type='submit']").click()
      cy.contains("Invalid credentials").should("be.visible")  // Modify according to your error message
    })

    it("fails with wrong credentials and shows red notification", function() {
      cy.get("input[name='username']").type("testuser")
      cy.get("input[name='password']").type("wrongpassword")
      cy.get("button[type='submit']").click()
      cy.contains("Invalid credentials")
        .should("have.css", "color", "rgb(255, 0, 0)")  // Check the color of the error message
    }) 
  })

  it("A blog can be created", function() {
    cy.contains("add new blog").click()
    cy.get("input[placeholder='Title']").type("New Blog Title")
    cy.get("input[placeholder='Author']").type("Jane Doe")
    cy.get("input[placeholder='URL']").type("https://newblog.com")
    cy.get("button[type='submit']").click()

    cy.contains("New Blog Title").should("be.visible")
    cy.contains("Jane Doe").should("be.visible")
  })

  it("blog can be liked", function() {
    cy.contains("view").click()
    cy.get("button").contains("like").click()
    cy.get("button").contains("like").click()  // Click twice

    cy.contains("likes 12").should("be.visible")  // Modify based on initial likes
  })

  it("blog can be deleted by the user who added it", function() {
    cy.contains("view").click()
    cy.contains("delete").click()
    cy.contains("Blog deleted successfully").should("be.visible")
  })

  it("only the user who created the blog can see the delete button", function() {
    cy.contains("view").click()
    cy.contains("delete").should("be.visible")

    // Log out and log in as another user
    cy.get("button[type='logout']").click()
    cy.get("input[name='username']").type("otheruser")
    cy.get("input[name='password']").type("password")
    cy.get("button[type='submit']").click()

    cy.contains("view").click()
    cy.contains("delete").should("not.exist")
  })

  it("blogs are sorted by likes, most liked first", function() {
    cy.contains("view").click()
    cy.contains("like").click()  // Click the like button a few times

    cy.get(".blog").eq(0).should("contain", "Blog with most likes")
    cy.get(".blog").eq(1).should("contain", "Second most liked blog")
  })
})
