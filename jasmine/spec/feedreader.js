$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('allFeeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('allFeeds have URL defined and is not an empty string', function(){
            for(let feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });
         

         /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('allFeeds have a name and is not an empty string', function(){
            for(let feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
         });
 
 
         /** A test that loops through each feed
         *  in the allFeeds object and ensures it has a valid URL.
         */
        it('allFeeds have a valid URL', function(){
            let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        
            let isValidURL = false;
            for(let feed of allFeeds){
                try {
                    expect(feed.url).toBeDefined();
                    isValidURL = pattern.test(feed.url);
                } catch (error) {}
                expect(isValidURL).toBe(true);
            }
        });
    });


    /* A new test suite named "The menu" */
    describe('The Menu', function(){

        /* A test that ensures the menu element is
         * hidden by default. 
         */
        it('menu is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu changes visibility when clicked', function(){
            //This ensures that the menu icon exists on the page.
            expect($('.header a').hasClass('menu-icon-link')).toBe(true);

            //This ensures that the menu changes visibility when the menu icon is clicked.
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /** A test that loops through each feeds
         *  in the feed-list element and ensures that the menu element
         *  is hidden when one of the items is clicked.
         */
        it('menu is hidden when a menu item is clicked', function(){
            let feedList = $('.feed-list li a');
            
            for(let feed of feedList){
                // This ensures that the menu element is visible first
                $('body').removeClass('menu-hidden');

                // Proceed to test to ensure that the menu element is hidden once item is clicked.
                feed.click();
                expect($('body').hasClass('menu-hidden')).toBe(true);
            }
        });
    });


    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
    
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed function is asynchronous.
        */
        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('feed container has at least 1 entry when loadfeed function is called and done', function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    
    });


    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed function is asynchronous.
         */
        let firstFeed,
            secondFeed;

        beforeEach(function(done){
            //Load the first feed
            loadFeed(1, function(){
                firstFeed = $('.feed')[0].innerHTML;

                //Load the second feed
                loadFeed(0, function(){
                    secondFeed = $('.feed')[0].innerHTML;
                    done();
                });
            });
        });
    
        it('content changes when a new feed is loaded', function(){
            expect(firstFeed !== secondFeed).toBe(true);
        });
    });
}());
