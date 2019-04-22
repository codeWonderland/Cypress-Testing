beforeEach('Redirect to home page', function() {
    cy.visit("https://www.saucedemo.com/");

    login()
});

// TESTS SUITES //

describe('Add Item to Cart', function() {
    it('Adds single item to cart and checks for the correct total', function() {
        // add item one to cart
        clickButton("#inventory_container .inventory_item:nth-child(1) .btn_inventory");

        // Navigate to cart and fill in appropriate data
        goToCart();

        // Check cart total
        assertTotal("32.39");
    })
});

describe('Add Multiple Items to Cart', function() {
    it('Adds multiple items to cart and checks for the correct total', function() {
        // add item one to cart
        clickButton("#inventory_container .inventory_item:nth-child(1) .btn_inventory");

        // add item two to cart
        clickButton("#inventory_container .inventory_item:nth-child(2) .btn_inventory");

        // Navigate to cart and fill in appropriate data
        goToCart();

        // Check cart total
        assertTotal("43.18");
    })
});

describe('Remove Item from Cart', function() {
    it('Adds multiple items to cart, removes one, and checks for the correct total', function() {
        // add item one to cart
        clickButton("#inventory_container .inventory_item:nth-child(1) .btn_inventory");

        // add item two to cart
        clickButton("#inventory_container .inventory_item:nth-child(2) .btn_inventory");

        // add item two to cart
        clickButton("#inventory_container .inventory_item:nth-child(2) .btn_inventory");

        // Navigate to cart and fill in appropriate data
        goToCart();

        // Check cart total
        assertTotal("32.39");
    })
});

afterEach('Logout and close session', function() {
    // Open Menu
    clickButton(".bm-burger-button > button");

    // Click Logout
    clickButton("#logout_sidebar_link");

    // Clear session storage
    sessionStorage.clear();

    // Close window
    window.close()
});

// SAUCEDEMO SPECIFIC FUNCTIONS

function login() {
    inputText("#user-name", "standard_user");
    inputText("#password", "secret_sauce");

    let submit = cy.get("input[type='submit'");

    submit.click()
}

function goToCart() {
    // Navigate to Cart
    cy.visit('https://www.saucedemo.com/cart.html');

    // Click Checkout
    clickButton("#cart_contents_container .checkout_button");

    // Enter Cust Info
    inputText("#first-name", "test");
    inputText("#last-name", "user");
    inputText("#postal-code", "05401");

    // Go to cart
    clickButton(".cart_button:nth-child(2)")
}

function assertTotal(total) {
    cy.get(".summary_total_label:nth-child(7)")
        .then(function($el) {
            let actual = $el[0].innerText.split("$")[1];

            expect(total).to.equal(actual)
        });
}

// GENERAL CYPRESS FUNCTIONS

function inputText(selector, text) {
    let inputField = cy.get(selector);

    inputField.type(text);
}

function clickButton(selector) {
    let button = cy.get(selector);

    button.click();
}