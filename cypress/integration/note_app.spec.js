describe('Note app',function() {
  beforeEach(function() {
    cy.request('POST','http://localhost:3001/api/testing/reset')
    const user = {
      name:'Matti Luukkainen',
      username:'mluukkai',
      password:'salainen'
    }
    cy.request('POST','http://localhost:3001/api/users/',user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened',function() {
    cy.contains('Notes')
    cy.contains('awesome')
  })

  it('login form can be opened',function() {
    cy.contains('login').click()
  })

  it('user can login',function() {
    cy.contains('login').click()
    cy.contains('input:first').type('mluukkai')
    cy.get('input:last').type('salainen')
    cy.contains('Matti Luukkainen logged in')
  })

  it('user can log in',function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukainen logged in')
  })

  describe('when logged in',function() {

    beforeEach(function() {
      cy.request('POST','http://localhost:3001/api/login',{
        username:'mlukkai',password:'salainen'
      }).then(response => {
        localStorage.setItem('loggedNoteappUser',JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    beforeEach(function() {
      cy.contains('login').click()
      cy.get('input:first').type('mlukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()
    })

    it('a new note can be created',function() {
      cy.contains('new note'.click)
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
    describe('and a note exists',function() {
      beforeEach(function () {
        cy.contains('new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click()
      })

      it('it can be made important',function() {
        cy.contains('another note cypress')
          .contains('make important')
          .click()

        cy.contains('another note cypress')
          .contains('make not important')
      })

      it.only('login fails with wrong password',function() {
        cy.contains('login').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.error').should('contain','wrong credentials')

        cy.get('.error').should('contain','wrong credentials')
        cy.get('.error').should('have.css','color','rgb(255,0,0)')
        cy.get('.error').should('have.css','border-style','solid')

        cy.get('.error')
          .should('contain','wrong credentials')
          .and('have.css','color','rgb(255,0,0)')
          .and('have.css','border-style','solid')

        cy.get('html').should('not.contain','matti luukkainen logged in')

      })
    })
  })
})