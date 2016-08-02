
module.exports = {
  'B3 is on the page' : function (browser) {
    browser
      .url('http://localhost:9909')
      .waitForElementVisible('body', 1000)
      .assert.elementPresent('.b3-robot')
      .end()
  },
  'Pressing a command button decreases the number of available moves': function(browser) {
    var moves = 0;
    browser
      .url('http://localhost:9909')
      .waitForElementVisible('.b3-robot', 1000)
      .click('.skylight-close-button') //should clear the popup
      .getText('.moves-left', function(result) {
        moves = divValToInt(result.value) 
        //weeeee - callback hell
        browser
          .click('.action-forward')
          .waitForElementVisible('.commandQueueIcon', 1000)
          .assert.containsText('.moves-left', String(moves - 1))
          .end()
      })
  }
}

//This is a bit fragile.
function divValToInt(str) {
  return parseInt(/\d+/.exec(str)[0]) 
}
