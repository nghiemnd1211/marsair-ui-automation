Feature: Basic Search Flow
  As a potential MarsAir customer
  I want to search for available flights
  So that I can see if any seats are available

  Scenario Outline: Search returns expected availability message
    When I select <departure> as departure
    And I select <return> as return
    And I click Search
    Then I should see "Sorry, there are no more seats available." message

    Examples:
      | departure | return                |
      | Select... | Select...             |
      | July      | July (next year)      |
      | December  | December (next year)  |
      | July      | December (next year)  |
