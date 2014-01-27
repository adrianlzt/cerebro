My favourite description of Gherkin-based tools is given by the Ruby Cucumber website:

Describe behaviour in plain text
Write a step definition
Run Cucumber and watch it fail
Write code to make the step pass
Run Cucumber again and see the step pass


Feature: Fight or flight
    In order to increase the ninja survival rate,
    As a ninja commander
    I want my ninjas to decide whether to take on an
    opponent based on their skill levels

    Scenario: Weaker opponent
        Given the ninja has a third level black-belt
        When attacked by a samurai
        Then the ninja should engage the opponent
