'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var HASH_CODE_INK = 0;
function getHashCode() {
    return ++HASH_CODE_INK;
}
var HashObject = (function () {
    function HashObject() {
        this._hashCode = getHashCode();
    }
    Object.defineProperty(HashObject.prototype, "hashCode", {
        get: function () {
            return this._hashCode;
        },
        enumerable: true,
        configurable: true
    });
    return HashObject;
}());

var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity(name) {
        var _this = _super.call(this) || this;
        _this._children = [];
        _this._enabled = false;
        _this._isFree = true;
        if (name) {
            _this.name = name;
        }
        return _this;
    }
    Object.defineProperty(Entity.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "isFree", {
        get: function () {
            return this._isFree;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "enabled", {
        get: function () {
            return this._enabled;
        },
        set: function (value) {
            if (this._enabled != value) {
                this._enabled = value;
                if (!this._isFree) {
                    if (this._enabled) {
                        this.validate();
                    }
                    else {
                        this.invalidate(true);
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.addChild = function (child, index) {
        if (index == undefined || index < 0 || index >= this._children.length) {
            index = this._children.length;
        }
        if (child._parent == this) {
            index--;
        }
        this.doAddChild(child, index);
    };
    Entity.prototype.removeChild = function (child) {
        if (this.containsChild(child)) {
            child._parent = null;
            var index = this.getChildIndex(child);
            this._children.splice(index, 1);
            if (!this._isFree) {
                child._free();
                if (this._enabled) {
                    child.invalidate();
                }
            }
            this.onRemoveChild(child);
        }
    };
    Entity.prototype.removeChildAt = function (index) {
        var child = this.getChildAt(index);
        if (child) {
            this.removeChild(child);
        }
    };
    Entity.prototype.getChildAt = function (index) {
        return this._children[index];
    };
    Entity.prototype.getChildIndex = function (child) {
        return this._children.indexOf(child);
    };
    Entity.prototype.containsChild = function (child) {
        return child.parent == this;
    };
    Entity.prototype.eachChild = function (callback) {
        this._children.some(callback);
    };
    Entity.prototype.doAddChild = function (child, index) {
        if (child == this) {
            return;
        }
        var parent = child.parent;
        if (parent) {
            if (parent == this) {
                var currentIndex = this.getChildIndex(child);
                if (currentIndex != index) {
                    this._children.splice(currentIndex, 1);
                    this._children.splice(index, 0, child);
                }
            }
            else {
                parent.removeChild(child);
            }
        }
        if (!child.parent) {
            child._parent = this;
            this._children.splice(index, 0, child);
            if (!this._isFree) {
                child._restrict();
                if (this._enabled) {
                    child.validate();
                }
            }
            this.onAddChild(child);
        }
    };
    Entity.prototype.validate = function (force) {
        if (force === void 0) { force = false; }
        if (force || this._enabled) {
            this.onEnable();
            this.eachChild(function (child) {
                child.validate();
            });
        }
    };
    Entity.prototype.invalidate = function (force) {
        if (force === void 0) { force = false; }
        if (force || this._enabled) {
            this.onDisable();
            this.eachChild(function (child) {
                child.invalidate();
            });
        }
    };
    Entity.prototype._restrict = function () {
        this._isFree = false;
        this.eachChild(function (child) {
            child._restrict();
        });
    };
    Entity.prototype._free = function (includeSelf) {
        this._isFree = true;
        this.eachChild(function (child) {
            child._free();
        });
    };
    Entity.prototype.onEnable = function () {
        console.log('onEnable', this.name);
    };
    Entity.prototype.onDisable = function () {
        console.log('onDisable', this.name);
    };
    Entity.prototype.onAddChild = function (child) {
    };
    Entity.prototype.onRemoveChild = function (child) {
    };
    return Entity;
}(HashObject));
var RootEntity = (function (_super) {
    __extends(RootEntity, _super);
    function RootEntity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isFree = false;
        _this._enabled = true;
        return _this;
    }
    return RootEntity;
}(Entity));

var root = new RootEntity('root');
var entity1 = new Entity('entity1');
var entity2 = new Entity('entity2');
var entity3 = new Entity('entity3');
entity1.enabled = true;
entity2.enabled = true;
entity3.enabled = true;
root.addChild(entity1);
entity1.addChild(entity2);
entity2.addChild(entity3);
entity2.enabled = true;
//# sourceMappingURL=test1.js.map
