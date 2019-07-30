/**
 * Created by rockyl on 2019-07-28.
 */

import {HashObject} from "./HashObject";
import {Entity} from "./Entity";
import {EngineConfig} from "./engine-config";

/**
 * 组件类
 */
export class Component extends HashObject {
	private _entity: Entity;
	private _enabled: boolean = true;

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

		if (!EngineConfig.editorMode) {
			this.onSetup();
		}
	}

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

	$onUpdate(t: number) {
		if(this._enabled){
			this.onUpdate(t);
		}
	}

	/**
	 * 时钟更新
	 * @param t
	 */
	onUpdate(t: number) {

	}

	/**
	 * 当被销毁时
	 */
	onDestroy() {

	}
}
