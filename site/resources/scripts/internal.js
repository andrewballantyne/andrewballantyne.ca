/**
 * Created by Andrew on 2/27/16.
 */
var _data = {
  /** @type {jQuery} -- Stored reference to window for performance (theoretical) */
  window: $(window),
  /** @type {jQuery} -- The main content container for all the page-data */
  content: null,
  examples: {
    /** @type {jQuery} -- All the example navs */
    allNavs: null,
    /** @type {jQuery} -- All the example content containers */
    allContents: null
  },
  navigation: {
    /** @type {jQuery} -- Main navigation container */
    mainNavContainer: null,
    /** @type {jQuery} -- The Home Page link */
    home: null,
    /** @type {jQuery} -- The Examples Page link */
    examples: null,
    /** @type {jQuery} -- The About Page link */
    about: null,
    /** @type {jQuery} -- The Personal Details Page link */
    personal: null,
    /** @type {jQuery} -- The Contact Page link */
    contact: null
  },
  pages: {
    /** @type {jQuery} -- The list of all the pages within' the content container */
    all: null,
    /** @type {jQuery} -- The Home Page */
    home: null,
    /** @type {jQuery} -- The Examples Page */
    examples: null,
    /** @type {jQuery} -- The About Page */
    about: null,
    /** @type {jQuery} -- The Personal Details Page */
    personal: null,
    /** @type {jQuery} -- The Contact Page */
    contact: null
  }
};


_data.window.on('load', function () {
  setupVariables();

  setupNavigation();

  setupExamples();
});


function setupVariables() {
  _data.content = $('.contentBody');

  _data.navigation.mainNavContainer = _data.content.find('#mainNav');
  _data.navigation.all = _data.navigation.mainNavContainer.children();
  _data.navigation.home = _data.navigation.mainNavContainer.find('#homeNavItem');
  _data.navigation.examples = _data.navigation.mainNavContainer.find('#exampleNavItem');
  _data.navigation.about = _data.navigation.mainNavContainer.find('#aboutNavItem');
  _data.navigation.personal = _data.navigation.mainNavContainer.find('#personalNavItem');
  _data.navigation.contact = _data.navigation.mainNavContainer.find('#contactNavItem');

  _data.pages.all = _data.content.find('.page');
  _data.pages.home = _data.content.find('#home');
  _data.pages.examples = _data.content.find('#examples');
  _data.pages.about = _data.content.find('#about');
  _data.pages.personal = _data.content.find('#personal');
  _data.pages.contact = _data.content.find('#contact');

  _data.examples.allNavs = _data.pages.examples.find('#exampleNav').children();
  _data.examples.allContents = _data.pages.examples.find('.exampleItem');
}

function setupNavigation() {
  // Nav active class change
  _data.navigation.all.on('click', function () {
    _data.navigation.all.removeClass('active');

    $(this).addClass('active');
  });

  // Hash Change
  _data.window.on('hashchange', handleHashChange);
  _data.pages.home.removeClass('active');
  handleHashChange();
  function handleHashChange() {
    var hash = location.hash.substr(1);

    _data.pages.all.hide();

    if (hash == "") {
      // No-Hash means go back to home
      _data.pages.home.show();
      return;
    }

    var desiredPage = _data.pages[hash];
    if (desiredPage == null || desiredPage.length == 0) {
      // Not the desired page, show 404
      alert("404");
      location.hash = "";
      _data.page.home.click();
      return;
    }

    desiredPage.show();
    makeSureNavUpdated();

    function makeSureNavUpdated() {
      for (var i = 0; i < _data.navigation.all.length; i++) {
        var linkItem = $(_data.navigation.all[i]);
        if (linkItem.children().attr('href') === '#' + hash) {
          linkItem.click();
          return;
        }
      }

      console.error("Error finding nav to update");
    }
  }

  // Direct-to Space Example
  $('#openSpaceExample').on('click', function () {
    $('#spaceExampleBtn').click();
  });
}

function setupExamples() {
  _data.examples.allNavs.on('click', function () {
    _data.examples.allNavs.removeClass('active');
    _data.examples.allContents.hide();

    var thisNav = $(this);
    thisNav.addClass('active');
    $('#' + thisNav.attr('data-content')).show();
  });
}
