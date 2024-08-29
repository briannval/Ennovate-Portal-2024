import React from 'react'
import TeamMemberSkeletonGrid from './teamMemberSkeletonGrid'

describe('<TeamMemberSkeletonGrid />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TeamMemberSkeletonGrid />)
  })
})