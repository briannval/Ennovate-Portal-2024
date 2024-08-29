import React from 'react'
import TeamMemberSkeleton from './teamMemberSkeleton'

describe('<TeamMemberSkeleton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TeamMemberSkeleton />)
  })
})