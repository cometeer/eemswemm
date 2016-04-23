import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {UnityObject2} from '../imports/unity';
import $ from 'jquery';
import './main.html';

Template.unity.onCreated(function unityOnCreated() {
  const config = {
    width: 960,
    height: 600,
    params: {enableDebugging: "0"}
  };
  const u = new UnityObject2(config);
  console.log(u);
  $(function() {
    const unityPlayer = $("#unityPlayer");
    const $missingScreen = unityPlayer.find(".missing");
    const $brokenScreen = unityPlayer.find(".broken");
    $missingScreen.hide();
    $brokenScreen.hide();

    u.observeProgress(function(progress) {
      console.log(progress);
      switch (progress.pluginStatus) {
        case "broken":
          $brokenScreen.find("a").click(function(e) {
            e.stopPropagation();
            e.preventDefault();
            u.installPlugin();
            return false;
          });
          $brokenScreen.show();
          break;
        case "missing":
          $missingScreen.find("a").click(function(e) {
            e.stopPropagation();
            e.preventDefault();
            u.installPlugin();
            return false;
          });
          $missingScreen.show();
          break;
        case "installed":
          $missingScreen.remove();
          break;
        case "first":
          break;
      }
    });
    u.initPlugin(unityPlayer[0], "/public/Fishackaton2016.unity3d");
  });
});

Template.unity.helpers({
  unity() {
  }
});

Template.unity.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
