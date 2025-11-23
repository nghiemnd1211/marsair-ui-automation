Feature: Navigation to Home
  Scenario: Click Book a ticket now
    Given I am on the results page
    When I click "Book a ticket to the red planet now!"
    Then I should be on the booking page

  Scenario: Click MarsAir logo to return home
    Given I am on the results page
    When I click the MarsAir logo
    Then I should be on the booking page
