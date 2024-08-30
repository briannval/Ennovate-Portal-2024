import React from 'react'
import NoTeam from './noTeam'

describe('<NoTeam />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NoTeam />)
  })
})