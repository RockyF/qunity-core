/**
 * Created by rockyl on 2019-07-29.
 */
import { Component } from "./Component";
import { Entity } from "./Entity";
/**
 * 组件管理类
 */
export declare class ComponentManager {
    private _entity;
    private _components;
    private _componentsNameMapping;
    private _componentsDefMapping;
    constructor(entity: Entity);
    /**
     * 遍历组件
     * @param callback
     */
    eachComponent(callback: (component: Component, index: number) => unknown): void;
    /**
     * 当被创建时
     */
    onSetup(): void;
    /**
     * 当生效时
     */
    onAwake(): void;
    /**
     * 当失效时
     */
    onSleep(): void;
    /**
     * 时钟更新
     * @param t
     */
    onUpdate(t: number): void;
    /**
     * 当被销毁时
     */
    onDestroy(): void;
    /**
     * 增加组件
     * @param component
     * @param index
     */
    add(component: Component, index?: number): void;
    /**
     * 移除组件
     * @param component
     */
    remove(component: Component): void;
    /**
     * 移除所有组件
     */
    removeAll(): void;
    /**
     * 根据组件名称获取指定类的组件列表
     * @param name
     */
    findByName<T extends Component>(name: string): T[];
    /**
     * 获取指定类的组件列表
     * @param clazz
     */
    find<T extends Component>(clazz: new () => T): T[];
    /**
     * 获取指定类的组件
     * @param name
     */
    getByName<T extends Component>(name: string): T;
    /**
     * 获取指定类的组件
     * @param clazz
     */
    getOne<T extends Component>(clazz: new () => T): T;
    /**
     * 获取所有组件
     */
    readonly all: Component[];
    /**
     * 当添加组件时
     * @param component
     */
    private onAddComponent;
    /**
     * 当移除组件时
     * @param component
     */
    private onRemoveComponent;
}
