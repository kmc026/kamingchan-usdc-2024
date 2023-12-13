/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    //Check if book list is empty; if it is empty, return SearchTerm and empty Results
    if (scannedTextObj.length === 0) {

        var result = {
            "SearchTerm": searchTerm,
            "Results": []
        };

        return result;
    }

    //Pre-create search results to be returned
    returning_content = [];
    
    //For loop that loops through the books
    for (let i = 0; i < scannedTextObj.length; i++) {

        //Copy data of each book one by one
        let book = scannedTextObj[i];

        //Check if a book has scanned "Content" data
        if (book.hasOwnProperty("Content")) {

            //Inside for loop which iterates through the "Content" of each book
            for (j = 0; j < book.Content.length; j++) {

                //Use "Content" of each book data one by one
                let content = book.Content[j]
                
                //Check if exists "Text" and use .search to find if searchTerm exists in "Text" of each "Context" from each book
                if (content.Text && content.Text.search(searchTerm) > -1) {
                    
                    //If searchTerm exists, insert the neccesary information to be returned
                    var search_result = {
                        "ISBN": book.ISBN,
                        "Page": content.Page,
                        "Line": content.Line
                    }
                    
                    returning_content.push(search_result)

                }
            }
        }
    }


    var result = {
        "SearchTerm": searchTerm,
        "Results": returning_content
    };
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}



/** Below are my own unit tests. */

/** Unit Test 1 that tests result difference between "the" and "The" */
const unitTest3ExpectOut = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}
const test3result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(unitTest3ExpectOut) === JSON.stringify(test3result)) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", unitTest3ExpectOut);
    console.log("Received:", test3result);
}

/** Unit Test 2 that tests "how" which exists on two lines */
const unitTest4ExpectOut = {
    "SearchTerm": "how",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        }
    ]
}
const test4result = findSearchTermInBooks("how", twentyLeaguesIn);
if (JSON.stringify(unitTest4ExpectOut) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", unitTest4ExpectOut);
    console.log("Received:", test4result);
}

/** Unit Test 3 that tests "lalala" which should not exist */
const unitTest5ExpectOut = {
    "SearchTerm": "lalala",
    "Results": [
    ]
}
const test5result = findSearchTermInBooks("lalala", twentyLeaguesIn);
if (JSON.stringify(unitTest5ExpectOut) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", unitTest5ExpectOut);
    console.log("Received:", test5result);
}

/** Unit Test 4 that tests "," */
const unitTest6ExpectOut = {
    "SearchTerm": ",",
    "Results": [
        {"ISBN": "9780000528531",
        "Page": 31,
        "Line": 10}
    ]
}
const test6result = findSearchTermInBooks(",", twentyLeaguesIn);
if (JSON.stringify(unitTest6ExpectOut) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", unitTest6ExpectOut);
    console.log("Received:", test6result);
}

/** Create two books */
const twentyLeaguesInDoubled = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "Twenty Thousand Leagues Under the Sea New",
        "ISBN": "9876543210000",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

/** Unit Test 5 that tests "how" on two books*/
const unitTest7ExpectOut = {
    "SearchTerm": "how",
    "Results": [
        {ISBN: "9780000528531", 
        Page: 31, 
        Line: 9 
        },
        {ISBN: "9780000528531", 
        Page: 31, 
        Line: 10
        },
        {ISBN: "9876543210000",
         Page: 31, 
         Line: 9
        },
        {ISBN: "9876543210000", 
        Page: 31, 
        Line: 10 
        }
    ]
}
const test7result = findSearchTermInBooks("how", twentyLeaguesInDoubled);
if (JSON.stringify(unitTest7ExpectOut) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", unitTest7ExpectOut);
    console.log("Received:", test7result);
}

/** Create empty book list */
const twentyLeaguesInEmpty = []

/** Unit Test 6 that searches "how" on an empty book list*/
const unitTest8ExpectOut = {
    "SearchTerm": "how",
    "Results": []
}
const test8result = findSearchTermInBooks("how", twentyLeaguesInEmpty);
if (JSON.stringify(unitTest8ExpectOut) === JSON.stringify(test8result)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", unitTest8ExpectOut);
    console.log("Received:", test8result);
}

/** Create list with a book that has empty content*/
const twentyLeaguesInNoContent = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
    },
    {
        "Title": "Twenty Thousand Leagues Under the Sea New",
        "ISBN": "9876543210000",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

/** Unit Test 7 that searches "how" on books that have no content*/
const unitTest9ExpectOut = {
    "SearchTerm": "how",
    "Results": [
        {ISBN: "9876543210000",
         Page: 31, 
         Line: 9
        },
        {ISBN: "9876543210000", 
        Page: 31, 
        Line: 10 
        }
    ]
}
const test9result = findSearchTermInBooks("how", twentyLeaguesInNoContent);
if (JSON.stringify(unitTest9ExpectOut) === JSON.stringify(test9result)) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", unitTest9ExpectOut);
    console.log("Received:", test9result);
}