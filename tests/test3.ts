/**
 * Created by rockyl on 2019-07-30.
 */

import {Component, Entity, RootEntity} from "../src";

let root = new RootEntity('root');

class TestComponent extends Component {
	onCreate() {
		super.onCreate();
	}

	onAwake() {
		super.onAwake();
	}
}

let comp = new TestComponent();
root.components.add(comp);