Feature: Update and view SAP parameter Direction multiple times

  Scenario Outline: View SAP parameter Direction after event creation in <language>
    Given Operator logged in SAP
    And Operator switches to English language
    And Operator adds new workspace using preset Events
    And Operator opens Create new event window
    And Operator fills minimum set of event properties
      | event type         | 1    |
      | event sub type     | 1001 |
      | event sub sub type | 2001 |
      | event lat          | 25   |
      | event lon          | 25   |
      
    And Operator clicks Save button