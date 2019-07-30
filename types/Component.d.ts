/**
 * Created by rockyl on 2019-07-28.
 */
import { HashObject } from "./HashObject";
import { Entity } from "./Entity";
/**
 * 组件类
 */
export declare class Component extends HashObject {
    private _entity;
    private _enabled;
    interactive: boolean;
    readonly entity: Entity;
    constructor();
    /**
     * 是否有效
     */
    enabled: boolean;
    /**
     * @private
     * @param entity
     */
    $setup(entity: Entity): void;
    /**
     * @private
     */
    $unsetup(): void;
    /**
     * 当被创建时
     * 类似构造方法
     */
    onCreate(): void;
    /**
     * 当装配完成时
     *
     * 编辑器模式会在场景构造和属性注入完成后触发
     */
    onSetup(): void;
    /**
     * 当生效时
     * 仅当实体唤醒状态
     */
    onEnable(): void;
    /**
     * 当失效时
     * 仅当实体唤醒状态
     */
    onDisable(): void;
    /**
     * 当实体生效或组件被添加时
     */
    onAwake(): void;
    /**
     * 当实体失效或组件被移除时
     */
    onSleep(): void;
    /**
     * @private
     * @param t
     */
    $onUpdate(t: number): void;
    /**
     * @private
     * @param t
     */
    $afterUpdate(t: number): void;
    /**
     * 时钟更新
     * @param t
     */
    onUpdate(t: number): void;
    /**
     * 时钟更新回溯
     * @param t
     */
    afterUpdate(t: number): void;
    /**
     * 当被销毁时
     */
    onDestroy(): void;
    /**
     * 当交互时
     * @param type
     * @param event
     */
    onInteract(type: any, event: any): any;
    /**
     * @private
     * @param e
     */
    $dealGlobalTouchBegin(e: any): boolean;
    /**
     * @private
     * @param e
     */
    $dealGlobalTouchMove(e: any): boolean;
    /**
     * @private
     * @param e
     */
    $dealGlobalTouchEnd(e: any): boolean;
    /**
     * 当全局触摸开始
     * @param e
     */
    onGlobalTouchBegin(e: any): boolean;
    /**
     * 当全触摸移动
     * @param e
     */
    onGlobalTouchMove(e: any): boolean;
    /**
     * 当全触摸结束
     * @param e
     */
    onGlobalTouchEnd(e: any): boolean;
}
