'use strict';

var expect = require('chai').expect;

var db = require('../models');
// var db = null;
var Player = db.Player;
var Story = db.Story;
var Turn = db.Turn;



var seedPlayers = function(callback) {
  Player.bulkCreate([
    { name: "Pete", email: "Pete@exhausted.com" },
    { name: "Andy", email: "Andy@exhausted.com" },
    { name: "Allison", email: "Allison@exhausted.com" },
    { name: "Betty", email: "Betty@exhausted.com" },
    { name: "Ruth", email: "Ruth@exhausted.com" },
    { name: "Xena", email: "warriorprincess@gmail.com" },
    { name: "Joe", email: "joe@exhausted.com" }

  ]).then(function(results) {
    // show results, but just dataValues of the each object
    // console.log("Insertion results: ", results.map(result => result.dataValues));
    seedStories(callback);
  });
}

var seedStories = function(callback) {
  db.sequelize.sync({force: false}).then(function() {
    Story.bulkCreate([
      { name: "Gangsters and Robots"},
      { name: "Swindlers Of The North"},
      { name: "Cats and Assassins"},
      { name: "Harry Potter -- The Very Abridged Edition"}
    ]).then(function(stories) {
      // console.log(stories.map(story => story.dataValues));
      console.log("callback: ", typeof callback);
      if (typeof callback === "function" ) {
        callback();
      }
      else {
        // runOnComplete();
        // seedTurns()
      }
    })
  })
};

// turns to use:?

//  { body: "Harry was not like every other boy. Harry was a wizard.", sequence: 1, StoryId: 4, PlayerId: 1},
// { body: "Then he did something that was both very brave and very stupid. Every book.", sequence :2, StoryId: 4, PlayerId: 2},
// { body: "Fortunately, he was friends with Hermione, who solved all his problems. And Snape Killed Dumbledore.", sequence: 3, StoryId: 4, PlayerId: 3},
// { body: "Eventually he killed the dark wizard Lord VoldyThing. And Snape loved Lily. The End.", sequence: 4, StoryId: 4, PlayerId: 1}



describe('turn', function () {
	before(function(done) {
		// db.sequelize.sync({force: true});
		// db = require('../models');
    seedPlayers(done);
	});
	after(function() {
	})

  // it('should be able retrieve stories after insertion', function(done) {
  //   Story.findAll({}).then(function(stories) {
  //     console.log(stories.map((story, i) => ([i, story.dataValues.name].join(": "))));
  //     expect(stories).to.have.lengthOf.gt(1);
  //     done();
  //   })
  // })
  it('should create turn with body', function (done) {
    Turn.create({
      body: "Harry was not like every other boy. Harry was a wizard."
    }).then(function (turn) {
      expect(turhn.body).to.equal("Harry was not like every other boy. Harry was a wizard.");
      done();
    }).catch(function(err) {
    	expect(err).to.not.be.null;
    	done();
    })
  });

});


