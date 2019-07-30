/**
 * Created by rockyl on 2019-07-28.
 */
import { HashObject } from "./HashObject";
import { ComponentManager } from "./ComponentManager";
/**
 * 实体类
 */
export declare class Entity extends HashObject {
    name: string;
    private _children;
    private _parent;
    protected _enabled: boolean;
    protected _isFree: boolean;
    private _components;
    /**
     * 所有子实体
     */
    readonly children: Entity[];
    /**
     * 父实体
     */
    readonly parent: Entity;
    /**
     * 是否游离态
     */
    readonly isFree: boolean;
    readonly isActive: boolean;
    /**
     * 获取组件管理实例
     */
    readonly components: ComponentManager;
    /**
     * 是否有效
     */
    enabled: boolean;
    /**
     * 实例化实体
     * @param name
     */
    constructor(name?: string);
    /**
     * 增加子实体
     * @param child
     * @param index
     */
    addChild(child: Entity, index?: number): void;
    /**
     * 移除子实体
     * @param child
     */
    removeChild(child: Entity): void;
    /**
     * 通过索引移除实体
     * @param index
     */
    removeChildAt(index: number): void;
    /**
     * 获取实体
     * @param index
     */
    getChildAt(index: number): Entity;
    /**
     * 获取子实体的索引
     * @param child
     */
    getChildIndex(child: Entity): number;
    /**
     * 是否包含子实体
     * @param child
     */
    containsChild(child: Entity): boolean;
    /**
     * 遍历子实体
     * @param callback
     */
    eachChild(callback: (child: Entity, index: number) => unknown): void;
    private doAddChild;
    /**
     * 使生效
     */
    private validate;
    /**
     * 使失效
     */
    private invalidate;
    /**
     * 使约束
     * @private
     */
    private _restrict;
    /**
     * 使游离
     * @param includeSelf
     */
    private _free;
    /**
     * 当实体生效时
     */
    private onEnable;
    /**
     * 当实体失效时
     */
    private onDisable;
    /**
     * 当添加子实体时
     * @param child
     */
    private onAddChild;
    /**
     * 当移除子实体时
     * @param child
     */
    private onRemoveChild;
}
/**
 * 根实体类
 */
export declare class RootEntity extends Entity {
    protected _isFree: boolean;
    protected _enabled: boolean;
}
