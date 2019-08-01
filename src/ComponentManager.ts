/**
 * Created by rockyl on 2019-07-29.
 */

import {Component} from "./Component";
import {Entity} from "./Entity";

/**
 * 组件管理类
 */
export class ComponentManager {
	private _entity: Entity;
	private _components: Component[] = [];
	private _componentsNameMapping: any;
	private _componentsDefMapping: any;

	constructor(entity: Entity) {
		this._entity = entity;

		this.eachComponent(component => {
			component.$setup(entity);
		})
	}

	/**
	 * 遍历组件
	 * @param callback
	 */
	eachComponent(callback: (component: Component, index: number) => unknown) {
		this._components.some(<any>callback);
	}

	/**
	 * 当被创建时
	 */
	onSetup() {
		this.eachComponent(component => {
			component.onSetup();
		})
	}

	/**
	 * 当生效时
	 */
	onAwake() {
		this.eachComponent(component => {
			component.onAwake();
		})
	}

	/**
	 * 当失效时
	 */
	onSleep() {
		this.eachComponent(component => {
			component.onSleep();
		})
	}

	/**
	 * 时钟更新
	 * @param t
	 */
	onUpdate(t: number) {
		this.eachComponent(component => {
			component.$onUpdate(t);
		})
	}

	/**
	 * 时钟更新回溯
	 * @param t
	 */
	afterUpdate(t: number) {
		this.eachComponent(component => {
			component.$afterUpdate(t);
		})
	}

	/**
	 * 当被销毁时
	 */
	onDestroy() {

	}

	/**
	 * 增加组件
	 * @param component
	 * @param index
	 */
	add(component: Component, index?: number) {
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

		const currentIndex = this._components.indexOf(component);
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
	}

	/**
	 * 移除组件
	 * @param component
	 */
	remove(component: Component) {
		this.onRemoveComponent(component);
		const index = this._components.indexOf(component);
		if (index >= 0) {
			this._components.splice(index, 1);
		}
	}

	/**
	 * 移除所有组件
	 */
	removeAll() {
		while (this._components.length > 0) {
			this.remove(this._components[0]);
		}
	}

	/**
	 * 根据组件名称获取指定类的组件列表
	 * @param name
	 */
	findByName<T extends Component>(name: string): T[] {
		let components = this._componentsNameMapping[name];
		if (!components) {
			components = this._componentsNameMapping[name] = <T[]>this._components.filter((component: Component) => {
				return component.constructor['__class__'] === name;
			});
		}
		return components;
	}

	/**
	 * 获取指定类的组件列表
	 * @param clazz
	 */
	find<T extends Component>(clazz: new() => T): T[] {
		let components = this._componentsDefMapping[clazz.name];
		if (!components) {
			components = this._componentsDefMapping[clazz.name] = <T[]>this._components.filter((component: Component) => {
				return component instanceof clazz;
			});
		}
		return components;
	}

	/**
	 * 获取指定类的组件
	 * @param name
	 */
	getByName<T extends Component>(name: string): T {
		return this.findByName<T>(name)[0];
	}

	/**
	 * 获取指定类的组件
	 * @param clazz
	 */
	getOne<T extends Component>(clazz: new() => T): T {
		return this.find<T>(clazz)[0];
	}

	/**
	 * 获取所有组件
	 */
	get all(): Component[] {
		return this._components;
	}

	/**
	 * 当添加组件时
	 * @param component
	 */
	private onAddComponent(component: Component) {
		this._componentsNameMapping = {};
		this._componentsDefMapping = {};

		component.$setup(this._entity);
		this.onAwake();
	}

	/**
	 * 当移除组件时
	 * @param component
	 */
	private onRemoveComponent(component: Component) {
		this._componentsNameMapping = {};
		this._componentsDefMapping = {};

		component.$unsetup();
		this.onSleep();
	}
}
