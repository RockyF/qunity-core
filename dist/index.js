'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Created by rockyl on 2018/11/5.
 */
var HASH_CODE_INK = 0;
function getHashCode() {
    return ++HASH_CODE_INK;
}
/**
 * 哈希对象
 */
var HashObject = /** @class */ (function () {
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

/**
 * Created by rockyl on 2019-07-29.
 */
/**
 * 组件管理类
 */
var ComponentManager = /** @class */ (function () {
    function ComponentManager(entity) {
        this._components = [];
        this._entity = entity;
        this.eachComponent(function (component) {
            component.$setup(entity);
        });
    }
    /**
     * 遍历组件
     * @param callback
     */
    ComponentManager.prototype.eachComponent = function (callback) {
        this._components.some(callback);
    };
    /**
     * 当被创建时
     */
    ComponentManager.prototype.onSetup = function () {
        this.eachComponent(function (component) {
            component.onSetup();
        });
    };
    /**
     * 当生效时
     */
    ComponentManager.prototype.onAwake = function () {
        this.eachComponent(function (component) {
            component.onAwake();
        });
    };
    /**
     * 当失效时
     */
    ComponentManager.prototype.onSleep = function () {
        this.eachComponent(function (component) {
            component.onSleep();
        });
    };
    /**
     * 时钟更新
     * @param t
     */
    ComponentManager.prototype.onUpdate = function (t) {
        this.eachComponent(function (component) {
            component.$onUpdate(t);
        });
    };
    /**
     * 时钟更新回溯
     * @param t
     */
    ComponentManager.prototype.afterUpdate = function (t) {
        this.eachComponent(function (component) {
            component.$afterUpdate(t);
        });
    };
    /**
     * 当被销毁时
     */
    ComponentManager.prototype.onDestroy = function () {
    };
    /**
     * 增加组件
     * @param component
     * @param index
     */
    ComponentManager.prototype.add = function (component, index) {
        if (component.entity && component.entity !== this._entity) {
            console.warn('component.entity was not empty');
            return;
        }
        if (index == undefined || index < 0 || index >= this._components.length) {
            index = this._components.length;
        }
        if (component.entity == this._entity) {
            index--;
        }
        var currentIndex = this._components.indexOf(component);
        if (currentIndex == index) {
            return;
        }
        if (currentIndex >= 0) {
            this._components.splice(currentIndex, 1);
        }
        this._components.splice(index, 0, component);
        if (currentIndex < 0) {
            this.onAddComponent(component);
        }
    };
    /**
     * 移除组件
     * @param component
     */
    ComponentManager.prototype.remove = function (component) {
        this.onRemoveComponent(component);
        var index = this._components.indexOf(component);
        if (index >= 0) {
            this._components.splice(index, 1);
        }
    };
    /**
     * 移除所有组件
     */
    ComponentManager.prototype.removeAll = function () {
        while (this._components.length > 0) {
            this.remove(this._components[0]);
        }
    };
    /**
     * 根据组件名称获取指定类的组件列表
     * @param name
     */
    ComponentManager.prototype.findByName = function (name) {
        var components = this._componentsNameMapping[name];
        if (!components) {
            components = this._componentsNameMapping[name] = this._components.filter(function (component) {
                return component.constructor['__class__'] === name;
            });
        }
        return components;
    };
    /**
     * 获取指定类的组件列表
     * @param clazz
     */
    ComponentManager.prototype.find = function (clazz) {
        var components = this._componentsDefMapping[clazz.name];
        if (!components) {
            components = this._componentsDefMapping[clazz.name] = this._components.filter(function (component) {
                return component instanceof clazz;
            });
        }
        return components;
    };
    /**
     * 获取指定类的组件
     * @param name
     */
    ComponentManager.prototype.getByName = function (name) {
        return this.findByName(name)[0];
    };
    /**
     * 获取指定类的组件
     * @param clazz
     */
    ComponentManager.prototype.getOne = function (clazz) {
        return this.find(clazz)[0];
    };
    Object.defineProperty(ComponentManager.prototype, "all", {
        /**
         * 获取所有组件
         */
        get: function () {
            return this._components;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 当添加组件时
     * @param component
     */
    ComponentManager.prototype.onAddComponent = function (component) {
        this._componentsNameMapping = {};
        this._componentsDefMapping = {};
        component.$setup(this._entity);
        this.onAwake();
    };
    /**
     * 当移除组件时
     * @param component
     */
    ComponentManager.prototype.onRemoveComponent = function (component) {
        this._componentsNameMapping = {};
        this._componentsDefMapping = {};
        component.$unsetup();
        this.onSleep();
    };
    return ComponentManager;
}());

/**
 * Created by rockyl on 2019-07-28.
 */
/**
 * 实体类
 */
var Entity = /** @class */ (function (_super) {
    __extends(Entity, _super);
    /**
     * 实例化实体
     * @param name
     */
    function Entity(name) {
        var _this = _super.call(this) || this;
        _this._children = [];
        _this._enabled = false;
        _this._isFree = true;
        if (name) {
            _this.name = name;
        }
        _this._components = new ComponentManager(_this);
        return _this;
    }
    Object.defineProperty(Entity.prototype, "children", {
        /**
         * 所有子实体
         */
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "parent", {
        /**
         * 父实体
         */
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "isFree", {
        /**
         * 是否游离态
         */
        get: function () {
            return this._isFree;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "isActive", {
        get: function () {
            return !this._isFree && this._enabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "components", {
        /**
         * 获取组件管理实例
         */
        get: function () {
            return this._components;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "enabled", {
        /**
         * 是否有效
         */
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
    /**
     * 增加子实体
     * @param child
     * @param index
     */
    Entity.prototype.addChild = function (child, index) {
        if (index == undefined || index < 0 || index >= this._children.length) {
            index = this._children.length;
        }
        if (child._parent == this) {
            index--;
        }
        this.doAddChild(child, index);
    };
    /**
     * 移除子实体
     * @param child
     */
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
    /**
     * 通过索引移除实体
     * @param index
     */
    Entity.prototype.removeChildAt = function (index) {
        var child = this.getChildAt(index);
        if (child) {
            this.removeChild(child);
        }
    };
    /**
     * 获取实体
     * @param index
     */
    Entity.prototype.getChildAt = function (index) {
        return this._children[index];
    };
    /**
     * 获取子实体的索引
     * @param child
     */
    Entity.prototype.getChildIndex = function (child) {
        return this._children.indexOf(child);
    };
    /**
     * 是否包含子实体
     * @param child
     */
    Entity.prototype.containsChild = function (child) {
        return child.parent == this;
    };
    /**
     * 遍历子实体
     * @param callback
     */
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
    /**
     * 使生效
     */
    Entity.prototype.validate = function (force) {
        if (force === void 0) { force = false; }
        if (force || this._enabled) {
            this.onEnable();
            this.eachChild(function (child) {
                child.validate();
            });
        }
    };
    /**
     * 使失效
     */
    Entity.prototype.invalidate = function (force) {
        if (force === void 0) { force = false; }
        if (force || this._enabled) {
            this.onDisable();
            this.eachChild(function (child) {
                child.invalidate();
            });
        }
    };
    /**
     * 使约束
     * @private
     */
    Entity.prototype._restrict = function () {
        this._isFree = false;
        this.eachChild(function (child) {
            child._restrict();
        });
    };
    /**
     * 使游离
     * @param includeSelf
     */
    Entity.prototype._free = function (includeSelf) {
        this._isFree = true;
        this.eachChild(function (child) {
            child._free();
        });
    };
    /**
     * 当实体生效时
     */
    Entity.prototype.onEnable = function () {
        this._components.onAwake();
    };
    /**
     * 当实体失效时
     */
    Entity.prototype.onDisable = function () {
        this._components.onSleep();
    };
    /**
     * 当添加子实体时
     * @param child
     */
    Entity.prototype.onAddChild = function (child) {
    };
    /**
     * 当移除子实体时
     * @param child
     */
    Entity.prototype.onRemoveChild = function (child) {
    };
    return Entity;
}(HashObject));
/**
 * 根实体类
 */
var RootEntity = /** @class */ (function (_super) {
    __extends(RootEntity, _super);
    function RootEntity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isFree = false;
        _this._enabled = true;
        return _this;
    }
    return RootEntity;
}(Entity));

/**
 * Created by rockyl on 2019-07-28.
 */
/**
 * 组件类
 */
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = _super.call(this) || this;
        _this._enabled = true;
        _this.interactive = false;
        _this.onCreate();
        return _this;
    }
    Object.defineProperty(Component.prototype, "entity", {
        get: function () {
            return this._entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "enabled", {
        /**
         * 是否有效
         */
        get: function () {
            return this._enabled;
        },
        set: function (value) {
            if (this._enabled != value) {
                this._enabled = value;
                if (this._entity && this._entity.isActive) {
                    if (value) {
                        this.onEnable();
                    }
                    else {
                        this.onDisable();
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param entity
     */
    Component.prototype.$setup = function (entity) {
        this._entity = entity;
        this.onSetup();
    };
    /**
     * @private
     */
    Component.prototype.$unsetup = function () {
        this._entity = null;
    };
    /**
     * 当被创建时
     * 类似构造方法
     */
    Component.prototype.onCreate = function () {
    };
    /**
     * 当装配完成时
     *
     * 编辑器模式会在场景构造和属性注入完成后触发
     */
    Component.prototype.onSetup = function () {
    };
    /**
     * 当生效时
     * 仅当实体唤醒状态
     */
    Component.prototype.onEnable = function () {
    };
    /**
     * 当失效时
     * 仅当实体唤醒状态
     */
    Component.prototype.onDisable = function () {
    };
    /**
     * 当实体生效或组件被添加时
     */
    Component.prototype.onAwake = function () {
    };
    /**
     * 当实体失效或组件被移除时
     */
    Component.prototype.onSleep = function () {
    };
    /**
     * @private
     * @param t
     */
    Component.prototype.$onUpdate = function (t) {
        if (this._enabled) {
            this.onUpdate(t);
        }
    };
    /**
     * @private
     * @param t
     */
    Component.prototype.$afterUpdate = function (t) {
        if (this._enabled) {
            this.afterUpdate(t);
        }
    };
    /**
     * 时钟更新
     * @param t
     */
    Component.prototype.onUpdate = function (t) {
    };
    /**
     * 时钟更新回溯
     * @param t
     */
    Component.prototype.afterUpdate = function (t) {
    };
    /**
     * 当被销毁时
     */
    Component.prototype.onDestroy = function () {
    };
    return Component;
}(HashObject));

/**
 * Created by rockyl on 2019-04-22.
 *
 * 实体相关工具
 */
/**
 * 实体遍历(先序遍历)
 * @param target 目标实体`
 * @param hitChild 遇到子实体回调
 * @param level 深度，默认全部遍历
 * @param includeSelf 是否包括自身
 * @param fullCallback 子实体遍历完后回调
 * @param params 其他参数
 */
function traverse(target, hitChild, level, includeSelf, fullCallback) {
    if (level === void 0) { level = -1; }
    if (includeSelf === void 0) { includeSelf = false; }
    var params = [];
    for (var _i = 5; _i < arguments.length; _i++) {
        params[_i - 5] = arguments[_i];
    }
    var interrupt;
    if (includeSelf) {
        var ps = [].concat(target, params);
        hitChild.apply(null, ps);
    }
    if (level !== 0) {
        for (var _a = 0, _b = target.children; _a < _b.length; _a++) {
            var child = _b[_a];
            var ps = [].concat(child, params);
            if (hitChild.apply(null, ps)) {
                interrupt = true;
                continue;
            }
            if (child.children.length > 0) {
                ps = [].concat(child, hitChild, level - 1, false, fullCallback, params);
                traverse.apply(null, ps);
            }
        }
    }
    !interrupt && fullCallback && fullCallback(target);
}
/**
 * 实体遍历(后序遍历且倒序)
 * @param target 目标实体
 * @param hitChild 遇到子实体回调
 * @param level 深度，默认全部遍历
 * @param includeSelf 是否包括自身
 * @param fullCallback 子实体遍历完后回调
 * @param params 其他参数
 */
function traversePostorder(target, hitChild, level, includeSelf, fullCallback) {
    if (level === void 0) { level = -1; }
    if (includeSelf === void 0) { includeSelf = false; }
    var params = [];
    for (var _i = 5; _i < arguments.length; _i++) {
        params[_i - 5] = arguments[_i];
    }
    if (level !== 0) {
        for (var i = target.children.length - 1; i >= 0; i--) {
            var child = target.children[i];
            if (!child.enabled) {
                continue;
            }
            if (traversePostorder.apply(void 0, [child, hitChild, level - 1, false, fullCallback].concat(params))) {
                return true;
            }
            if (hitChild.apply(void 0, [child].concat(params))) {
                return true;
            }
        }
    }
    if (includeSelf) {
        hitChild.apply(void 0, [target].concat(params));
    }
    fullCallback && fullCallback(target);
}
/**
 * 实体冒泡
 * @param target 目标实体
 * @param hitParent 遇到父实体回调
 * @param includeSelf 是否包括自身
 * @param params 其他参数
 */
function bubbling(target, hitParent, includeSelf) {
    if (includeSelf === void 0) { includeSelf = false; }
    var params = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        params[_i - 3] = arguments[_i];
    }
    if (includeSelf) {
        hitParent.apply(void 0, [target].concat(params));
    }
    var entity = target;
    while (entity = entity.parent) {
        if (hitParent.apply(void 0, [entity].concat(params))) {
            break;
        }
    }
}

/**
 * Created by rockyl on 2019-07-28.
 */

exports.Component = Component;
exports.Entity = Entity;
exports.HashObject = HashObject;
exports.RootEntity = RootEntity;
exports.bubbling = bubbling;
exports.traverse = traverse;
exports.traversePostorder = traversePostorder;
