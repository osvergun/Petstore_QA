Feature: Adding a new pets to the petstore

Scenario: Add a new pet to the petstore
    Given The petstore service is available
    When I add a new pet to the pet store
    Then I can find my newly added pet in the petstore