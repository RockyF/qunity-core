# qunity-core
![Logo](https://rockyf.github.io/qunity-core/assets/Logo.png)  
## An entity-component framework

## Sample
```typescript
let root = new RootEntity('root');
let entity1 = new Entity('entity1');
let entity2 = new Entity('entity2');
let entity3 = new Entity('entity3');

entity1.enabled = true; //Entity.enabled default set false
entity2.enabled = true;
entity3.enabled = true;

root.addChild(entity1);
entity1.addChild(entity2);
entity2.addChild(entity3);

entity2.removeChildAt(0);
entity1.removeChild(entity2);

let cp1 = new Component();
entity1.components.add(cp1);
entity1.components.remove(cp1);
entity2.components.add(cp1);
cp1.enabled = false;
```

## Docs
[Docs](https://rockyf.github.io/qunity-core/)

## Build
``yarn build``  
