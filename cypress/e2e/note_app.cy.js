// describe('Note app', function() {
//   it('front page can be opened', function() {
//     cy.visit('http://localhost:3000')
//     cy.contains('Login')
//     // cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
//   })
// })

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click();
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click();
      cy.get('input:first').type('admin')
      cy.get('input:last').type('try')
      cy.contains('login').click()
      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click();
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()
    })

    it('A blog can be created', function() {
      cy.contains('new note').click();
      cy.get('#title').type('test')
      cy.get('#author').type('test')
      cy.get('#url').type('test')
      cy.get('#blogFormButton').click()
      cy.contains('test')
    })

    it('users can like a blog', function() {
      cy.contains('new note').click();
      cy.get('#title').type('test')
      cy.get('#author').type('test')
      cy.get('#url').type('test')
      cy.get('#blogFormButton').click()
      cy.contains('view').click()
      cy.contains(0)
      cy.contains('like').click()
      cy.contains(1)
      
    })

    it.only('users can delete a blog', function() {
      cy.contains('new note').click();
      cy.get('#title').type('test')
      cy.get('#author').type('test')
      cy.get('#url').type('test')
      cy.get('#blogFormButton').click()
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.get('html').should('not.contain', 'view')
      
    })
  })
})