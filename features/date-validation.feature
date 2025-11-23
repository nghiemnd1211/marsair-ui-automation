Feature: Invalid Return Dates
  As a potential customer
  I want the system to prevent impossible trips
  So that I don't waste time trying to book invalid trips

  Scenario Outline: Invalid return date less than 1 year after departure
    When I select "<departure>" as departure
    And I select "<return>" as return
    And I click Search
    Then I should see "Unfortunately, this schedule is not possible. Please try again." message

    Examples:
      | departure | return           |
      | July      | December         |
      | December  | July (next year) |
