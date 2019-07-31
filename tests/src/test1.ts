/**
 * Created by rockyl on 2019-07-29.
 */

import {Entity, RootEntity} from "../../src";

let root = new RootEntity('root');
let entity1 = new Entity('entity1');
let entity2 = new Entity('entity2');
let entity3 = new Entity('entity3');

entity1.enabled = true;
entity2.enabled = true;
entity3.enabled = true;

root.addChild(entity1);
entity1.addChild(entity2);
entity2.addChild(entity3);

//root.addChild(entity1);

//root.removeChild(entity1);
//entity1.removeChild(entity2);
//entity1.enabled = true;

//entity2.enabled = true;
//entity1.enabled = false;

//console.log(root);
