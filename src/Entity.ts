/**
 * Created by rockyl on 2019-07-28.
 */

import {HashObject} from "./HashObject";
import {ComponentManager} from "./ComponentManager";

/**
 * 实体类
 */
export class Entity extends HashObject {
	name: string;

	private _children: Entity[] = [];
	private _parent: Entity;
	protected _enabled: boolean = false;
	protected _isFree: boolean = true;
	private _components: ComponentManager;

	/**
	 * 所有子实体
	 */
	get children(): Entity[] {
		return this._children;
	}

	/**
	 * 父实体
	 */
	get parent(): Entity {
		return this._parent;
	}

	/**
	 * 是否游离态
	 */
	get isFree(): boolean {
		return this._isFree;
	}

	get isActive(): boolean{
		return !this._isFree && this._enabled
	}

	/**
	 * 获取组件管理实例
	 */
	get components(){
		return this._components;
	}

	/**
	 * 是否有效
	 */
	get enabled(): boolean {
		return this._enabled;
	}

	set enabled(value: boolean) {
		if (this._enabled != value) {
			this._enabled = value;
			if(!this._isFree){
				if (this._enabled) {
					this.validate();
				} else {
					this.invalidate(true);
				}
			}
		}
	}

	/**
	 * 实例化实体
	 * @param name
	 */
	constructor(name?: string) {
		super();

		if (name) {
			this.name = name;
		}
		this._components = new ComponentManager(this);
	}

	/**
	 * 增加子实体
	 * @param child
	 * @param index
	 */
	addChild(child: Entity, index?: number) {
		if (index == undefined || index < 0 || index >= this._children.length) {
			index = this._children.length;
		}

		if (child._parent == this) {
			index--;
		}

		this.doAddChild(child, index);
	}

	/**
	 * 移除子实体
	 * @param child
	 */
	removeChild(child: Entity) {
		if (this.containsChild(child)) {
			child._parent = null;

			let index = this.getChildIndex(child);
			this._children.splice(index, 1);

			if(!this._isFree){
				child._free();
				if(this._enabled){
					child.invalidate();
				}
			}

			this.onRemoveChild(child);
		}
	}

	/**
	 * 通过索引移除实体
	 * @param index
	 */
	removeChildAt(index: number) {
		let child: Entity = this.getChildAt(index);
		if (child) {
			this.removeChild(child);
		}
	}

	/**
	 * 获取实体
	 * @param index
	 */
	getChildAt(index: number): Entity {
		return this._children[index];
	}

	/**
	 * 获取子实体的索引
	 * @param child
	 */
	getChildIndex(child: Entity): number {
		return this._children.indexOf(child);
	}

	/**
	 * 是否包含子实体
	 * @param child
	 */
	containsChild(child: Entity): boolean {
		return child.parent == this;
	}

	/**
	 * 遍历子实体
	 * @param callback
	 */
	eachChild(callback: (child: Entity, index: number) => unknown) {
		this._children.some(<any>callback);
	}

	private doAddChild(child: Entity, index: number) {
		if (child == this) {
			return;
		}
		let parent = child.parent;
		if (parent) {
			if (parent == this) {
				let currentIndex = this.getChildIndex(child);
				if (currentIndex != index) {
					this._children.splice(currentIndex, 1);
					this._children.splice(index, 0, child);
				}
			} else {
				parent.removeChild(child);
			}
		}
		if (!child.parent) {
			child._parent = this;
			this._children.splice(index, 0, child);

			if(!this._isFree){
				child._restrict();
				if(this._enabled){
					child.validate();
				}
			}

			this.onAddChild(child);
		}
	}

	/**
	 * 使生效
	 */
	private validate(force = false) {
		if (force || this._enabled) {
			this.onEnable();

			this.eachChild(child => {
				child.validate();
			})
		}
	}

	/**
	 * 使失效
	 */
	private invalidate(force = false) {
		if (force || this._enabled) {
			this.onDisable();

			this.eachChild(child => {
				child.invalidate();
			})
		}
	}

	/**
	 * 使约束
	 * @private
	 */
	private _restrict() {
		this._isFree = false;
		this.eachChild(child => {
			child._restrict();
		})
	}

	/**
	 * 使游离
	 * @param includeSelf
	 */
	private _free(includeSelf = true) {
		this._isFree = true;
		this.eachChild(child => {
			child._free();
		})
	}

	/**
	 * 当实体生效时
	 */
	private onEnable() {
		this._components.onAwake();
	}

	/**
	 * 当实体失效时
	 */
	private onDisable() {
		this._components.onSleep();
	}

	/**
	 * 当添加子实体时
	 * @param child
	 */
	private onAddChild(child: Entity) {

	}

	/**
	 * 当移除子实体时
	 * @param child
	 */
	private onRemoveChild(child: Entity) {

	}


}

/**
 * 根实体类
 */
export class RootEntity extends Entity{
	protected _isFree: boolean = false;
	protected _enabled: boolean = true;
}
