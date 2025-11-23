Feature: Promotional Codes

  Scenario Outline: Promotional code validation and messaging
    Given I am on the MarsAir booking page
    When I select "Select..." as departure
    And I select "Select..." as return
    And I enter promotional code "<code>"
    And I click Search
    Then I should see promo result "<result>"

    Examples:
      | code         | result                                                   |
      | AF3-FJK-418  | Promotional code AF3-FJK-418 used: 30% discount!         |
      | JJ5-OPQ-320  | Promotional code JJ5-OPQ-320 used: 50% discount!         |
      | ABC-123-000  | Sorry, code ABC-123-000 is not valid                      |
