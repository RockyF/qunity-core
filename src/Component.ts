/**
 * Created by rockyl on 2019-07-28.
 */

import {HashObject} from "./HashObject";
import {Entity} from "./Entity";

const interactiveMap = [
	'dealGlobalTouchBegin',
	'dealGlobalTouchMove',
	'dealGlobalTouchEnd',
];

/**
 * 组件类
 */
export class Component extends HashObject {
	private _entity: Entity;
	private _enabled: boolean = true;
	interactive: boolean = false;

	get entity(): Entity {
		return this._entity;
	}

	constructor() {
		super();

		this.onCreate();
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

			if (this._entity && this._entity.isActive) {
				if (value) {
					this.onEnable();
				} else {
					this.onDisable();
				}
			}
		}
	}

	/**
	 * @private
	 * @param entity
	 */
	$setup(entity: Entity) {
		this._entity = entity;

		this.onSetup();
	}

	/**
	 * @private
	 */
	$unsetup() {
		this._entity = null;
	}

	/**
	 * 当被创建时
	 * 类似构造方法
	 */
	onCreate() {

	}

	/**
	 * 当装配完成时
	 *
	 * 编辑器模式会在场景构造和属性注入完成后触发
	 */
	onSetup() {

	}

	/**
	 * 当生效时
	 * 仅当实体唤醒状态
	 */
	onEnable() {

	}

	/**
	 * 当失效时
	 * 仅当实体唤醒状态
	 */
	onDisable() {

	}

	/**
	 * 当实体生效或组件被添加时
	 */
	onAwake() {

	}

	/**
	 * 当实体失效或组件被移除时
	 */
	onSleep() {

	}

	/**
	 * @private
	 * @param t
	 */
	$onUpdate(t: number) {
		if(this._enabled){
			this.onUpdate(t);
		}
	}

	/**
	 * @private
	 * @param t
	 */
	$afterUpdate(t: number) {
		if(this._enabled){
			this.afterUpdate(t);
		}
	}

	/**
	 * 时钟更新
	 * @param t
	 */
	onUpdate(t: number) {

	}

	/**
	 * 时钟更新回溯
	 * @param t
	 */
	afterUpdate(t: number) {

	}

	/**
	 * 当被销毁时
	 */
	onDestroy() {

	}

	/**
	 * 当交互时
	 * @param type
	 * @param event
	 */
	onInteract(type, event) {
		try {
			return this['$' + interactiveMap[type]](event);
		} catch (e) {
			console.warn(e);
		}
	}

	/**
	 * @private
	 * @param e
	 */
	$dealGlobalTouchBegin(e) {
		return this.onGlobalTouchBegin(e);
	}

	/**
	 * @private
	 * @param e
	 */
	$dealGlobalTouchMove(e) {
		return this.onGlobalTouchMove(e);
	}

	/**
	 * @private
	 * @param e
	 */
	$dealGlobalTouchEnd(e) {
		return this.onGlobalTouchEnd(e);
	}

	/**
	 * 当全局触摸开始
	 * @param e
	 */
	onGlobalTouchBegin(e) {
		return false;
	}

	/**
	 * 当全触摸移动
	 * @param e
	 */
	onGlobalTouchMove(e) {
		return false;
	}

	/**
	 * 当全触摸结束
	 * @param e
	 */
	onGlobalTouchEnd(e) {
		return false;
	}
}
