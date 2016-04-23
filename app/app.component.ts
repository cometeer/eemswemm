/**
 * Created by tristang on 23/04/16.
 */
import {Component, OnInit} from 'angular2/core';
import {FBConnector} from 'ng2-facebook/ng2-facebook';

@Component({
    selector: 'my-app',
    template: '<h1>Welcome to Eem Swem\'m</h1>'
})
export class AppComponent implements OnInit {

    ngOnInit() {
        var fbCon:FBConnector = new FBConnector('1814502352104058');
        fbCon.initFB();
    }
}
