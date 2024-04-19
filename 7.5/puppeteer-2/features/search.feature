Feature: Booking a cinema ticket
    Scenario: Should book 1 ticket
        Given user is on "/client/index.php" page
        When user search 1 movie ticket by '600' of data-seance-start
        Then user sees the text "Вы выбрали билеты:"

    Scenario: Should book 2 tickets
        Given user is on "/client/index.php" page
        When user search 2 movie tickets by '600' of data-seance-start
        Then user sees the text "Вы выбрали билеты:"

    Scenario: Should try to book already booked ticket
        Given user is on "/client/index.php" page
        When user search booked movie ticket by '660' of data-seance-start
        Then user tries to click 'acceptin-button'